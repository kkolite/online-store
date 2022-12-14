import cart from './cart';
//import { listener } from './listener';

export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const buttonList = document.querySelectorAll('.button__add');
  const minusList = document.querySelectorAll('.item__minus');
  const plusList = document.querySelectorAll('.item__plus');
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

  // Listners

  minusList.forEach((minus) => {
    const goods = minus.parentElement?.parentElement;
    if (goods === null || goods === undefined) {
      return;
    }
    minus.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      if (key === null) return;
      if (goods.classList.contains('incart')) {
        cart.deleteFromCart(key);
        const count = cart.itemsInCart(key);
        if (count < 1) {
          goods.classList.remove('incart');
        }

        const counter = minus.nextSibling;
        if (counter === null) {
          return;
        }
        counter.textContent = `${count}`;
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
      const counter = plus.previousSibling;
      if (key === null || counter === null) return;
      if (!cart.isItemInCart(key)) {
        cart.pushInCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        counter.textContent = `${cart.itemsInCart(key)}`;
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
      const counter = button.parentElement?.nextSibling?.childNodes[1];
      if (key === null || counter === undefined) return;
      if (goods.classList.contains('incart')) {
        goods.classList.remove('incart');
        //button.textContent = 'Add to Cart';
        cart.deleteAllFromCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        counter.textContent = '0';
      } else {
        goods.classList.add('incart');
        //button.textContent = 'Add More';
        cart.pushInCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
        counter.textContent = '1';
      }
      e.stopPropagation();
    });
  });

  /*goodsList.forEach((goods) => {
    goods.addEventListener('click', () => {
      const key = goods.getAttribute('title');
      if (key === null) return;
      if (goods.classList.contains('incart')) {
        count--;
        countOfGoods.innerHTML = count.toString();
        goods.classList.remove('incart');
        cart.deleteFromCart(key);
      } else {
        if (count === 5) {
          popup?.classList.add('popup_active');
        } else {
          count++;
          countOfGoods.innerHTML = count.toString();
          goods.classList.add('incart');
          cart.pushInCart(key);
        }
      }
    });
  });*/

  popup?.addEventListener('click', () => popup.classList.remove('popup_active'));
  //listener();
}
