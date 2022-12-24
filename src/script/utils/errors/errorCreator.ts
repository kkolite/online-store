import { hideSearch } from '../body/header';
import { errorListener } from './error';

export function createError() {
  const main = <Element>document.querySelector('.main__content');
  const page = <Element>document.querySelector('.main');
  const header = <Element>document.querySelector('.header');
  const footer = <Element>document.querySelector('.footer');
  const body = <Element>document.querySelector('.page');

  header.classList.add('no-display');
  footer.classList.add('no-display');
  body.classList.add('no-scroll');

  header.innerHTML = '';
  footer.innerHTML = '';
  main.innerHTML = `<p class="error__text">Page not found</p>
    <button class="error__button">Back to Main</button>`;
  hideSearch();
  page.classList.add('error__background');
  main.classList.add('error__main');
  errorListener();
}
