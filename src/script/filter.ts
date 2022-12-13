import SortData from './sort';
import { IGoods, IFilter } from './data/types';
import { addProperty, fltr, produceArr, categoryArr, search /*memoryArr*/ } from './utils/multifilter';

const produce = document.querySelector<HTMLElement>('.produce');
//const memory = document.querySelector<HTMLElement>('.memory');
const color = document.querySelector<HTMLElement>('.category');
const cancel = document.querySelector('.cancel');

class FilterData {
  sortGood: IFilter;

  constructor() {
    this.sortGood = new SortData();
  }

  filterGoods(data: IGoods[]) {
    const dataSort = this.sortGood;

    dataSort.sortGoods(data);

    cancel?.addEventListener('click', () => {
      search.value = '';
      search.focus();
      fltr(dataSort, data);
    });

    if (produce) {
      produce.onclick = function (e) {
        addProperty(produceArr, e);
        fltr(dataSort, data);
      };
    }

    /*if (memory) {
      memory.onclick = function (e) {
        addProperty(memoryArr, e);
        fltr(dataSort, data);
      };
    }*/

    if (color) {
      color.onclick = function (e) {
        addProperty(categoryArr, e);
        fltr(dataSort, data);
      };
    }

    if (search) {
      search.oninput = function () {
        fltr(dataSort, data);
      };
    }
  }
}

export default FilterData;
