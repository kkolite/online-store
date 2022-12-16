import { showList, showGrid } from './actions';
import { controlFromSlider, controlToSlider, setToggleAccessible } from './fromtofilter';

const listView = <Element>document.querySelector('.goods__view_list');
const gridView = <Element>document.querySelector('.goods__view_grid');
const fromPrice = <HTMLInputElement>document.querySelector('#fromPrice');
const toPrice = <HTMLInputElement>document.querySelector('#toPrice');
const minPrice = <Element>document.querySelector('#minPrice');
const maxPrice = <Element>document.querySelector('#maxPrice');

export function listener() {
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
}
