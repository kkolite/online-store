export function showPopup() {
  const goodsList = document.querySelectorAll('.item');
  const countOfGoods = <HTMLDivElement>document.querySelector('.count');
  const popup = document.querySelector('.popup');
  let count = 0;

  goodsList.forEach((goods) => {
    goods.addEventListener('click', () => {
      if (goods.classList.contains('incart')) {
        count--;
        countOfGoods.innerHTML = count.toString();
        goods.classList.remove('incart');
      } else {
        if (count === 5) {
          popup?.classList.add('popup_active');
        } else {
          count++;
          countOfGoods.innerHTML = count.toString();
          goods.classList.add('incart');
        }
      }
    });
  });

  popup?.addEventListener('click', () => popup.classList.remove('popup_active'));
}
