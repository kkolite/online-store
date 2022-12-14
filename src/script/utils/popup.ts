import cart from './cart';
import { listener } from './listener';

export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const buttonList = document.querySelectorAll('.button__add');
  const minusList = document.querySelectorAll('.item__minus');
  const plusList = document.querySelectorAll('.item__plus');
  const itemsCountersList = document.querySelectorAll('.item__value');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const popup = document.querySelector('.popup');
  let count = Number(countOfGoods.textContent);

  goodsList.forEach((el) => {
    el.addEventListener('click', (e) => {
      alert('click!');
      e.stopPropagation();
    });
  });

  goodsList.forEach((goods) => {
    const key = goods.getAttribute('title');
    if (key === null) return;

    cart.cartArr.forEach((el) => {
      if (key === el.title) {
        goods.classList.add('incart');
      }
    });
  });

  itemsCountersList.forEach((el) => {
    const goods = el.parentElement?.parentElement;
    if (goods === null || goods === undefined) {
      return;
    }

    const key = goods.getAttribute('title');
    if (key === null) return;
    el.textContent = `${cart.itemsInCart(key)}`;
  });

  // Listners

  minusList.forEach((minus) => {
    const goods = minus.parentElement?.parentElement;
    if (goods === null || goods === undefined) {
      return;
    }
    minus.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      const button = minus.parentElement?.previousElementSibling?.children[0];
      if (key === null || button === undefined) return;
      if (goods.classList.contains('incart')) {
        cart.deleteFromCart(key);

        if (cart.itemsInCart(key) < 1) {
          goods.classList.remove('incart');
          button.textContent = 'Add to Cart';
        }

        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        const counter = minus.nextElementSibling;
        if (counter === null) {
          return;
        }

        counter.textContent = `${cart.itemsInCart(key)}`;
      }
      e.stopPropagation();
    });
  });

  plusList.forEach((plus) => {
    const goods = plus.parentElement?.parentElement;
    if (goods === null || goods === undefined) {
      return;
    }
    plus.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      const counter = plus.previousElementSibling;
      const button = plus.parentElement?.previousElementSibling?.children[0];
      if (key === null || counter === null || button === undefined) return;

      if (!cart.isItemInCart(key)) {
        cart.pushInCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        console.log(counter.textContent);
        counter.textContent = cart.itemsInCart(key).toString();
        goods.classList.add('incart');
        button.textContent = 'Remove';
      } else {
        alert(`We haven't so many ${key} onstock!`);
      }
      e.stopPropagation();
    });
  });

  buttonList.forEach((button) => {
    const goods = button.parentElement?.parentElement;
    if (goods === null || goods === undefined) {
      return;
    }
    button.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      const counter = button.parentElement?.nextElementSibling?.children[1];
      if (key === null || counter === undefined) return;

      if (goods.classList.contains('incart')) {
        goods.classList.remove('incart');
        button.textContent = 'Add to Cart';
        cart.deleteAllFromCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        counter.textContent = '0';
      } else {
        goods.classList.add('incart');
        button.textContent = 'Remove';
        cart.pushInCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        counter.textContent = '1';
      }
      e.stopPropagation();
    });
  });

  popup?.addEventListener('click', () => popup.classList.remove('popup_active'));
  listener();
}
