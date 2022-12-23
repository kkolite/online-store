import { IGoods } from '../../data/types';
import cart from '../cart/cart';
import { createCart, createMain, createPay } from '../pagesCreator';
import { createGallery } from './itemGallery';

export function itemListener(item: IGoods) {
  const button = document.querySelector('.button__add');
  const buyNow = document.querySelector('.button__buy-now');
  const minus = document.querySelector('.item__minus');
  const plus = document.querySelector('.item__plus');
  const itemCounter = document.querySelector('.item__value');
  const moneyInCart = <Element>document.querySelector('.money');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const breadMain = document.querySelector('.bread__main');
  const imgMain = document.querySelector('.item-page__main-img');
  const imgBox = document.querySelector('.item-page__img-box');
  const infoCont = document.querySelector('.item-page__info-container');

  if (
    plus == null ||
    breadMain === null ||
    minus == null ||
    button == null ||
    itemCounter == null ||
    infoCont === null ||
    buyNow === null ||
    !(imgMain instanceof Image) ||
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
      infoCont.classList.add('item-page__info-container_active');
      button.textContent = 'Remove';
    }
  });

  minus.addEventListener('click', (/* e */) => {
    if (infoCont.classList.contains('item-page__info-container_active')) {
      cart.deleteFromCart(key);

      if (cart.itemsInCart(key) < 1) {
        infoCont.classList.remove('item-page__info-container_active');
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
      infoCont.classList.add('item-page__info-container_active');
      button.textContent = 'Remove';
    } else {
      alert(`We haven't so many ${key} onstock!`);
    }
    //e.stopPropagation();
  });

  button.addEventListener('click', (/* e */) => {
    if (infoCont.classList.contains('item-page__info-container_active')) {
      infoCont.classList.remove('item-page__info-container_active');
      button.textContent = 'Add to Cart';
      cart.deleteAllFromCart(key);
      itemCounter.textContent = '0';
    } else {
      infoCont.classList.add('item-page__info-container_active');
      button.textContent = 'Remove';
      cart.pushInCart(key);
      itemCounter.textContent = '1';
    }

    count = cart.cartLength();
    countOfGoods.innerHTML = count.toString();
    moneyInCart.textContent = cart.moneySum();
    //e.stopPropagation();
  });

  buyNow.addEventListener('click', () => {
    if (cart.itemsInCart(key) < 1) {
      cart.pushInCart(key);
    }

    createCart(cart.cartArr);
    createPay();
  });

  imgBox.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Image) || !(imgMain instanceof Image)) return;
    imgMain.src = target.src;
  });

  breadMain.addEventListener('click', () => {
    createMain();
  });

  imgMain.addEventListener('click', () => {
    createGallery(imgMain.src);
  })
}
