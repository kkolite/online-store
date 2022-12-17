import { IGoods } from '../data/types';
import { createFilters } from './filtersCreator';
import { showPopup } from './goodsListener';
//import Goods from './goodsCreator';
import FilterData from '../filter';
import data from '../data/data';
import { itemListener } from './itemListener';

export function сreateItemPage(item: IGoods) {
  const main = <Element>document.querySelector('.main__content');
  main.innerHTML = '';
  const page = document.createElement('div');
  page.classList.add('item-page');
  page.innerHTML = `<div class="item-page__img-box">
      <pre class="item-page__route"><span class="bread__main">Main</span>   -   ${item.produce}   -   ${item.title}</pre>
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

export function createCart(cart: IGoods[]) {
  const goodsCollection = <Element>document.querySelector('.items');
  goodsCollection.innerHTML = '';
  const page = document.createElement('div');
  const list = document.createElement('ul');
  page.classList.add('cart');
  cart.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    listItem.innerHTML = `<p><a href="">${item.title}</a></p>
      <button>Delete</button>`;
    list.appendChild(listItem);
  });
  const controls = document.createElement('div');
  controls.classList.add('cart__controls');
  controls.innerHTML = `<button class="cart__button_clear">Clear</button>
    <button class="cart__button_pay">Pay</button>`;
  page.appendChild(list);
  page.appendChild(controls);
  goodsCollection?.appendChild(page);
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
          <option value="sortByNameUp"><button class="button name_up">от а до я</button></option>
          <option value="sortByNameDown"><button class="button name_down">от я до а</button></option>
          <option value="sortByPriceUp"><button class="button price_up">сначала дешевые</button></option>
          <option value="sortByPriceDown"><button class="button price_down">сначала дорогие</button></option>
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
