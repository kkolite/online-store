//import promocodes from '../../data/promocodes';
import { createCart, createMain } from '../pagesCreator';
import cart from './cart';

export function headerListener() {
  const headerCart = document.querySelector('.header__cart');
  if (headerCart === null) return;
  headerCart.addEventListener('click', () => {
    const currentCart = cart.cartArr;
    createCart(currentCart);
    history.pushState({}, 'newUrl', 'cart');
  });
}

export function cartListener() {
  const minusList = document.querySelectorAll('.item__minus');
  const plusList = document.querySelectorAll('.item__plus');
  const removeList = document.querySelectorAll('.cart__item-remove');
  const itemList = document.querySelectorAll('.cart__item');
  //const promo = document.querySelector('.cart__controls-promo');

  //if (!(promo instanceof HTMLInputElement)) return;

  itemList.forEach((el) => {
    const key = el.getAttribute('title');
    const value = el.querySelector('.item__value');
    if (key === null || value === null) return;

    value.textContent = `${cart.itemsInCart(key)}`;
    checkPrice(el, key);
  });

  // Listeners

  minusList.forEach((minus) => {
    const good = minus.closest('.cart__item');
    if (good === null) return;

    minus.addEventListener('click', (e) => {
      const key = good.getAttribute('title');
      const counter = good.querySelector('.item__value');
      if (key === null || counter === null) return;

      if (cart.itemsInCart(key) > 0) {
        cart.deleteFromCart(key);
        checkPrice(good, key);
        const counter = good.querySelector('.item__value');
        if (counter === null) return;

        counter.textContent = `${cart.itemsInCart(key)}`;

        if (cart.itemsInCart(key) < 1) {
          good.remove();
          checkEmpty();
        }
      }
      e.stopPropagation();
    });
  });

  plusList.forEach((plus) => {
    const good = plus.closest('.cart__item');
    if (good === null) return;

    plus.addEventListener('click', (e) => {
      const key = good.getAttribute('title');
      const counter = good.querySelector('.item__value');
      if (key === null || counter === null) return;

      if (!cart.isEnough(key)) {
        cart.pushInCart(key);
        checkPrice(good, key);
        counter.textContent = `${cart.itemsInCart(key)}`;
      } else {
        alert(`We haven't so many ${key} onstock!`);
      }
      e.stopPropagation();
    });
  });

  removeList.forEach((button) => {
    const good = button.closest('.cart__item');
    if (good === null) return;

    button.addEventListener('click', (e) => {
      const key = good.getAttribute('title');
      if (key === null) return;

      cart.deleteAllFromCart(key);
      good.remove();
      checkEmpty();
      checkPrice(good, key);
      e.stopPropagation();
    });
  });

  /*promo.addEventListener('input', () => {
    const keys = promocodes.map((el) => el.key);
    if (keys.includes(promo.value)) {

    }
  })*/

  function checkPrice(good: Element, key: string) {
    const price = good.querySelector('.cart__item-price');
    const moneyInCart = document.querySelector('.money');
    const countOfGoods = document.querySelector('.count');
    const totalSum = document.querySelector('.cart__controls-sum');
    const products = document.querySelector('.cart__controls-products');
    if (moneyInCart === null || countOfGoods === null || price === null || products === null || totalSum === null)
      return;

    price.textContent = `$${cart.itemPriceSum(key) / 1000000} m.`;
    const count = cart.cartLength();
    countOfGoods.innerHTML = count.toString();
    products.textContent = count.toString();
    moneyInCart.textContent = cart.moneySum();
    totalSum.textContent = cart.moneySum();
  }

  function checkEmpty() {
    if (cart.cartLength() === 0) {
      createCart(cart.cartArr);
    }
  }
}

export function emptyCartListener() {
  const button = document.querySelector('.cart__close-empty');
  if (button === null) return;

  button.addEventListener('click', () => {
    history.pushState({}, 'newUrl', 'index.html');
    createMain();
  });
}
