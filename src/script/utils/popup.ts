export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const popup = document.querySelector('.popup');
  let count = Number(countOfGoods.textContent);

  goodsList.forEach((goods) => {
    if (goods.getAttribute('isincart') === 'true') {
      goods.classList.add('incart');
    }
  });

  goodsList.forEach((goods) => {
    goods.addEventListener('click', () => {
      if (goods.classList.contains('incart')) {
        count--;
        countOfGoods.innerHTML = count.toString();
        goods.classList.remove('incart');
        goods.setAttribute('isInCart', 'false');
      } else {
        if (count === 5) {
          popup?.classList.add('popup_active');
        } else {
          count++;
          countOfGoods.innerHTML = count.toString();
          goods.classList.add('incart');
          goods.setAttribute('isInCart', 'true');
        }
      }
    });
  });

  popup?.addEventListener('click', () => popup.classList.remove('popup_active'));
}
