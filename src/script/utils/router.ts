import { createError } from './errors/errorCreator';
import data from '../data/data';
import { removePayment } from './Payment/payAction';
import { removeGallery } from './item/itemGallery';
import { createItemPage, createItemPageWithoutHistory } from './item/itemPageCreator';
import { createCart, createCartWithoutHistory } from './cart/cartCreator';
import { createMain } from './body/mainCreator';
import { categoryArr, produceArr, fltr } from './filter/multifilter';
import { showGrid, showList } from './view/view';
import SortData, { sortType } from './filter/sort';
import { showPopup } from './goods/goodsListener';
//import { mainQuery } from './mainQuery';

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

export function popstate() {
  window.addEventListener('popstate', function () {
    const route = window.location.pathname.split('/');
    const page = route[route.length - 1];
    console.log('Route:', route, page, window.history.state);
    removePayment();
    removeGallery();
    if (page === 'index.html' || page === '') {
      createMain();
      const dataSort = new SortData();
      fltr(dataSort, data);
      showPopup();
    } else if (page === 'cart') {
      const pg = +getQueryString('page');
      const items = +getQueryString('items');
      if (!pg || !items) return;
      createCartWithoutHistory(items, pg);
    } else {
      const key = page.replace('_', ' ');
      const item = data.find((el) => el.title === key);
      if (!item) return;
      createItemPageWithoutHistory(item);
    }
  });
}

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
      createCart(items, page);
    } else {
      createCart();
    }
    return;
  }

  if (route === '') {
    const category = getQueryString('cat');
    while (categoryArr.length !== 0) {
      categoryArr.pop();
    }
    if (category !== '') {
      if (category) {
        const catArr: string[] = category.split('.');
        catArr.forEach((item) => {
          const arr = data.map((el) => el.category.toString());
          if (arr.includes(item)) {
            categoryArr.push(item);
          } else {
            createError();
            return;
          }
        });
      }
    }

    const produce = getQueryString('prod');
    while (produceArr.length !== 0) {
      produceArr.pop();
    }
    if (produce !== '') {
      if (produce) {
        const prodArr: string[] = produce.split('.');
        prodArr.forEach((item) => {
          const arr = data.map((el) => el.produce);
          if (arr.includes(item)) {
            produceArr.push(item);
          } else {
            createError();
            return;
          }
        });
      }
    }

    let slctIndex: number | undefined;
    const sort = getQueryString('sort');
    if (sort) {
      if (sort === 'a') {
        data.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          return -1;
        });
        sortType.type = 'a';
        slctIndex = 0;
      } else if (sort === 'z') {
        data.sort((a, b) => {
          if (b.title > a.title) {
            return 1;
          }
          return -1;
        });
        sortType.type = 'z';
        slctIndex = 1;
      } else if (sort === 'lp') {
        data.sort((a, b) => a.price - b.price);
        sortType.type = 'lp';
        slctIndex = 2;
      } else if (sort === 'hp') {
        data.sort((a, b) => b.price - a.price);
        sortType.type = 'hp';
        slctIndex = 3;
      }
    }

    const search = getQueryString('search');
    const view = getQueryString('view');

    const pmin = getQueryString('pmin');
    if (pmin) {
      sessionStorage.setItem('minPrice', pmin);
    }

    const pmax = getQueryString('pmax');
    if (pmax) {
      sessionStorage.setItem('maxPrice', pmax);
    }

    const cmin = getQueryString('cmin');
    if (cmin) {
      sessionStorage.setItem('minCapacity', cmin);
    }

    const cmax = getQueryString('cmax');
    if (cmax) {
      sessionStorage.setItem('maxCapacity', cmax);
    }

    history.pushState({}, 'newUrl', '/');
    createMain();
    const select = <HTMLSelectElement>document.getElementById('sortBy');
    if (slctIndex) {
      select.selectedIndex = slctIndex;
    }

    if (search) {
      const field = document.querySelector('#search');
      if (!(field instanceof HTMLInputElement)) return;

      field.value = search;
    }

    const dataSort = new SortData();
    fltr(dataSort, data);
    showPopup();
    //mainQuery();

    //if (view) {
    if (view === 'grid') {
      showGrid();
    } else if (view === 'list') {
      showList();
    }

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
