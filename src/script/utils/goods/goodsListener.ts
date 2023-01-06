import cart from '../cart/cart';
import { listener } from '../filter/listener';
import { createPay } from '../Payment/paymentCreator';
import { createCart } from '../cart/cartCreator';
import { router } from '../router';
import { headerInfo } from '../body/header';
import { REMOVE_FROM_CART, ADD_TO_CART } from '../../data/constants';
import { mainQuery } from '../mainQuery';

export function showPopup() {
  mainQuery();
  const goodsList = document.querySelectorAll('.item');
  goodsList.forEach((good) => {
    good.addEventListener('click', (e) => {
      router(e);
      e.stopPropagation();
    });

    const key = good.getAttribute('title');
    const counter = good.querySelector('.item__value');
    const button = good.querySelector('.button__add');
    const buyNow = good.querySelector('.button__buy-now');
    const minus = good.querySelector('.item__minus');
    const plus = good.querySelector('.item__plus');
    const itemsCounter = good.querySelector('.item__value');

    if (!button || !buyNow || !key || !counter || !plus || !minus || !itemsCounter) return;

    cart.cartArr.forEach((el) => {
      if (key === el.title) {
        good.classList.add('incart');
        button.textContent = 'Remove';
      }
    });

    itemsCounter.textContent = `${cart.itemsInCart(key)}`;

    button.addEventListener('click', (e) => {
      if (good.classList.contains('incart')) {
        good.classList.remove('incart');
        button.textContent = ADD_TO_CART;
        cart.deleteAllFromCart(key);
        counter.textContent = '0';
      } else {
        good.classList.add('incart');
        button.textContent = REMOVE_FROM_CART;
        cart.pushInCart(key);
        counter.textContent = '1';
      }
      headerInfo();
      e.stopPropagation();
    });

    buyNow.addEventListener('click', (e) => {
      if (cart.itemsInCart(key) < 1) {
        cart.pushInCart(key);
      }

      createCart();
      createPay();
      e.stopPropagation();
    });

    plus.addEventListener('click', (e) => {
      if (!cart.isEnough(key)) {
        cart.pushInCart(key);
        headerInfo();
        counter.textContent = `${cart.itemsInCart(key)}`;
        good.classList.add('incart');
        button.textContent = REMOVE_FROM_CART;
      } else {
        alert(`We haven't so many ${key} onstock!`);
      }
      e.stopPropagation();
    });

    minus.addEventListener('click', (e) => {
      if (good.classList.contains('incart')) {
        cart.deleteFromCart(key);

        if (cart.itemsInCart(key) < 1) {
          good.classList.remove('incart');
          button.textContent = ADD_TO_CART;
        }

        headerInfo();
        const counter = good.querySelector('.item__value');
        if (!counter) return;

        counter.textContent = `${cart.itemsInCart(key)}`;
      }
      e.stopPropagation();
    });
  });

  listener();
}
