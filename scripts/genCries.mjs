// Scans the downloaded cry folder and emits a require() map at src/assets/Cries.ts.
// Only files that exist on disk are included, so requires never dangle.
//
//   node scripts/genCries.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CRIES = path.join(ROOT, 'assets', 'audio', 'cries');
const OUT = path.join(ROOT, 'src', 'assets', 'Cries.ts');

async function main() {
  let files = [];
  try { files = await fs.readdir(CRIES); } catch { files = []; }
  const ids = files.filter((f) => f.endsWith('.mp3')).map((f) => f.replace(/\.mp3$/, '')).sort();
  const lines = ids.map((id) => `  '${id}': require('../../assets/audio/cries/${id}.mp3'),`);
  const out =
    '// AUTO-GENERATED FILE. DO NOT EDIT. Run scripts/genCries.mjs to regenerate.\n\n' +
    `export const Cries: Record<string, any> = {\n${lines.join('\n')}\n};\n`;
  await fs.writeFile(OUT, out);
  console.log(`Wrote ${OUT}: ${ids.length} cries.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
