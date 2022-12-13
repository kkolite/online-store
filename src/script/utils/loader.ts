import { IGoods } from '../data/types';

class Goods {
  createGoods(data: IGoods[]): void {
    const goodsCollection = <Element>document.querySelector('.items');

    goodsCollection.innerHTML = '';

    data.forEach((goods: IGoods) => {
      const goodsElement = document.createElement('div');

      goodsElement.classList.add('item');
      goodsElement.innerHTML = `<h3 class="item-title">
  ${goods.title}
  </h3>
  <div class="item__image">
    <img src="${goods.source[0]}" alt="apple-iphone-13" class="item__img">
  </div>
  <p class="item__property">
    Производитель: ${goods.produce}
  </p>
  <p class="item__property">
    Category: ${goods.category}
  </p>
  <p class="item__property">
    Capacity: ${goods.capacity}
  </p>
  <p class="item__property">
    Price: ${goods.price}
  </p>
  <p class="item__property">
    Range: ${goods.range}
  </p>`;
      goodsCollection?.appendChild(goodsElement);
    });
  }
}

export default Goods;
