import { IGoods } from '../../data/types';
import cart from '../cart/cart';
import { createPay } from '../Payment/paymentCreator';
import { createMain } from '../body/mainCreator';
import { createCart } from '../cart/cartCreator';
import { createGallery } from './itemGallery';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../data/constants';
//import { mainQuery } from '../mainQuery';
import { fltr } from '../filter/multifilter';
import { showPopup } from '../goods/goodsListener';
import data from '../../data/data';
import SortData from '../filter/sort';

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
    !plus ||
    !breadMain ||
    !minus ||
    !button ||
    !itemCounter ||
    !infoCont ||
    !buyNow ||
    !(imgMain instanceof Image) ||
    !imgBox
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
      button.textContent = REMOVE_FROM_CART;
    }
  });

  minus.addEventListener('click', (/* e */) => {
    if (infoCont.classList.contains('item-page__info-container_active')) {
      cart.deleteFromCart(key);

      if (cart.itemsInCart(key) < 1) {
        infoCont.classList.remove('item-page__info-container_active');
        button.textContent = ADD_TO_CART;
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
      button.textContent = REMOVE_FROM_CART;
    } else {
      alert(`We haven't so many ${key} onstock!`);
    }
    //e.stopPropagation();
  });

  button.addEventListener('click', (/* e */) => {
    if (infoCont.classList.contains('item-page__info-container_active')) {
      infoCont.classList.remove('item-page__info-container_active');
      button.textContent = ADD_TO_CART;
      cart.deleteAllFromCart(key);
      itemCounter.textContent = '0';
    } else {
      infoCont.classList.add('item-page__info-container_active');
      button.textContent = REMOVE_FROM_CART;
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

    createCart();
    createPay();
  });

  imgBox.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Image) || !(imgMain instanceof Image)) return;
    imgMain.src = target.src;
  });

  breadMain.addEventListener('click', () => {
    history.pushState({}, 'newUrl', '/');
    createMain();
    const dataSort = new SortData();
    fltr(dataSort, data);
    showPopup();
    //mainQuery();
  });

  imgMain.addEventListener('click', () => {
    createGallery(imgMain.src);
  });
}
