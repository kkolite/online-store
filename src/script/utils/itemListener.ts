import { IGoods } from '../data/types';
import cart from './cart';

export function itemListener(item: IGoods) {
  const button = document.querySelector('.button__add');
  const minus = document.querySelector('.item__minus');
  const plus = document.querySelector('.item__plus');
  const itemCounter = document.querySelector('.item__value');
  const moneyInCart = <Element>document.querySelector('.money');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const itemTitle = document.querySelector('.item-page__title');

  if (plus == null || minus == null || button == null || itemCounter == null || itemTitle === null) {
    return;
  }

  let count = Number(countOfGoods.textContent);
  const key = item.title;
  moneyInCart.textContent = cart.moneySum();
  itemCounter.textContent = `${cart.itemsInCart(key)}`;

  cart.cartArr.forEach((el) => {
    if (key === el.title) {
      itemTitle.classList.add('item-page__title_incart');
      button.textContent = 'Remove';
    }
  });

  minus.addEventListener('click', (/* e */) => {
    if (itemTitle.classList.contains('item-page__title_incart')) {
      cart.deleteFromCart(key);

      if (cart.itemsInCart(key) < 1) {
        itemTitle.classList.remove('item-page__title_incart');
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
      itemTitle.classList.add('item-page__title_incart');
      button.textContent = 'Remove';
    } else {
      alert(`We haven't so many ${key} onstock!`);
    }
    //e.stopPropagation();
  });

  button.addEventListener('click', (/* e */) => {
    if (itemTitle.classList.contains('item-page__title_incart')) {
      itemTitle.classList.remove('item-page__title_incart');
      button.textContent = 'Add to Cart';
      cart.deleteAllFromCart(key);
      itemCounter.textContent = '0';
    } else {
      itemTitle.classList.add('item-page__title_incart');
      button.textContent = 'Remove';
      cart.pushInCart(key);
      itemCounter.textContent = '1';
    }

    count = cart.cartLength();
    countOfGoods.innerHTML = count.toString();
    moneyInCart.textContent = cart.moneySum();
    //e.stopPropagation();
  });
}
