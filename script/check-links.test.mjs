import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('./check-links.mjs', import.meta.url));
const canonical = '<link rel="canonical" href="https://example.com/guide/">';

async function check(files) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'docs-links-'));
  try {
    for (const [file, contents] of Object.entries(files)) {
      const target = path.join(directory, file);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, contents);
    }
    return spawnSync(process.execPath, [script, directory], { encoding: 'utf8' });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('resolves nested routes, encoded Chinese anchors, and local assets', async () => {
  const result = await check({
    'index.html': canonical + '<a href="chapter/#%E6%A0%87%E9%A2%98">Start</a>',
    'chapter/index.html': '<h2 id="标题">Title</h2><a href="../">Home</a><img src="../image.svg">',
    'image.svg': '<svg></svg>',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 3 internal links and assets across 2 HTML pages/);
});

test('fails on missing pages, anchors, and image files', async () => {
  const result = await check({
    'index.html': canonical + '<a href="missing/">Page</a><a href="#missing">Anchor</a><img src="missing.png">',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing\/ \(ENOENT\)/);
  assert.match(result.stderr, /missing anchor: missing/);
  assert.match(result.stderr, /missing\.png \(ENOENT\)/);
});

test('rejects resource paths that omit the deployment prefix', async () => {
  const result = await check({
    'index.html': canonical + '<script src="/_astro/app.js"></script>',
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing deployment prefix: \/guide\//);
});

test('ignores external URLs and error-page canonical metadata', async () => {
  const result = await check({
    'index.html': canonical + '<a href="https://elsewhere.example/">External</a><a href="mailto:test@example.com">Email</a>',
    '404.html': '<link rel="canonical" href="https://example.com/guide/404/">',
  });
  assert.equal(result.status, 0, result.stderr);
});

test('requires a build and rejects empty content links', async () => {
  const missing = await check({});
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /Run pnpm build first/);
  const empty = await check({ 'index.html': canonical + '<a href="">Empty</a>' });
  assert.equal(empty.status, 1);
  assert.match(empty.stderr, /empty URL/);
});
