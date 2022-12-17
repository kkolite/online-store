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
    listView === null ||
    gridView === null ||
    !(fromPrice instanceof HTMLInputElement) ||
    !(toPrice instanceof HTMLInputElement) ||
    !(fromCapacity instanceof HTMLInputElement) ||
    !(toCapacity instanceof HTMLInputElement) ||
    minCapacity === null ||
    maxCapacity === null ||
    minPrice === null ||
    maxPrice === null
  ) {
    return;
  }

  document.body.addEventListener('click', (e) => {
    if (e.target === listView) {
      showList();
    }
    if (e.target === gridView) {
      showGrid();
    }
  });

  setToggleAccessible(toPrice, '#toPrice');

  fromPrice.oninput = () => controlFromSlider(fromPrice, toPrice, minPrice, 'minPrice');
  toPrice.oninput = () => controlToSlider(fromPrice, toPrice, maxPrice, '#toPrice', 'maxPrice');

  setToggleAccessible(toCapacity, '#toCapacity');

  fromCapacity.oninput = () => controlFromSlider(fromCapacity, toCapacity, minCapacity, 'minCapacity');
  toCapacity.oninput = () => controlToSlider(fromCapacity, toCapacity, maxCapacity, '#toCapacity', 'maxCapacity');
}
