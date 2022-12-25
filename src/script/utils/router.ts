import { createError } from './errors/errorCreator';
import data from '../data/data';
import cart from './cart/cart';
import { removePayment } from './Payment/payAction';
import { removeGallery } from './item/itemGallery';
import { createItemPage } from './item/itemPageCreator';
import { createCart } from './cart/cartCreator';
import { createMain } from './body/mainCreator';
import { CART_LIMIT } from '../data/constants';

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
  } else if (page.startsWith('cart?page=')) {
    const routeArr = page.split('=');
    const pageNum = +routeArr[1];
    if (pageNum > 0 && pageNum <= data.length) {
      createCart(cart.cartArr, CART_LIMIT, pageNum);
    }
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
  const pageArr: string[] = [];
  for (let i = 0; i < data.length; i++) {
    pageArr.push(`cart?page=${i + 1}`);
  }

  if (arr.includes(route)) {
    const item = data.find((el) => el.title === route);
    if (!item) return;
    createItemPage(item);
    return;
  }

  if (pageArr.includes(route)) {
    const routeArr = route.split('=');
    const pageNum = +routeArr[routeArr.length - 1];
    createCart(cart.cartArr, CART_LIMIT, pageNum);
    return;
  }

  /* if (route === 'cart') {
    createCart(cart.cartArr);
    return;
  } */

  if (route === '') {
    createMain();
    return;
  }

  createError();
}
