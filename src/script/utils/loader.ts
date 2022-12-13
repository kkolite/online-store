import { IGoods } from '../data/types';

class Goods {
  createGoods(data: IGoods[]): void {
    const goodsCollection = <Element>document.querySelector('.items');

    goodsCollection.innerHTML = '';

    data.forEach((goods: IGoods) => {
      const goodsElement = document.createElement('div');
      goodsElement.setAttribute('title', `${goods.title}`);
      goodsElement.classList.add('item');
      goodsElement.innerHTML = `<h3 class="item-title">
  ${goods.title}
  </h3>
  <div class="item__image">
    <img src="${goods.source[0]}" alt="apple-iphone-13" class="item__img">
  </div>
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
  <div class="item__buttons-box">
    <button class="item__button button__add">Add to Cart</button>
    <button class="item__button button__buy-now">Buy Now!</button>
  </div>`;
      goodsCollection?.appendChild(goodsElement);
    });
  }
}

export default Goods;
