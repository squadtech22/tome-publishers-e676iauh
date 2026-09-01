/**
 * Generates public/og-default.png (1200x630) — the social sharing card
 * referenced by src/layouts/Base.astro.
 *
 * Run with:  npm run og
 *
 * Uses sharp, which Astro already depends on for image optimisation, so this
 * adds no new dependency. Text is rendered via SVG using a generic serif
 * stack: sharp's SVG rasteriser resolves fonts against the host system, and
 * neither Rockwell nor Cormorant Garamond can be assumed present. Regenerate
 * this card from the real brand file once outlined artwork exists.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public');
const outFile = join(outDir, 'og-default.png');

const BURGUNDY = '#2b0f14';
const GOLD = '#e8c77a';
const RULE_GOLD = '#c9a45e';
const IVORY = '#f5f0e6';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BURGUNDY}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${RULE_GOLD}" stroke-width="2" opacity="0.45"/>

  <text x="596.5" y="212" text-anchor="middle" fill="${GOLD}"
        font-family="Georgia, 'Times New Roman', serif" font-size="112" font-weight="bold"
        letter-spacing="7">TOME</text>

  <line x1="360" y1="248" x2="545" y2="248" stroke="${RULE_GOLD}" stroke-width="2"/>
  <path d="M600 240 L609 248 L600 256 L591 248 Z" fill="${RULE_GOLD}"/>
  <line x1="655" y1="248" x2="840" y2="248" stroke="${RULE_GOLD}" stroke-width="2"/>

  <text x="591.5" y="292" text-anchor="middle" fill="${GOLD}"
        font-family="Georgia, 'Times New Roman', serif" font-size="30"
        letter-spacing="17">PUBLISHERS</text>

  <text x="600" y="410" text-anchor="middle" fill="${IVORY}"
        font-family="Georgia, 'Times New Roman', serif" font-size="52">Your Story Deserves a TOME.</text>

  <text x="600" y="470" text-anchor="middle" fill="${IVORY}" opacity="0.7"
        font-family="Georgia, 'Times New Roman', serif" font-size="27"
        font-style="italic">Every great book begins with an idea.</text>

  <text x="597" y="546" text-anchor="middle" fill="${RULE_GOLD}"
        font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="bold"
        letter-spacing="6">PUBLISHING  ·  DESIGN  ·  MARKETING</text>
</svg>`;

await mkdir(outDir, { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outFile);

const { size } = await sharp(outFile).metadata().then(async (m) => ({
  size: (await import('node:fs/promises')).stat ? (await (await import('node:fs/promises')).stat(outFile)).size : 0,
  ...m,
}));

console.log(`Wrote public/og-default.png (${(size / 1024).toFixed(1)} KB)`);
