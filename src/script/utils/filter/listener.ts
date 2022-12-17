import { showList, showGrid } from '../view/view';
import { controlFromSlider, controlToSlider, setToggleAccessible } from './fromtofilter';

export function listener() {
  const listView = document.querySelector('.goods__view_list');
  const gridView = document.querySelector('.goods__view_grid');
  const fromPrice = <HTMLInputElement>document.querySelector('#fromPrice');
  const toPrice = <HTMLInputElement>document.querySelector('#toPrice');
  const minPrice = <HTMLElement>document.querySelector('#minPrice');
  const maxPrice = <HTMLElement>document.querySelector('#maxPrice');
  const fromCapacity = <HTMLInputElement>document.querySelector('#fromCapacity');
  const toCapacity = <HTMLInputElement>document.querySelector('#toCapacity');
  const minCapacity = <HTMLElement>document.querySelector('#minCapacity');
  const maxCapacity = <HTMLElement>document.querySelector('#maxCapacity');

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

  setToggleAccessible(<HTMLInputElement>document.querySelector('#toPrice'), '#toPrice');

  (<HTMLInputElement>document.querySelector('#fromPrice')).oninput = () =>
    controlFromSlider(fromPrice, toPrice, minPrice, 'minPrice');
  (<HTMLInputElement>document.querySelector('#toPrice')).oninput = () =>
    controlToSlider(fromPrice, toPrice, maxPrice, '#toPrice', 'maxPrice');

  setToggleAccessible(<HTMLInputElement>document.querySelector('#toCapacity'), '#toCapacity');

  (<HTMLInputElement>document.querySelector('#fromCapacity')).oninput = () =>
    controlFromSlider(fromCapacity, toCapacity, minCapacity, 'minCapacity');
  (<HTMLInputElement>document.querySelector('#toCapacity')).oninput = () =>
    controlToSlider(fromCapacity, toCapacity, maxCapacity, '#toCapacity', 'maxCapacity');
}
