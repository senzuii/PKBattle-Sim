// Downloads Pokémon Showdown cry audio (MP3) for every species the app already
// has a static front sprite for.
//
//   assets/audio/cries/<id>.mp3   (https://play.pokemonshowdown.com/audio/cries/)
//
// Resumable: already-downloaded files are skipped. Not every id has a cry (some
// forms); misses are logged and skipped, not fatal.
//
//   node scripts/downloadCries.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FRONT_SRC = path.join(ROOT, 'assets', 'sprites', 'front');
const OUT = path.join(ROOT, 'assets', 'audio', 'cries');
const BASE = 'https://play.pokemonshowdown.com/audio/cries';
const CONCURRENCY = 16;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fileExists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function download(url, dest, attempt = 0) {
  if (await fileExists(dest)) return 'skip';
  try {
    const res = await fetch(url);
    if (res.status === 404) return 'missing';
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) return 'missing';
    await fs.writeFile(dest, buf);
    return 'ok';
  } catch (err) {
    if (attempt < 3) { await sleep(400 * (attempt + 1)); return download(url, dest, attempt + 1); }
    return 'error';
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const ids = (await fs.readdir(FRONT_SRC))
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, ''));

  const jobs = ids.map((id) => ({ url: `${BASE}/${id}.mp3`, dest: path.join(OUT, `${id}.mp3`) }));
  const tally = { ok: 0, skip: 0, missing: 0, error: 0 };
  let next = 0, done = 0;
  const total = jobs.length;

  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++];
      tally[await download(job.url, job.dest)]++;
      if (++done % 100 === 0 || done === total) {
        process.stdout.write(`\r${done}/${total}  ok:${tally.ok} skip:${tally.skip} missing:${tally.missing} err:${tally.error}   `);
      }
    }
  }

  console.log(`Downloading cries for ${total} species...`);
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`\nDone. ok:${tally.ok} skip:${tally.skip} missing:${tally.missing} err:${tally.error}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
