import { showList, showGrid } from './actions';

const listView = <Element>document.querySelector('.goods__view_list');
const gridView = <Element>document.querySelector('.goods__view_grid');

export function listener() {
  document.body.addEventListener('click', (e) => {
    if (e.target === listView) {
      showList();
    }
    if (e.target === gridView) {
      showGrid();
    }
  });
}
