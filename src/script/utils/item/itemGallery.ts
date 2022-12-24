export function createGallery(src: string) {
  const background = document.createElement('div');
  const img = document.createElement('img');
  const body = <Element>document.querySelector('.page');

  background.classList.add('gallery');
  img.classList.add('gallery__img');
  img.src = src;
  img.alt = 'aircraft image';
  background.appendChild(img);
  body.appendChild(background);

  background.addEventListener('click', () => {
    removeGallery();
  });
}

export function removeGallery() {
  const background = document.querySelector('.gallery');
  if (!background) return;

  background.remove();
}
