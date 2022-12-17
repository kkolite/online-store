import { IGoods } from '../data/types';
import cart from './cart';
import { createMain } from './pagesCreator';

export function itemListener(item: IGoods) {
  const button = document.querySelector('.button__add');
  const minus = document.querySelector('.item__minus');
  const plus = document.querySelector('.item__plus');
  const itemCounter = document.querySelector('.item__value');
  const moneyInCart = <Element>document.querySelector('.money');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const itemTitle = document.querySelector('.item-page__title');
  const breadMain = document.querySelector('.bread__main');
  const imgMain = document.querySelector('.item-page__main-img');
  const imgBox = document.querySelector('.item-page__img-box');

  if (
    plus == null ||
    breadMain === null ||
    minus == null ||
    button == null ||
    itemCounter == null ||
    itemTitle === null ||
    imgBox === null
  ) {
    return;
  }

  let count = Number(countOfGoods.textContent);
  const key = item.title;
  moneyInCart.textContent = cart.moneySum();
  itemCounter.textContent = `${cart.itemsInCart(key)}`;

  cart.cartArr.forEach((el) => {
    if (key === el.title) {
      itemTitle.classList.add('item-page__title_incart');
      button.textContent = 'Remove';
    }
  });

  minus.addEventListener('click', (/* e */) => {
    if (itemTitle.classList.contains('item-page__title_incart')) {
      cart.deleteFromCart(key);

      if (cart.itemsInCart(key) < 1) {
        itemTitle.classList.remove('item-page__title_incart');
        button.textContent = 'Add to Cart';
      }

      count = cart.cartLength();
      countOfGoods.innerHTML = `${count}`;
      moneyInCart.textContent = cart.moneySum();
      itemCounter.textContent = `${cart.itemsInCart(key)}`;
    }
    //e.stopPropagation();
  });

  plus.addEventListener('click', (/* e */) => {
    if (!cart.isEnough(key)) {
      cart.pushInCart(key);
      count = cart.cartLength();
      countOfGoods.innerHTML = count.toString();
      moneyInCart.textContent = cart.moneySum();
      itemCounter.textContent = `${cart.itemsInCart(key)}`;
      itemTitle.classList.add('item-page__title_incart');
      button.textContent = 'Remove';
    } else {
      alert(`We haven't so many ${key} onstock!`);
    }
    //e.stopPropagation();
  });

  button.addEventListener('click', (/* e */) => {
    if (itemTitle.classList.contains('item-page__title_incart')) {
      itemTitle.classList.remove('item-page__title_incart');
      button.textContent = 'Add to Cart';
      cart.deleteAllFromCart(key);
      itemCounter.textContent = '0';
    } else {
      itemTitle.classList.add('item-page__title_incart');
      button.textContent = 'Remove';
      cart.pushInCart(key);
      itemCounter.textContent = '1';
    }

    count = cart.cartLength();
    countOfGoods.innerHTML = count.toString();
    moneyInCart.textContent = cart.moneySum();
    //e.stopPropagation();
  });

  imgBox.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Image) || !(imgMain instanceof Image)) return;
    imgMain.src = target.src;
  });

  breadMain.addEventListener('click', () => {
    history.pushState({}, 'newUrl', 'index.html');
    createMain();
  });
}
