import cart from './cart';

export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const buttonList = document.querySelectorAll('.button__add');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const popup = document.querySelector('.popup');
  let count = Number(countOfGoods.textContent);

  buttonList.forEach((el) => {
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

  goodsList.forEach((goods) => {
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
  });

  popup?.addEventListener('click', () => popup.classList.remove('popup_active'));
}
