import { IGoods } from '../../data/types';
import { categoryCount, produceCount } from '../filter/filterCount';

class Goods {
  static currentItems: IGoods[] = [];

  createGoods(data: IGoods[]): void {
    console.log(data.length);
    const goodsCollection = document.querySelector('.items');
    const counter = document.querySelector('.sort__found');

    if (!goodsCollection || !counter) return;
    counter.textContent = `${data.length}`;

    if (!data.length) {
      goodsCollection.innerHTML = 'No products were found matching your request';
      return;
    }
    goodsCollection.innerHTML = '';
    produceCount(data);
    categoryCount(data);
    Goods.currentItems = [];
    data.forEach((goods: IGoods) => {
      Goods.currentItems.push(goods);
      const goodsElement = document.createElement('div');
      goodsElement.setAttribute('title', `${goods.title}`);
      if (goodsCollection.className === 'items') {
        goodsElement.classList.add('item');
      } else {
        goodsElement.classList.add('item');
        goodsElement.classList.add('item__list');
      }
      //goodsElement.classList.add('item');
      goodsElement.innerHTML = `<h3 class="item-title">
  ${goods.title}
  </h3>
  <div class="item__image">
    <img src="${goods.source[0]}" alt="${goods.title}" class="item__img">
  </div>
  <div class="item__properties">
  <p class="item__property">
    Produced by ${goods.produce}
  </p>
  <p class="item__property">
    Category: ${goods.category}
  </p>
  <p class="item__property">
    Capacity: ${goods.capacity}
  </p>
  <p class="item__property">
    Price: $${goods.price}
  </p>
  <p class="item__property">
    Range: ${goods.range}
  </p>
  </div>
  <div class="item__buttons-box">
    <button class="item__button button__add">Add to Cart</button>
    <button class="item__button button__buy-now">Buy Now!</button>
  </div>
  <div class="item__count">
    <span class="item__minus">-</span>
    <span class="item__value">0</span>
    <span class="item__plus">+</span>
  </div>`;
      goodsCollection.appendChild(goodsElement);
    });
  }
}

export default Goods;
