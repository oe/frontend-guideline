import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import sharp from 'sharp';

const directory = path.resolve(process.argv[2] || 'dist');
// Check against the published address, independently of generated canonical tags.
const base = new URL('https://app.evecalm.com/frontend-guideline/');

function elements(node) {
  return [node, ...(node.childNodes || []).flatMap(elements)];
}
function text(node) {
  return node?.value || (node?.childNodes || []).map(text).join('');
}
async function nodes(file) {
  return elements(parse(await readFile(path.join(directory, file), 'utf8'))).map((node) => ({
    tag: node.tagName,
    attrs: Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value])),
    text: text(node),
  }));
}
async function htmlFiles(dir = '') {
  const entries = await readdir(path.join(directory, dir), { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : [];
  }))).flat();
}

try {
  const canonicalUrls = new Set();
  const titles = new Set();
  const descriptions = new Set();
  const files = await htmlFiles();
  assert.ok(files.includes('404.html'), 'missing custom 404 page');
  for (const file of files) {
    const page = await nodes(file);
    const one = (tag, key, value) => {
      const found = page.filter((node) => node.tag === tag && (!key || node.attrs[key] === value));
      assert.equal(found.length, 1, `${file}: expected one ${tag} ${value || ''}`);
      return found[0];
    };
    const meta = (key, value) => one('meta', key, value).attrs.content;
    assert.equal(one('html').attrs.lang, 'zh-CN', `${file}: language`);
    const title = one('title').text;
    assert.ok(title.trim() && !titles.has(title), `${file}: empty or duplicate title`);
    titles.add(title);
    const description = meta('name', 'description');
    assert.ok(description?.trim(), `${file}: empty description`);
    if (file === '404.html') {
      assert.match(meta('name', 'robots'), /\bnoindex\b/, `${file}: must not be indexed`);
      assert.ok(!page.some(({ tag, attrs }) => tag === 'link' && attrs.rel === 'canonical'), '404 has no canonical URL');
      continue;
    }
    assert.ok(!descriptions.has(description), `${file}: duplicate description`);
    descriptions.add(description);
    assert.ok(!page.some(({ attrs }) => attrs.name === 'robots' && /noindex|none/i.test(attrs.content)), `${file}: blocked indexing`);
    const expected = new URL(file.split(path.sep).join('/').replace(/(^|\/)index\.html$/, '$1'), base).href;
    assert.equal(one('link', 'rel', 'canonical').attrs.href, expected, `${file}: canonical URL`);
    canonicalUrls.add(expected);
    assert.equal(meta('property', 'og:url'), expected, `${file}: sharing URL`);
    assert.equal(meta('property', 'og:locale'), 'zh_CN', `${file}: Open Graph locale`);
    assert.equal(meta('property', 'og:description'), description, `${file}: sharing description`);
    assert.equal(meta('property', 'og:title'), one('h1').text, `${file}: sharing title`);
    assert.equal(meta('property', 'og:type'), file === 'index.html' ? 'website' : 'article');
    if (file === 'index.html') assert.equal(title, one('h1').text, 'homepage title repeats the brand');
    const image = new URL('social-card.png', base).href;
    assert.equal(meta('property', 'og:image'), image);
    assert.equal(meta('name', 'twitter:image'), image);
    assert.equal(meta('name', 'twitter:card'), 'summary_large_image');
    assert.ok(meta('property', 'og:image:alt')?.trim());
    const schema = JSON.parse(one('script', 'type', 'application/ld+json').text);
    assert.equal(schema['@context'], 'https://schema.org');
    assert.equal(schema['@type'], file === 'index.html' ? 'WebSite' : 'TechArticle');
    assert.equal(schema.url, expected);
    assert.equal(schema.name, one('h1').text);
    assert.equal(schema.description, description);
    assert.equal(schema.inLanguage, 'zh-CN');
  }
  const sitemapUrls = [];
  const indexes = (await nodes('sitemap-index.xml')).filter(({ tag }) => tag === 'loc');
  assert.ok(indexes.length, 'missing sitemap index entries');
  for (const index of indexes) {
    const url = new URL(index.text);
    assert.ok(url.href.startsWith(base.href), `sitemap outside production base: ${url}`);
    const sitemap = await nodes(decodeURIComponent(url.pathname.slice(base.pathname.length)));
    sitemapUrls.push(...sitemap.filter(({ tag }) => tag === 'loc').map(({ text }) => text));
  }
  assert.equal(sitemapUrls.length, new Set(sitemapUrls).size, 'duplicate sitemap entries');
  assert.deepEqual(new Set(sitemapUrls), canonicalUrls, 'sitemap must contain every indexable page, excluding 404');
  const image = await sharp(path.join(directory, 'social-card.png')).metadata();
  assert.deepEqual([image.format, image.width, image.height], ['png', 1200, 630]);
  console.log(`Checked SEO metadata, structured data, sharing image, and sitemap for ${canonicalUrls.size} indexable pages; 404 is noindex.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
