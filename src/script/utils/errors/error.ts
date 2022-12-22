import { createMain } from '../pagesCreator';

export function errorListener() {
  const button = document.querySelector('.error__button');
  if (button === null) return;

  button.addEventListener('click', () => {
    createMain();
  });
}
