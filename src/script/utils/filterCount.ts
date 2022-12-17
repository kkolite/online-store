import { IGoods } from '../data/types';

export function produceCount(arr: IGoods[]) {
  const filterList = document.querySelectorAll('.filter__produce');
  filterList.forEach((el) => {
    const key = el.getAttribute('title');
    console.log(key);
    const count = arr.filter((item) => item.produce === key).length;
    el.classList.add('active');
    if (count === 0) {
      el.classList.remove('active');
    }
    el.textContent = `${key} (${count})`;
  });
}

export function categoryCount(arr: IGoods[]) {
  const filterList = document.querySelectorAll('.filter__category');
  filterList.forEach((el) => {
    const key = el.getAttribute('title');
    const count = arr.filter((item) => item.category === key).length;
    el.classList.add('active');
    if (count === 0) {
      el.classList.remove('active');
    }
    el.textContent = `${key} (${count})`;
  });
}
