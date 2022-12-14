import cart from './cart';
import { listener } from './listener';

export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const buttonList = document.querySelectorAll('.button__add');
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

  buttonList.forEach((button) => {
    const goods = button.parentElement?.parentElement;
    if (goods === null || goods === undefined) {
      return;
    }
    button.addEventListener('click', (e) => {
      const key = goods.getAttribute('title');
      if (key === null) return;
      if (goods.classList.contains('incart')) {
        if (cart.itemInCart(key) === true) {
          cart.pushInCart(key);
          count = cart.cartCounter();
          countOfGoods.innerHTML = count.toString();
        } else {
          alert(`We haven't so many ${key} onstock!`);
          /*goods.classList.remove('incart');
          button.textContent = 'Add to Cart';
          cart.deleteFromCart(key);
          count = cart.cartCounter();
          countOfGoods.innerHTML = count.toString();*/
        }
      } else {
        goods.classList.add('incart');
        button.textContent = 'Add More';
        cart.pushInCart(key);
        count = cart.cartCounter();
        countOfGoods.innerHTML = count.toString();
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
  listener();
}
