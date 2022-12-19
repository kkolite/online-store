import { createCart } from '../pagesCreator';
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
  const itemsCountersList = document.querySelectorAll('.item__value');
  const removeList = document.querySelectorAll('.cart__item-remove');
  const priceList = document.querySelectorAll('.cart__item-price');
  const moneyInCart = document.querySelector('.money');
  const countOfGoods = document.querySelector('.count');

  if (moneyInCart === null || countOfGoods === null) return;

  let count = Number(countOfGoods.textContent);

  priceList.forEach((el) => {
    const good = el.closest('.cart__item');
    if (good === null) return;

    const key = good.getAttribute('title');
    if (key === null) return;

    el.textContent = `$${cart.itemPriceSum(key) / 1000000} m.`;
  });

  itemsCountersList.forEach((el) => {
    const good = el.closest('.cart__item');
    if (good === null) return;

    const key = good.getAttribute('title');
    if (key === null) return;

    el.textContent = `${cart.itemsInCart(key)}`;
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
      checkPrice(good, key);
      e.stopPropagation();
    });
  });

  function checkPrice(good: Element, key: string) {
    const price = good.querySelector('.cart__item-price');
    if (moneyInCart === null || countOfGoods === null || price === null) return;

    price.textContent = `$${cart.itemPriceSum(key) / 1000000} m.`;
    count = cart.cartLength();
    countOfGoods.innerHTML = count.toString();
    moneyInCart.textContent = cart.moneySum();
  }
}


