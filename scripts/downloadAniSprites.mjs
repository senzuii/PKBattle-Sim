// Downloads Pokémon Showdown animated sprites (GIF) for every species the app
// already has a static front sprite for.
//
//   front -> assets/sprites/ani/<id>.gif      (https://play.pokemonshowdown.com/sprites/ani/)
//   back  -> assets/sprites/ani-back/<id>.gif (https://play.pokemonshowdown.com/sprites/ani-back/)
//
// Resumable: already-downloaded files are skipped, so it's safe to re-run.
// Not every species has an animated sprite (some forms); misses are logged and
// skipped, not fatal.
//
//   node scripts/downloadAniSprites.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FRONT_SRC = path.join(ROOT, 'assets', 'sprites', 'front');
const OUT_FRONT = path.join(ROOT, 'assets', 'sprites', 'ani');
const OUT_BACK  = path.join(ROOT, 'assets', 'sprites', 'ani-back');
const BASE_FRONT = 'https://play.pokemonshowdown.com/sprites/ani';
const BASE_BACK  = 'https://play.pokemonshowdown.com/sprites/ani-back';
const CONCURRENCY = 16;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

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
  await fs.mkdir(OUT_FRONT, { recursive: true });
  await fs.mkdir(OUT_BACK, { recursive: true });

  const ids = (await fs.readdir(FRONT_SRC))
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, ''));

  // Build the full job list (front + back for each id).
  const jobs = [];
  for (const id of ids) {
    jobs.push({ url: `${BASE_FRONT}/${id}.gif`, dest: path.join(OUT_FRONT, `${id}.gif`) });
    jobs.push({ url: `${BASE_BACK}/${id}.gif`,  dest: path.join(OUT_BACK,  `${id}.gif`) });
  }

  const tally = { ok: 0, skip: 0, missing: 0, error: 0 };
  let next = 0;
  let done = 0;
  const total = jobs.length;

  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++];
      const r = await download(job.url, job.dest);
      tally[r]++;
      done++;
      if (done % 100 === 0 || done === total) {
        process.stdout.write(`\r${done}/${total}  ok:${tally.ok} skip:${tally.skip} missing:${tally.missing} err:${tally.error}   `);
      }
    }
  }

  console.log(`Downloading animated sprites for ${ids.length} species (${total} files)...`);
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`\nDone. ok:${tally.ok} skip:${tally.skip} missing:${tally.missing} err:${tally.error}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
