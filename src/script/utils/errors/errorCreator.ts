import { hideSearch } from '../body/header';
import { errorListener } from './error';

export function createError() {
  const header = <Element>document.querySelector('.header');
  header.classList.add('no-display');
  header.innerHTML = '';

  const footer = <Element>document.querySelector('.footer');
  footer.classList.add('no-display');
  footer.innerHTML = '';

  const body = <Element>document.querySelector('.page');
  body.classList.add('no-scroll');

  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = `<p class="error__text">Page not found</p>
  <button class="error__button">Back to Main</button>`;
  main.classList.add('error__main');

  const page = <Element>document.querySelector('.main');
  page.classList.add('error__background');

  hideSearch();
  errorListener();
}
