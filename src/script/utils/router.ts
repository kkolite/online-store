import { createError } from './errors/errorCreator';
import data from '../data/data';
import cart from './cart/cart';
import { removePayment } from './Payment/payAction';
import { removeGallery } from './item/itemGallery';
import { createItemPage } from './item/itemPageCreator';
import { createCart } from './cart/cartCreator';
import { createMain } from './body/mainCreator';

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
    const pg = +getQueryString('page');
    const items = +getQueryString('items');
    if (!pg || !items) return;
    createCart(cart.cartArr, items, pg);
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

  if (arr.includes(route)) {
    const item = data.find((el) => el.title === route);
    if (!item) return;
    createItemPage(item);
    return;
  }

  if (route === 'cart') {
    const page = +getQueryString('page');
    const items = +getQueryString('items');
    if (page && items) {
      createCart(cart.cartArr, items, page);
      return;
    }
  }

  if (route === '') {
    /*const category = getQueryString('cat');
    const produce = getQueryString('prod');
    const sort = getQueryString('sort');
    const search = getQueryString('search');
    const view = getQueryString('view');*/

    createMain();
    return;
  }

  createError();
}

function getQueryString(value: string) {
  const query = window.location.search.substring(1);
  const serchArr = query.split('&');

  for (let i = 0; i < serchArr.length; i++) {
    const pair = serchArr[i].split('=');
    if (pair[0] === value) return pair[1];
  }

  return false;
}
