function addImageCaptions() {
  document.querySelectorAll('.sl-markdown-content img[alt]').forEach((img) => {
    const title = img.getAttribute('alt')?.trim();
    if (!title || img.closest('figure')) return;

    const media = img.closest('a') || img;
    const paragraph = media.parentElement;
    // Only replace standalone image paragraphs to keep inline content intact.
    if (paragraph?.tagName !== 'P' || paragraph.childNodes.length !== 1) return;

    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.textContent = title;
    paragraph.replaceWith(figure);
    figure.append(media, caption);
  });
}

addImageCaptions();
document.addEventListener('astro:page-load', addImageCaptions);
