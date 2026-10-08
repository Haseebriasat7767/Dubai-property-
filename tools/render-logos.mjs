import sharp from 'sharp';
import { readFileSync, unlinkSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logo = (f) => join(root, 'logo', f);
const IVORY = '#F4EFE6', NOIR = '#141416', CHAMPAGNE = '#C6A15B';

const withColor = (svgFile, hex) =>
  readFileSync(logo(svgFile)).toString().replaceAll('currentColor', hex);

const NOIR_BG = { r: 11, g: 11, b: 12, alpha: 1 };

async function wordmark(svgFile, hex, pngFile, width = 2048) {
  const h = Math.round((500 / 1200) * width);
  await sharp(Buffer.from(withColor(svgFile, hex)), { density: 300 })
    .resize(width, h).png().toFile(logo(pngFile));
  console.log('wrote', pngFile);
}

async function wordmarkOnNoir(svgFile, hex, pngFile, width = 2048) {
  const h = Math.round((500 / 1200) * width);
  await sharp({ create: { width, height: h, channels: 4, background: NOIR_BG } })
    .composite([{ input: Buffer.from(withColor(svgFile, hex)), top: 0, left: 0 }])
    .png().toFile(logo(pngFile));
  console.log('wrote', pngFile);
}

async function mark(svgFile, hex, pngFile, size = 640, bg = null) {
  const input = bg
    ? sharp({ create: { width: size, height: size, channels: 4, background: bg } })
        .composite([{ input: Buffer.from(withColor(svgFile, hex)), top: 0, left: 0 }])
    : sharp(Buffer.from(withColor(svgFile, hex)), { density: size * 2 });
  await input.resize(size, size).png().toFile(logo(pngFile));
  console.log('wrote', pngFile);
}

const tmp = (f) => join(root, 'logo', f);
try {
  await wordmark('velora-wordmark.svg', IVORY, 'velora-wordmark-white.png');
  await wordmark('velora-wordmark.svg', NOIR, 'velora-wordmark-black.png');
  await wordmark('velora-wordmark.svg', CHAMPAGNE, 'velora-wordmark-champagne.png');
  await wordmarkOnNoir('velora-wordmark.svg', IVORY, 'velora-wordmark-white-on-noir.png');
  await wordmarkOnNoir('velora-wordmark.svg', CHAMPAGNE, 'velora-wordmark-champagne-on-noir.png');
  await mark('velora-mark.svg', IVORY, 'velora-mark-white.png');
  await mark('velora-mark.svg', CHAMPAGNE, 'velora-mark-champagne.png');
  await mark('velora-mark.svg', IVORY, 'velora-mark-white-on-noir.png', 640, NOIR_BG);
  await mark('velora-mark.svg', CHAMPAGNE, 'velora-mark-champagne-on-noir.png', 640, NOIR_BG);
} catch (e) {
  console.error('SVG render failed:', e.message);
  process.exit(1);
}
