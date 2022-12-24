import { createMain, createItemPage, createCart, createError } from './pagesCreator';
import data from '../data/data';
import cart from './cart/cart';
import { removePayment } from './Payment/payAction';
import { removeGallery } from './item/itemGallery';

export function router(event: Event) {
  event.preventDefault();
  const target = event.target;
  if (!(target instanceof Element)) return;

  let key = target.getAttribute('title');
  if (!key) {
    const parent = target.closest('.item');
    if (!parent) return;

    key = parent.getAttribute('title');
  }

  const item = data.find((el) => el.title === key);
  if (!item) return;

  createItemPage(item);
}

window.addEventListener('popstate', function () {
  const route = window.location.pathname.split('/');
  const page = route[route.length - 1];
  removePayment();
  removeGallery();
  if (page === 'index.html' || page === '') {
    createMain();
  } else if (page === 'cart') {
    createCart(cart.cartArr);
  } else {
    const key = page.replace('_', ' ');
    const item = data.find((el) => el.title === key);
    if (!item) return;
    createItemPage(item);
  }
});

export function location() {
  const route = window.location.pathname.replace('_', ' ').slice(1);
  const arr = data.map((el) => el.title);
  console.log(route);

  if (arr.includes(route)) {
    const item = data.find((el) => el.title === route);
    if (!item) return;
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
