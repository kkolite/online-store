import { IGoods } from '../data/types';
import { createFilters } from './filter/filtersCreator';
import { showPopup } from './goods/goodsListener';
import { CART_LIMIT } from '../data/constants';
import FilterData from './filter/filter';
import data from '../data/data';
import { itemListener } from './item/itemListener';
import { cartListener, emptyCartListener } from './cart/cartListener';
import { Promocode } from './cart/promocode';
import { payListeners } from './Payment/payListeners';
import { infoListeners } from './Payment/infoListeners';
import { pay } from './Payment/payAction';

export function createItemPage(item: IGoods) {
  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = '';
  const page = document.createElement('div');
  page.classList.add('item-page');
  page.innerHTML = `<div class="item-page__img-box">
      <pre class="item-page__route"><span class="bread__main">Main</span>   -   ${item.produce}   -   ${
    item.title
  }</pre>
      <img src="${item.source[0]}" alt="item_photo_1" class="item-page__img">
      <img src="${item.source[1]}" alt="item_photo_2" class="item-page__img">
    </div>
    <div class="item-page__container">
      <div class="item-page__info-container">
        <img src="${item.source[0]}" alt="item_photo" class="item-page__main-img">
        <div class="item-page__info">
          <h3 class="item-page__title">${item.title}</h3>
          <p class="item-page__property">Produced by ${item.produce}</p>
          <p class="item-page__property">Category: ${item.category}</p>
          <p class="item-page__property">Capacity: ${item.capacity}</p>
          <p class="item-page__property">Range: ${item.range}</p>
          <p class="item-page__property">Price: $${item.price / 1000000}m.</p>
          <p class="item-page__property">On stock: ${item.onstock}</p>
          <div class="item__count">
            <span class="item__minus">-</span>
            <span class="item__value">0</span>
            <span class="item__plus">+</span>
          </div>
        </div>
      </div>
      <p class="item-page__desc">${item.description}</p>
      <div class="item-page__buttons-box">
        <button class="button__add item-page__button" title="${item.title}">Add to Cart</button>
        <button class="item-page__button" title="${item.title}">Buy Now!</button>
      </div>
    </div>`;
  main?.appendChild(page);
  itemListener(item);
}

