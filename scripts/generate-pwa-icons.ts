import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharp = require('sharp');

const publicDir = join(process.cwd(), 'public');
const svgPath = join(publicDir, 'tt-logo-square.svg');
const svg = readFileSync(svgPath);

async function generate() {
  for (const size of [192, 512]) {
    const buf = await sharp(svg).resize(size, size).png().toBuffer();
    writeFileSync(join(publicDir, `icon-${size}x${size}.png`), buf);
    console.log(`Wrote icon-${size}x${size}.png`);
  }
}
generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
