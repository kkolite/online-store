import { showList, showGrid } from './actions';
import { controlFromSlider, controlToSlider, setToggleAccessible } from './fromtofilter';
import { toCapacity, fromCapacity, minCapacity, maxCapacity } from './multifilter';

export function listener() {
  const listView = document.querySelector('.goods__view_list');
  const gridView = document.querySelector('.goods__view_grid');
  const fromPrice = document.querySelector('#fromPrice');
  const toPrice = document.querySelector('#toPrice');
  const minPrice = document.querySelector('#minPrice');
  const maxPrice = document.querySelector('#maxPrice');

  if (
    listView === null ||
    gridView === null ||
    !(fromPrice instanceof HTMLInputElement) ||
    !(toPrice instanceof HTMLInputElement) ||
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

  fromPrice.oninput = () => controlFromSlider(fromPrice, toPrice, minPrice);
  toPrice.oninput = () => controlToSlider(fromPrice, toPrice, maxPrice, '#toPrice');

  setToggleAccessible(toCapacity, '#toCapacity');

  fromCapacity.oninput = () => controlFromSlider(fromCapacity, toCapacity, minCapacity);
  toCapacity.oninput = () => controlToSlider(fromCapacity, toCapacity, maxCapacity, '#toCapacity');
}
