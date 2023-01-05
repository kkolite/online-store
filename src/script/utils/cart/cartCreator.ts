import { IGoods } from '../../data/types';
import { CART_LIMIT, MAX_ITEMS_PER_PAGE } from '../../data/constants';
import { cartListener, emptyCartListener } from './cartListener';
import { Promocode } from './promocode';
import { hideSearch } from '../body/header';
import cart from './cart';
import { createHeader } from '../body/headerCreator';
import { createFooter } from '../body/footerCreator';

export function createCartWithoutHistory(itemsPerPage = CART_LIMIT, pageNumber = 1) {
  createFooter();
  createHeader();
  cart.setFromLocalStorage();

  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = '';
  const page = document.createElement('div');
  const list = document.createElement('ul');
  page.classList.add('cart');

  const uniqGoods: Array<IGoods> = [];
  cart.cartArr.forEach((el) => {
    if (!uniqGoods.map((el) => el.title).includes(el.title)) {
      uniqGoods.push(el);
    }
  });

  if (uniqGoods.length === 0) {
    //history.pushState({}, 'newUrl', `cart`);
    page.innerHTML = `<p>Cart is Empty</p>
      <button class="cart__close-empty">Back to List</button>`;
    page.classList.add('cart_empty');
    main.appendChild(page);
    emptyCartListener();
    hideSearch();
    return;
  }

  //history.pushState({}, 'newUrl', `cart?page=${pageNumber}&items=${itemsPerPage}`);

  const itemsCount = document.createElement('div');
  itemsCount.innerHTML = `<label for="items_show">Show items:</label>
  <input type="number" id="items_show" value="${itemsPerPage}" min="0" max="${MAX_ITEMS_PER_PAGE}">
  `;
  main.appendChild(itemsCount);

  if (uniqGoods.length > itemsPerPage) {
    const countPages = Math.ceil(uniqGoods.length / itemsPerPage);
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    const pageSpan = document.createElement('span');
    pageSpan.innerHTML = 'Page:';
    pagination.appendChild(pageSpan);
    for (let i = 1; i <= countPages; i++) {
      const paginationPage = document.createElement('span');
      paginationPage.classList.add('pagination-page');
      if (i === pageNumber) {
        paginationPage.classList.add('pagination-page_active');
      }
      paginationPage.innerHTML = `${i}`;
      pagination.appendChild(paginationPage);
    }
    main.appendChild(pagination);
  }

  const goodsPerPage = uniqGoods.slice((pageNumber - 1) * itemsPerPage, itemsPerPage * pageNumber);
  goodsPerPage.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart__item');
    listItem.setAttribute('title', `${item.title}`);
    listItem.innerHTML = `<p class="cart__item-index">${uniqGoods.indexOf(item) + 1}</p>
    <img src="${item.source[0]}" alt="${item.title}" class="cart__item-img">
      <a href="${item.title}" class="cart__item-link">
        <div class="cart__item-info">
          <p>${item.title}</p>
          <p class="cart__item-desc">${item.category} aircraft, produced by ${item.produce}.<br>
          Capacity: ${item.capacity}. Range: ${item.range}.</p>
        </div>
      </a>
      <div class="cart__item-controls">
        <p class="cart__item-onstock">Stock: ${item.onstock}</p>
        <div class="item__count">
          <span class="item__minus">-</span>
          <span class="item__value">0</span>
          <span class="item__plus">+</span>
        </div>
        <button class="cart__item-remove">Remove All</button>
      </div>
      <p class="cart__item-price"></p>`;
    list.appendChild(listItem);
  });

  const controls = document.createElement('div');
  controls.classList.add('cart__controls');
  controls.innerHTML = `<p>Products: <span class="cart__controls-products"></span></p>
      <p>Total: $<span class="cart__controls-sum"></span><span class="cart__new-price"></span></p>
      <input type="text" placeholder="Have a promocode?" id="promo" name="promo" value="" autofocus autocomplete="off" maxlength="11" class="cart__controls-promo">
      <label class="cart__controls-promo-helper">2023, rsschool and our githubs</label>
      <ul class="promo-list"></ul>
      <button class="cart__controls-pay">Pay</button>`;
  page.appendChild(list);
  page.appendChild(controls);
  main?.appendChild(page);
  if (Promocode.activePromo.length > 0) {
    const promo = new Promocode();
    promo.afterReload();
  }
  //Promocode.activePromo = [];
  cartListener();
  hideSearch();
  document.title = 'Cart';
}

export function createCart(itemsPerPage = CART_LIMIT, pageNumber = 1) {
  createCartWithoutHistory(itemsPerPage, pageNumber);
  history.pushState({}, 'newUrl', `cart?page=${pageNumber}&items=${itemsPerPage}`);
}
