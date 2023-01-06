import cart from '../cart/cart';
import { createMain } from './mainCreator';
import { createCart } from '../cart/cartCreator';
import { mainQuery } from '../mainQuery';

export function headerListener() {
  const headerCart = document.querySelector('.header__cart');
  const headerLink = document.querySelector('.header__title');

  if (!headerCart || !headerLink) return;

  headerCart.addEventListener('click', () => {
    createCart();
  });

  headerLink.addEventListener('click', () => {
    createMain();
    mainQuery();
  });
}

export function hideSearch() {
  const search = document.querySelector('.header__search');
  if (!search) return;

  search.classList.add('hide');
}

export function visibleSearch() {
  const search = document.querySelector('.header__search');
  if (!search) return;

  search.classList.remove('hide');
}

export function headerInfo() {
  const moneyInCart = document.querySelector('.money');
  const countOfGoods = document.querySelector('.count');
  if (!moneyInCart || !countOfGoods) return;

  const count = cart.cartLength();
  countOfGoods.innerHTML = count.toString();
  moneyInCart.textContent = cart.moneySum();
}
