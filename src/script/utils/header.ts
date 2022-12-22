import cart from './cart/cart';
import { createCart, createMain } from './pagesCreator';

export function headerListener() {
  const headerCart = document.querySelector('.header__cart');
  const headerLink = document.querySelector('.header__title');

  if (headerCart === null || headerLink === null) return;

  headerCart.addEventListener('click', () => {
    const currentCart = cart.cartArr;
    createCart(currentCart);
    history.pushState({}, 'newUrl', 'cart');
  });

  headerLink.addEventListener('click', () => {
    createMain();
    history.pushState({}, 'newUrl', '/');
  });
}

export function hideSearch() {
  const search = document.querySelector('.header__search');
  if (search === null) return;

  search.classList.add('hide');
}

export function visibleSearch() {
  const search = document.querySelector('.header__search');
  if (search === null) return;

  search.classList.remove('hide');
}
