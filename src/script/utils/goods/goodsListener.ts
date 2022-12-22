import cart from '../cart/cart';
import { listener } from '../filter/listener';
import { createCart } from '../pagesCreator';
import { router } from '../router';

export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const buttonList = document.querySelectorAll('.button__add');
  const buyNow = document.querySelectorAll('.button__buy-now');
  const minusList = document.querySelectorAll('.item__minus');
  const plusList = document.querySelectorAll('.item__plus');
  const itemsCountersList = document.querySelectorAll('.item__value');
  const moneyInCart = document.querySelector('.money');
  const countOfGoods = document.querySelector('.count');

  if (moneyInCart === null || countOfGoods === null) return;

  let count = Number(countOfGoods.textContent);

  moneyInCart.textContent = cart.moneySum();

  goodsList.forEach((el) => {
    el.addEventListener('click', (e) => {
      router(e);
      e.stopPropagation();
    });
  });

  goodsList.forEach((goods) => {
    const key = goods.getAttribute('title');
    const button = goods.querySelector('.button__add');
    if (key === null || button === null) return;

    cart.cartArr.forEach((el) => {
      if (key === el.title) {
        goods.classList.add('incart');
        button.textContent = 'Remove';
      } else {
        button.textContent = 'Add to Cart';
      }
    });
  });

  itemsCountersList.forEach((el) => {
    const goods = el.closest('.item');
    if (goods === null) {
      return;
    }

    const key = goods.getAttribute('title');
    if (key === null) return;

    el.textContent = `${cart.itemsInCart(key)}`;
  });

  // Listners

  minusList.forEach((minus) => {
    const goods = minus.closest('.item');
    if (goods === null) return;

    minus.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      const button = goods.querySelector('.button__add');
      if (key === null || button === null) return;
      if (goods.classList.contains('incart')) {
        cart.deleteFromCart(key);

        if (cart.itemsInCart(key) < 1) {
          goods.classList.remove('incart');
          button.textContent = 'Add to Cart';
        }

        count = cart.cartLength();
        countOfGoods.innerHTML = `${count}`;
        moneyInCart.textContent = cart.moneySum();
        const counter = goods.querySelector('.item__value');
        if (counter === null) return;

        counter.textContent = `${cart.itemsInCart(key)}`;
      }
      e.stopPropagation();
    });
  });

  plusList.forEach((plus) => {
    const goods = plus.closest('.item');
    if (goods === null) {
      return;
    }
    plus.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      const counter = goods.querySelector('.item__value');
      const button = goods.querySelector('.button__add');
      if (key === null || counter === null || button === null) return;

      if (!cart.isEnough(key)) {
        cart.pushInCart(key);
        count = cart.cartLength();
        countOfGoods.innerHTML = count.toString();
        moneyInCart.textContent = cart.moneySum();
        counter.textContent = `${cart.itemsInCart(key)}`;
        goods.classList.add('incart');
        button.textContent = 'Remove';
      } else {
        alert(`We haven't so many ${key} onstock!`);
      }
      e.stopPropagation();
    });
  });

  buttonList.forEach((button) => {
    const goods = button.closest('.item');
    if (goods === null) return;

    button.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      const counter = goods.querySelector('.item__value');
      if (key === null || counter === null) return;

      if (goods.classList.contains('incart')) {
        goods.classList.remove('incart');
        button.textContent = 'Add to Cart';
        cart.deleteAllFromCart(key);
        counter.textContent = '0';
      } else {
        goods.classList.add('incart');
        button.textContent = 'Remove';
        cart.pushInCart(key);
        counter.textContent = '1';
      }

      count = cart.cartLength();
      countOfGoods.innerHTML = count.toString();
      moneyInCart.textContent = cart.moneySum();
      e.stopPropagation();
    });
  });

  buyNow.forEach((button) => {
    const goods = button.closest('.item');
    if (goods === null) return;

    button.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      if (key === null) return;

      if (cart.itemsInCart(key) < 1) {
        cart.pushInCart(key);
      }

      createCart(cart.cartArr);
      e.stopPropagation();
    });
  });

  listener();
}
