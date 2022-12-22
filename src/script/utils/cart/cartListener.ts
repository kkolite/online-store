import data from '../../data/data';
import promocodes from '../../data/promocodes';
import { createCart, createItemPage, createMain, createPay } from '../pagesCreator';
import cart from './cart';
import { Promocode } from './promocode';

const promocode = new Promocode();

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
  const promo = document.querySelector('.cart__controls-promo');
  const promoList = document.querySelector('.promo-list');
  const paginationPage = document.querySelectorAll('.pagination-page');
  const linkList = document.querySelectorAll('.cart__item-link');
  const payButton = document.querySelector('.cart__controls-pay');

  if (!(promo instanceof HTMLInputElement) || promoList === null || payButton === null) return;

  if (paginationPage) {
    paginationPage.forEach((item) => {
      const pageNumber = +item.innerHTML;
      item.addEventListener('click', () => createCart(cart.cartArr, pageNumber));
    });
  }

  itemList.forEach((el) => {
    const key = el.getAttribute('title');
    const value = el.querySelector('.item__value');
    if (key === null || value === null) return;

    value.textContent = `${cart.itemsInCart(key)}`;
    checkPrice(el, key);
  });

  // Listeners

  payButton.addEventListener('click', () => {
    createPay();
  });

  linkList.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.parentElement?.getAttribute('title');
      const item = data.find((el) => el.title === key);
      if (item === undefined) return;

      createItemPage(item);
      history.pushState({}, 'newUrl', `${item.title.replace(' ', '_')}`);
    });
  });

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

  promo.addEventListener('input', () => {
    const keys = promocodes.map((el) => el.key);
    if (keys.includes(promo.value)) {
      promocode.checkPromo(promo.value);
      promo.value = '';
      priceWithPromo();
    }
  });

  promoList.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    if (target.classList.contains('promo-list__remove')) {
      const key = target.parentElement?.id;
      if (key === undefined) return;

      promocode.deletePromo(key);
      priceWithPromo();
    }
  });

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
    priceWithPromo();
  }

  function checkEmpty() {
    if (cart.cartLength() === 0) {
      createCart(cart.cartArr);
    }
  }

  function priceWithPromo() {
    const totalSum = document.querySelector('.cart__controls-sum');
    const withPromoSum = document.querySelector('.cart__new-price');

    if (totalSum === null || withPromoSum === null) return;

    if (Promocode.activePromo.length > 0) {
      totalSum.classList.add('cart__controls-sum_none');
      const currPrice = cart.cartArr.reduce((acc, el) => acc + el.price, 0) / 1000000;
      const discount = promocode.sumDiscount();
      withPromoSum.textContent = `$${promocode.newPrice(currPrice, discount)} m.`;
    } else {
      totalSum.classList.remove('cart__controls-sum_none');
      withPromoSum.textContent = '';
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
