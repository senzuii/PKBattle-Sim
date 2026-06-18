// Scans the downloaded animated-sprite folders and emits a require() map at
// src/assets/AnimatedSprites.ts (mirrors the static Sprites.ts shape). Only
// files that actually exist on disk are included, so requires never dangle.
//
//   node scripts/genAniSprites.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ANI_FRONT = path.join(ROOT, 'assets', 'sprites', 'ani');
const ANI_BACK  = path.join(ROOT, 'assets', 'sprites', 'ani-back');
const OUT = path.join(ROOT, 'src', 'assets', 'AnimatedSprites.ts');

async function idsIn(dir) {
  let files = [];
  try { files = await fs.readdir(dir); } catch { return []; }
  return files.filter((f) => f.endsWith('.gif')).map((f) => f.replace(/\.gif$/, '')).sort();
}

function block(name, ids, rel) {
  const lines = ids.map((id) => `  '${id}': require('${rel}/${id}.gif'),`);
  return `export const ${name}: Record<string, any> = {\n${lines.join('\n')}\n};`;
}

async function main() {
  const front = await idsIn(ANI_FRONT);
  const back = await idsIn(ANI_BACK);
  const header = '// AUTO-GENERATED FILE. DO NOT EDIT. Run scripts/genAniSprites.mjs to regenerate.\n';
  const body = [
    block('AniFrontSprites', front, '../../assets/sprites/ani'),
    block('AniBackSprites', back, '../../assets/sprites/ani-back'),
  ].join('\n\n');
  await fs.writeFile(OUT, `${header}\n${body}\n`);
  console.log(`Wrote ${OUT}: ${front.length} front, ${back.length} back animated sprites.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
