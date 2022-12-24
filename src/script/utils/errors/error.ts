import { createMain } from '../pagesCreator';

export function errorListener() {
  const button = document.querySelector('.error__button');
  if (!button) return;

  button.addEventListener('click', () => {
    createMain();
  });
}
