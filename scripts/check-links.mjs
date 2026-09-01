/**
 * Crawls the built output and reports internal links that resolve to nothing.
 *
 * Run after `npm run build`:  npm run links
 *
 * Static-output only — it checks the files on disk, so it cannot see routes
 * served by the serverless function (currently just POST /api/inquiry).
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const staticDir = join(root, '.vercel', 'output', 'static');

/** Routes handled by the serverless function rather than a file on disk. */
const DYNAMIC_ROUTES = new Set(['/api/inquiry']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const files = await walk(staticDir);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

let checked = 0;
const broken = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pageUrl =
    '/' + relative(staticDir, file).split(sep).join('/').replace(/(^|\/)index\.html$/, '$1');

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of hrefs) {
    // Skip external, anchors, and non-http schemes.
    if (/^(https?:)?\/\//.test(href)) continue;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (!href.startsWith('/')) continue;

    const path = href.split('#')[0].split('?')[0];
    if (path === '/' || path === '') continue;
    if (DYNAMIC_ROUTES.has(path)) continue;

    checked++;

    const clean = path.replace(/\/$/, '');
    const candidates = [
      join(staticDir, clean),
      join(staticDir, `${clean}.html`),
      join(staticDir, clean, 'index.html'),
    ];

    let found = false;
    for (const candidate of candidates) {
      if (await exists(candidate)) {
        found = true;
        break;
      }
    }

    if (!found) broken.push({ from: pageUrl, href });
  }
}

console.log(`Scanned ${htmlFiles.length} pages, checked ${checked} internal links.`);

if (broken.length === 0) {
  console.log('No broken internal links.');
} else {
  console.error(`\n${broken.length} broken link(s):\n`);
  const seen = new Set();
  for (const { from, href } of broken) {
    const key = `${from} -> ${href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.error(`  ${href}\n    linked from ${from}`);
  }
  process.exit(1);
}