export function createCart(cart: IGoods[], pageNumber = 1) {
  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = '';
  const page = document.createElement('div');
  const list = document.createElement('ul');
  page.classList.add('cart');
  const set = new Set(cart);
  if (set.size === 0) {
    page.innerHTML = `<p>Cart is Empty</p>
    <button class="cart__close-empty">Back to List</button>`;
    page.classList.add('cart_empty');
    main.appendChild(page);
    emptyCartListener();
    return;
  }
  if (set.size > CART_LIMIT) {
    const countPages = Math.ceil(set.size / CART_LIMIT);
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
  const uniqGoods: Array<IGoods> = [];
  set.forEach((item) => uniqGoods.push(item));
  const goodsPerPage = uniqGoods.slice((pageNumber - 1) * CART_LIMIT, CART_LIMIT * pageNumber);
  goodsPerPage.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart__item');
    listItem.setAttribute('title', `${item.title}`);
    listItem.innerHTML = `<img src="${item.source[0]}" alt="${item.title}" class="cart__item-img">
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
    <ul class="promo-list"></ul>
    <button class="cart__controls-pay">Pay</button>`;
  page.appendChild(list);
  page.appendChild(controls);
  main?.appendChild(page);
  Promocode.activePromo = [];
  cartListener();
}

export function createMain() {
  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = `<aside class="filter">
    <h4 class="filter__title">Produce</h4>
    <ul class="filter__list produce"></ul>
    <h4 class="filter__title">Category</h4>
    <ul class="filter__list category"></ul>
    <h4 class="filter__title">Price</h4>
    <div class="price__control">
        <input id="fromPrice" type="range" value="1" min="1" max="500"/>
        <input id="toPrice" type="range" value="500" min="1" max="500"/>
    </div>
    <div class="price__view">
      <div id="minPrice">1</div>
      <div id="maxPrice">500</div>
    </div>
    <h4 class="filter__title">Capacity</h4>
    <div class="capacity__control">
        <input id="fromCapacity" type="range" value="1" min="1" max="550"/>
        <input id="toCapacity" type="range" value="550" min="1" max="550"/>
    </div>
    <div class="capacity__view">
      <div id="minCapacity">1</div>
      <div id="maxCapacity">550</div>
    </div>
  </aside>
  <section class="goods">
    <div class="sort">
      <div class="goods__view">
        <img src="./assets/png/2099192.png" alt="list-view" class="goods__view_list">
        <img src="./assets/png/3603178.png" alt="grid-view" class="goods__view_grid">
      </div>
      <div class="sort_select">
        <select name="sorting" id="sortBy">
          <option value="sortByNameUp"><button class="button name_up">By Name (A-Z)</button></option>
          <option value="sortByNameDown"><button class="button name_down">By Name (Z-A)</button></option>
          <option value="sortByPriceUp"><button class="button price_up">By Price (lower)</button></option>
          <option value="sortByPriceDown"><button class="button price_down">By Price (higher)</button></option>
        </select>
      </div>
    </div>
    <div class="items">
      
    </div>
  </section>`;
  createFilters();
  /*const goods = new Goods();
  goods.createGoods(Goods.currentItems);*/
  const filter = new FilterData();
  filter.filterGoods(data);
  showPopup();
}

export function createError() {
  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = `<p>Page not found</p>
  <button>Back to Main</button>`;
}

export function createPay() {
  const main = <Element>document.querySelector('.main__content');
  const page = document.createElement('form');
  page.classList.add('form');
  main.innerHTML = '';
  page.innerHTML = `<div class="form__info">
    <div class="form__input-container">
      <label for="form__name" class="form__label">Name</label>
      <input type="text" name="" id="form__name" class="form__input">
      <label for="form__name" class="form__label form__name_error label_error"></label>
    </div>

    <div class="form__input-container">
      <label for="form__tel" class="form__label">Phone</label>
      <input type="tel" name="" id="form__tel" class="form__input">
      <label for="form__tel" class="form__label form__tel_error label_error"></label>
    </div>

    <div class="form__input-container">
      <label for="form__adress" class="form__label">Adress</label>
      <input type="text" name="" id="form__adress" class="form__input">
      <label for="form__adress" class="form__label form__adress_error label_error"></label>
    </div>

    <div class="form__input-container">
      <label for="form__email" class="form__label">E-Mail</label>
      <input type="email" name="" id="form__email" class="form__input">
      <label for="form__email" class="form__label form__email_error label_error"></label>
    </div>
  </div>
  <div class="form__payment">
    <img src="./assets/png/credit-card.png" alt="card" height="40px" class="form__cart-img">
    <div class="form__input-container">
      <label for="form__card" class="form__label">Card</label>
      <input type="text" name="" id="form__card" maxlength="19" class="form__input">
      <label for="form__card" class="form__label form__card_error label_error"></label>
    </div>

    <div class="form__input-container">
      <label for="form__date" class="form__label">Date</label>
      <input type="text" name="" id="form__date" maxlength="7" class="form__input form__input-date">
      <label for="form__date" class="form__label form__date_error label_error"></label>
    </div>

    <div class="form__input-container">
      <label for="form__cvc" class="form__label">CVC</label>
      <input type="password" name="" id="form__cvc" maxlength="3" class="form__input form__input-cvc">
      <label for="form__cvc" class="form__label form__cvc_error label_error"></label>
    </div>
  </div>`;

const div = document.createElement('div');
div.innerHTML = `<button class="form__button">Pay</button>
<p class="form__afterpay"></p>`;

main.appendChild(page);
main.appendChild(div);

payListeners();
infoListeners();
pay();
}
