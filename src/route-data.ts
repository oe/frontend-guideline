import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ locals, site, url }) => {
  const route = locals.starlightRoute;
  const noindex = route.head.some(({ tag, attrs }) =>
    tag === 'meta' && attrs?.name === 'robots' && String(attrs.content).includes('noindex')
  );
  // A static 404 can be served at any missing URL, so it has no canonical address.
  if (noindex) {
    route.head = route.head.filter(({ tag, attrs }) =>
      !(tag === 'link' && attrs?.rel === 'canonical') && attrs?.property !== 'og:url'
    );
    return;
  }
  if (!site) return;

  const home = new URL(import.meta.env.BASE_URL, site);
  const isHome = url.pathname === home.pathname;
  const canonical = route.head.find(({ tag, attrs }) => tag === 'link' && attrs?.rel === 'canonical');
  const pageUrl = String(canonical?.attrs?.href);
  const image = new URL('social-card.png', home).href;
  const { title, description } = route.entry.data;

  for (const entry of route.head) {
    if (isHome && entry.tag === 'title') entry.content = route.siteTitle;
    if (entry.attrs?.property === 'og:type') entry.attrs.content = isHome ? 'website' : 'article';
    if (entry.attrs?.property === 'og:locale') entry.attrs.content = route.lang.replaceAll('-', '_');
  }
  route.head.push(
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: '前端开发学习指引：基础、实践与工程化' } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
    { tag: 'meta', attrs: { name: 'twitter:image:alt', content: '前端开发学习指引：基础、实践与工程化' } },
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      // Head content is emitted as raw HTML. Escape '<' to prevent closing the script tag.
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': isHome ? 'WebSite' : 'TechArticle',
        '@id': isHome ? home.href : `${pageUrl}#article`,
        url: pageUrl,
        name: title,
        ...(isHome ? {} : { headline: title, isPartOf: { '@id': home.href } }),
        description,
        inLanguage: route.lang,
        image,
      }).replaceAll('<', '\\u003c'),
    },
  );
});
