import { createMain, createItemPage, createCart, createError } from './pagesCreator';
import data from '../data/data';
import cart from './cart/cart';

export function router(event: Event) {
  event.preventDefault();
  const target = event.target;
  if (target === null || !(target instanceof Element)) return;

  let key = target.getAttribute('title');
  if (key === null) {
    const parent = target.closest('.item');
    if (parent === null) return;

    key = parent.getAttribute('title');
  }

  const item = data.find((el) => el.title === key);
  if (item === undefined) return;

  createItemPage(item);
}

window.addEventListener('popstate', function () {
  const route = window.location.pathname.split('/');
  const page = route[route.length - 1];
  console.log(page);
  if (page === 'index.html' || page === '') {
    createMain();
  } else if (page === 'cart') {
    createCart(cart.cartArr);
  } else {
    const key = page.replace('_', ' ');
    const item = data.find((el) => el.title === key);
    if (item === undefined) return;
    createItemPage(item);
  }
});

/*window.addEventListener('DOMContentLoaded', function() {
  let route = data.find(item => item.path == window.location.pathname);
  root.innerHTML = route.data;
})*/

export function location() {
  const route = window.location.pathname.replace('_', ' ').slice(1);
  const arr = data.map((el) => el.title);
  console.log(route);

  if (arr.includes(route)) {
    const item = data.find((el) => el.title === route);
    if (item === undefined) return;
    createItemPage(item);
    return;
  }

  if (route === 'cart') {
    createCart(cart.cartArr);
    return;
  }

  if (route === '') {
    createMain();
    return;
  }

  createError();
}
