import { createMain } from '../body/mainCreator';
import { mainQuery } from '../mainQuery';

export function errorListener() {
  const button = document.querySelector('.error__button');
  if (!button) return;

  button.addEventListener('click', () => {
    history.pushState({}, 'newUrl', '/');
    createMain();
    mainQuery();
  });
}
