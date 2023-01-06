import data from '../../data/data';
import promocodes from '../../data/promocodes';
import { createPay } from '../Payment/paymentCreator';
import { createMain } from '../body/mainCreator';
import cart from './cart';
import { Promocode } from './promocode';
import { createItemPage } from '../item/itemPageCreator';
import { createCart } from './cartCreator';
import { MAX_ITEMS_PER_PAGE } from '../../data/constants';
import { mainQuery } from '../mainQuery';

const promocode = new Promocode();

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
  const itemsShow = <HTMLInputElement>document.querySelector('#items_show');

  if (!(promo instanceof HTMLInputElement) || !promoList || !payButton || !itemsShow) return;

  if (paginationPage) {
    paginationPage.forEach((item) => {
      const pageNumber = +item.innerHTML;
      item.addEventListener('click', () => createCart(+itemsShow.value, pageNumber));
    });
  }

  if (itemsShow) {
    itemsShow.addEventListener('change', () => {
      const value = +itemsShow.value;
      if (value <= 0 || value > MAX_ITEMS_PER_PAGE) {
        return;
      }
      createCart(value);
    });
  }

  itemList.forEach((el) => {
    const key = el.getAttribute('title');
    const value = el.querySelector('.item__value');
    if (!key || !value) return;

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
      if (!item) return;

      createItemPage(item);
    });
  });

  minusList.forEach((minus) => {
    const good = minus.closest('.cart__item');
    if (!good) return;

    minus.addEventListener('click', (e) => {
      const key = good.getAttribute('title');
      const counter = good.querySelector('.item__value');
      if (!key || !counter) return;

      if (cart.itemsInCart(key) > 0) {
        cart.deleteFromCart(key);
        checkPrice(good, key);
        const counter = good.querySelector('.item__value');
        if (!counter) return;

        counter.textContent = `${cart.itemsInCart(key)}`;

        if (cart.itemsInCart(key) < 1) {
          good.remove();
          checkEmpty();
        }
      }

      paginationCheck();
      e.stopPropagation();
    });
  });

  plusList.forEach((plus) => {
    const good = plus.closest('.cart__item');
    if (!good) return;

    plus.addEventListener('click', (e) => {
      const key = good.getAttribute('title');
      const counter = good.querySelector('.item__value');
      if (!key || !counter) return;

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
    if (!good) return;

    button.addEventListener('click', (e) => {
      const key = good.getAttribute('title');
      if (!key) return;

      cart.deleteAllFromCart(key);
      good.remove();
      checkEmpty();
      checkPrice(good, key);
      paginationCheck();
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
      if (!key) return;

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
    if (!moneyInCart || !countOfGoods || !price || !products || !totalSum) return;

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
      createCart();
    }
  }

  function priceWithPromo() {
    const totalSum = document.querySelector('.cart__controls-sum');
    const withPromoSum = document.querySelector('.cart__new-price');

    if (!totalSum || !withPromoSum) return;

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

  function paginationCheck() {
    const currentPage = document.querySelector('.pagination-page_active');

    if (!currentPage) {
      const value = +itemsShow.value;
      createCart(value);
    } else {
      const value = +itemsShow.value;
      const currentPageNum = +currentPage.innerHTML;
      if (Math.ceil(cart.cartLength() / value) < currentPageNum) {
        createCart(value, currentPageNum - 1);
      } else {
        createCart(value, currentPageNum);
      }
    }
  }
}

export function emptyCartListener() {
  const button = document.querySelector('.cart__close-empty');
  if (!button) return;

  button.addEventListener('click', () => {
    history.pushState({}, 'newUrl', '/');
    createMain();
    mainQuery();
  });
}
