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
