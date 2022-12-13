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
    <img src="${goods.source}" alt="apple-iphone-13" class="item__img">
  </div>
  <p class="item__property">
    Производитель: ${goods.produce}
  </p>
  <p class="item__property">
    Год выпуска: ${goods.year}
  </p>
  <p class="item__property">
    Цвет: ${goods.color}
  </p>
  <p class="item__property">
    Оперативная память: ${goods.memory}
  </p>
  <p class="item__property">
    Цена: ${goods.price}
  </p>
  <p class="item__property">
    Популярный: ${goods.favorite}
  </p>`;
      goodsCollection?.appendChild(goodsElement);
    });
  }
}

export default Goods;
