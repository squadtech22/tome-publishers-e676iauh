/**
 * Generates the site's illustrative artwork into src/assets/generated/.
 *
 * Run with:  npm run art
 *
 * Everything here is drawn programmatically in the brand palette rather than
 * sourced from stock photography — no licensing questions, and it stays exactly
 * on-brand. Output lands in src/assets/ (not public/) so Astro's <Image> can
 * optimise and responsively size it.
 *
 * Deterministic: the same seed always produces the same artwork, so builds are
 * reproducible and the images do not churn in git.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', 'assets', 'generated');

const BURGUNDY = '#2b0f14';
const GOLD = '#e8c77a';
const RULE_GOLD = '#c9a45e';
const IVORY = '#f5f0e6';
const CHARCOAL = '#201c1d';

/** Small deterministic PRNG (mulberry32) so output never drifts. */
function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];

/* ------------------------------------------------------------------ */
/* 1. A shelf of book spines — the hero illustration                   */
/* ------------------------------------------------------------------ */

function spinesSvg({ width = 900, height = 1200, seed = 20260901 } = {}) {
  const rand = rng(seed);
  const grounds = [BURGUNDY, CHARCOAL, '#3a1a1f', '#241017', '#42202a'];

  const shelves = 3;
  const shelfHeight = height / shelves;
  let parts = [`<rect width="${width}" height="${height}" fill="${IVORY}"/>`];

  for (let s = 0; s < shelves; s++) {
    const baseY = (s + 1) * shelfHeight - 26;
    let x = 26;

    while (x < width - 60) {
      const w = 38 + Math.floor(rand() * 62);
      if (x + w > width - 26) break;

      const h = shelfHeight * (0.58 + rand() * 0.34);
      const y = baseY - h;
      const ground = pick(rand, grounds);
      const tilt = rand() < 0.12 ? (rand() < 0.5 ? -4 : 4) : 0;

      const bands = [];
      // Horizontal gold bands, the way real cloth bindings carry them.
      const bandCount = 1 + Math.floor(rand() * 3);
      for (let b = 0; b < bandCount; b++) {
        const by = y + h * (0.14 + b * 0.16 + rand() * 0.05);
        bands.push(
          `<rect x="${x + 7}" y="${by.toFixed(1)}" width="${w - 14}" height="${rand() < 0.4 ? 3 : 1.5}" fill="${RULE_GOLD}" opacity="${(0.45 + rand() * 0.4).toFixed(2)}"/>`,
        );
      }

      // A blocked title panel on wider spines.
      if (w > 58 && rand() < 0.65) {
        const py = y + h * 0.42;
        bands.push(
          `<rect x="${x + 11}" y="${py.toFixed(1)}" width="${w - 22}" height="${(h * 0.2).toFixed(1)}" fill="none" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>`,
        );
      }

      // Foot ornament.
      if (rand() < 0.5) {
        const oy = y + h - 22;
        bands.push(
          `<path d="M${x + w / 2} ${oy - 5} L${x + w / 2 + 4} ${oy} L${x + w / 2} ${oy + 5} L${x + w / 2 - 4} ${oy} Z" fill="${GOLD}" opacity="0.6"/>`,
        );
      }

      parts.push(
        `<g transform="rotate(${tilt} ${x + w / 2} ${baseY})">` +
          `<rect x="${x}" y="${y.toFixed(1)}" width="${w}" height="${h.toFixed(1)}" fill="${ground}"/>` +
          `<rect x="${x}" y="${y.toFixed(1)}" width="3" height="${h.toFixed(1)}" fill="#000" opacity="0.25"/>` +
          `<rect x="${x + w - 3}" y="${y.toFixed(1)}" width="3" height="${h.toFixed(1)}" fill="#fff" opacity="0.06"/>` +
          bands.join('') +
          `</g>`,
      );

      x += w + 3 + Math.floor(rand() * 4);
    }

    // The shelf board.
    parts.push(
      `<rect x="0" y="${baseY}" width="${width}" height="7" fill="${CHARCOAL}" opacity="0.9"/>`,
      `<rect x="0" y="${baseY + 7}" width="${width}" height="3" fill="#000" opacity="0.18"/>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${parts.join('')}</svg>`;
}

/* ------------------------------------------------------------------ */
/* 2. An open-book / manuscript vignette for the About page            */
/* ------------------------------------------------------------------ */

function manuscriptSvg({ width = 1000, height = 700, seed = 74 } = {}) {
  const rand = rng(seed);
  const lines = [];

  // Two pages of "text" as ruled lines, ragged at the paragraph ends.
  for (const [x0, x1] of [
    [96, 466],
    [534, 904],
  ]) {
    let y = 132;
    while (y < height - 96) {
      const isBreak = rand() < 0.08;
      if (isBreak) {
        y += 20;
        continue;
      }
      const end = x1 - (rand() < 0.16 ? rand() * (x1 - x0) * 0.5 : rand() * 18);
      lines.push(
        `<rect x="${x0}" y="${y.toFixed(1)}" width="${(end - x0).toFixed(1)}" height="3.5" rx="1.75" fill="${CHARCOAL}" opacity="${(0.13 + rand() * 0.1).toFixed(2)}"/>`,
      );
      y += 17;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="gutter" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#000" stop-opacity="0"/>
        <stop offset="50%" stop-color="#000" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fdfbf5"/>
        <stop offset="100%" stop-color="${IVORY}"/>
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="${BURGUNDY}"/>
    <rect x="56" y="46" width="${width - 112}" height="${height - 92}" fill="url(#paper)"/>
    <rect x="${width / 2 - 26}" y="46" width="52" height="${height - 92}" fill="url(#gutter)"/>

    ${lines.join('')}

    <path d="M${width / 2} 74 L${width / 2 + 9} 84 L${width / 2} 94 L${width / 2 - 9} 84 Z" fill="${RULE_GOLD}"/>
    <rect x="56" y="46" width="${width - 112}" height="${height - 92}" fill="none" stroke="${RULE_GOLD}" stroke-width="1.5" opacity="0.55"/>
  </svg>`;
}

/* ------------------------------------------------------------------ */

// NOTE: the paper grain is NOT generated here. It ships as an inline SVG
// data URI in `src/styles/tokens.css` (`.grained`), which avoids a 217KB
// asset and an extra request for what is a barely-visible texture.

await mkdir(outDir, { recursive: true });

const jobs = [
  ['hero-spines.png', spinesSvg()],
  ['manuscript.png', manuscriptSvg()],
];

for (const [name, svg] of jobs) {
  const target = join(outDir, name);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(target);
  console.log(`  ${name}`);
}

console.log(`Wrote ${jobs.length} images to src/assets/generated/`);
