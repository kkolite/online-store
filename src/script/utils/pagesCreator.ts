import { IGoods } from '../data/types';

export function сreateItemPage(item: IGoods) {
  const main = <Element>document.querySelector('.items');
  main.innerHTML = '';
  const page = document.createElement('div');
  page.classList.add('item-page');
  page.innerHTML = `<div class="item-page__img-box">
      <img src="${item.source[0]}" alt="item_photo_1">
      <img src="${item.source[1]}" alt="item_photo_2">
    </div>
    <div class="item-page__info">
      <h3 class="item-page__title">${item.title}</h3>
      <p class="item-page__property">Produced by ${item.produce}</p>
      <p class="item-page__property">Category: ${item.category}</p>
      <p class="item-page__property">Capacity: ${item.capacity}</p>
      <p class="item-page__property">Range: ${item.range}</p>
      <p class="item-page__property">Price: $${item.price}</p>
      <p class="item-page__property">On stock: ${item.onstock}</p>
      <p class="item-page__desc">${item.description}</p>
      <div class="item-page__buttons-box">
        <button class="item-page__button">Add to Cart!</button>
        <button class="item-page__button">Buy Now!</button>
      </div>
    </div>`;
  main?.appendChild(page);
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
