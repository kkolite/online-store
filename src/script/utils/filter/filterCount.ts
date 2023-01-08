import data from '../../data/data';
import { IGoods } from '../../data/types';

export function produceCount(arr: IGoods[]) {
  const filterList = document.querySelectorAll('.filter__produce');
  filterList.forEach((el) => {
    const key = el.getAttribute('title');
    const count = arr.filter((item) => item.produce === key).length;
    const all = data.filter((item) => item.produce === key).length;
    el.classList.add('active');
    if (count === 0) {
      el.classList.remove('active');
    }
    el.textContent = `${key} (${count}/${all})`;
  });
}

export function categoryCount(arr: IGoods[]) {
  const filterList = document.querySelectorAll('.filter__category');
  filterList.forEach((el) => {
    const key = el.getAttribute('title');
    const count = arr.filter((item) => item.category === key).length;
    const all = data.filter((item) => item.category === key).length;
    el.classList.add('active');
    if (count === 0) {
      el.classList.remove('active');
    }
    el.textContent = `${key} (${count}/${all})`;
  });
}

export function priceCount(arr: IGoods[]) {
  const fromPrice = document.getElementById('fromPrice');
  const toPrice = document.getElementById('toPrice');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  const priceArr = arr.map((el) => el.price / 1000000);
  if (priceArr.length !== 0) {
    const min = Math.min(...priceArr);
    const max = Math.max(...priceArr);

    if (fromPrice && toPrice && minPrice && maxPrice) {
      (<HTMLInputElement>fromPrice).value = min.toString();
      (<HTMLInputElement>toPrice).value = max.toString();
      minPrice.innerHTML = min.toString();
      maxPrice.innerHTML = max.toString();
    }
  }
}

export function capacityCount(arr: IGoods[]) {
  const fromCapacity = document.getElementById('fromCapacity');
  const toCapacity = document.getElementById('toCapacity');
  const minCapacity = document.getElementById('minCapacity');
  const maxCapacity = document.getElementById('maxCapacity');
  const capacityArr = arr.map((el) => el.capacity);

  if (capacityArr.length !== 0) {
    const min = Math.min(...capacityArr);
    const max = Math.max(...capacityArr);

    if (fromCapacity && toCapacity && minCapacity && maxCapacity) {
      (<HTMLInputElement>fromCapacity).value = `${min}`;
      (<HTMLInputElement>toCapacity).value = max.toString();
      minCapacity.innerHTML = min.toString();
      maxCapacity.innerHTML = max.toString();
    }
  }
}
