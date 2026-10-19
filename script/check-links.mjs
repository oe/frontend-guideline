import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

const directory = path.resolve(process.argv[2] || 'dist');

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : [];
  }));
  return files.flat();
}

function elements(node) {
  return [node, ...(node.childNodes || []).flatMap(elements)];
}

try {
  const pages = new Map(await Promise.all((await htmlFiles(directory)).map(async (file) => {
    const nodes = elements(parse(await readFile(file, 'utf8')));
    return [file, nodes.map((node) => ({
      tag: node.tagName,
      attrs: Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value])),
    }))];
  })));
  const home = pages.get(path.join(directory, 'index.html'));
  const canonical = home?.find(({ tag, attrs }) => tag === 'link' && attrs.rel === 'canonical');
  if (!canonical) throw new Error('Missing dist/index.html or homepage canonical URL. Run pnpm build first.');
  const base = new URL(canonical.attrs.href);
  const errors = [];
  let checked = 0;

  for (const [file, nodes] of pages) {
    const relative = path.relative(directory, file).split(path.sep).join('/');
    const pageUrl = new URL(relative.replace(/(^|\/)index\.html$/, '$1'), base);
    for (const { tag, attrs } of nodes) {
      const reference = tag === 'a' || (tag === 'link' && attrs.rel !== 'canonical' && attrs.rel !== 'alternate') ? attrs.href
        : tag === 'img' || tag === 'script' ? attrs.src : undefined;
      if (reference === undefined) continue;
      const label = `${relative}: ${reference}`;
      if (reference.trim() === '') {
        errors.push(`${label} (empty URL)`);
        continue;
      }
      try {
        const url = new URL(reference, pageUrl);
        if (url.origin !== base.origin) continue;
        if (!url.pathname.startsWith(base.pathname)) {
          if (reference.startsWith('/') && !reference.startsWith('//')) {
            errors.push(`${label} (missing deployment prefix: ${base.pathname})`);
          }
          continue;
        }
        const target = path.resolve(directory, decodeURIComponent(url.pathname.slice(base.pathname.length)));
        if (target !== directory && !target.startsWith(directory + path.sep)) {
          throw new Error('path escapes build directory');
        }
        const info = await stat(target);
        const resolved = info.isDirectory() ? path.join(target, 'index.html') : target;
        await stat(resolved);
        checked++;
        if (url.hash && pages.has(resolved)) {
          const id = decodeURIComponent(url.hash.slice(1));
          if (!pages.get(resolved).some(({ attrs }) => attrs.id === id || attrs.name === id)) {
            errors.push(`${label} (missing anchor: ${id})`);
          }
        }
      } catch (error) {
        errors.push(`${label} (${error.code || error.message})`);
      }
    }
  }
  if (errors.length) throw new Error(`Broken internal links:\n${[...new Set(errors)].join('\n')}`);
  console.log(`Checked ${checked} internal links and assets across ${pages.size} HTML pages.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
