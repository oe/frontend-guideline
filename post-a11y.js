document.body.querySelectorAll('.sl-container img').forEach((img) => {
  const title = img.getAttribute('alt');
  if (!title) return;
  // remove for seo, as it's already in the figcaption
  img.removeAttribute('alt');
  const figure = document.createElement('figure');
  img.parentNode.replaceChild(figure, img);
  figure.appendChild(img);
  img.insertAdjacentHTML(
    'afterend',
    `<figcaption class="text-center italic">${title}</figcaption>`
  );
});