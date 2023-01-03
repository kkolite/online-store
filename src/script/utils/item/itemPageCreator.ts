import { IGoods } from '../../data/types';
import { itemListener } from './itemListener';
import { hideSearch } from '../body/header';
import cart from '../cart/cart';
import { createHeader } from '../body/headerCreator';
import { createFooter } from '../body/footerCreator';

export function createItemPageWithoutHistory(item: IGoods) {
  createFooter();
  createHeader();
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
          <button class="item-page__button button__buy-now" title="${item.title}">Buy Now!</button>
        </div>
      </div>`;
  //history.pushState({}, 'newUrl', `${item.title.replace(' ', '_')}`);
  main?.appendChild(page);
  cart.setFromLocalStorage();
  itemListener(item);
  hideSearch();
  document.title = `${item.title}`;
}

export function createItemPage(item: IGoods) {
  createItemPageWithoutHistory(item);
  history.pushState({}, 'newUrl', `${item.title.replace(' ', '_')}`);
}
