import { mainQuery } from '../mainQuery';
import { showList, showGrid } from '../view/view';
import { controlFromSlider, controlToSlider, setToggleAccessible } from './fromtofilter';

export function listener() {
  const listView = document.querySelector('.goods__view_list');
  const gridView = document.querySelector('.goods__view_grid');
  const fromPrice = document.querySelector('#fromPrice');
  const toPrice = document.querySelector('#toPrice');
  const minPrice = document.querySelector('#minPrice');
  const maxPrice = document.querySelector('#maxPrice');
  const fromCapacity = document.querySelector('#fromCapacity');
  const toCapacity = document.querySelector('#toCapacity');
  const minCapacity = document.querySelector('#minCapacity');
  const maxCapacity = document.querySelector('#maxCapacity');

  if (
    !listView ||
    !gridView ||
    !(fromPrice instanceof HTMLInputElement) ||
    !(toPrice instanceof HTMLInputElement) ||
    !(fromCapacity instanceof HTMLInputElement) ||
    !(toCapacity instanceof HTMLInputElement) ||
    !minCapacity ||
    !maxCapacity ||
    !minPrice ||
    !maxPrice
  ) {
    return;
  }

  document.body.addEventListener('click', (e) => {
    if (e.target === listView) {
      showList();
      mainQuery();
      gridView.classList.remove('goods__view_active');
      listView.classList.add('goods__view_active');
    }
    if (e.target === gridView) {
      showGrid();
      mainQuery();
      listView.classList.remove('goods__view_active');
      gridView.classList.add('goods__view_active');
    }
  });

  setToggleAccessible(toPrice, '#toPrice');

  fromPrice.oninput = () => controlFromSlider(fromPrice, toPrice, minPrice, 'minPrice');
  toPrice.oninput = () => controlToSlider(fromPrice, toPrice, maxPrice, '#toPrice', 'maxPrice');

  setToggleAccessible(toCapacity, '#toCapacity');

  fromCapacity.oninput = () => controlFromSlider(fromCapacity, toCapacity, minCapacity, 'minCapacity');
  toCapacity.oninput = () => controlToSlider(fromCapacity, toCapacity, maxCapacity, '#toCapacity', 'maxCapacity');
}
