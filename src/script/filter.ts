import SortData from './sort';
import { IGoods, IFilter } from './data/types';
import { addProperty, fltr, produceArr, categoryArr, search, fromPrice, toPrice } from './utils/multifilter';
import { showPopup } from './utils/popup';

const produce = document.querySelector<HTMLElement>('.produce');
const color = document.querySelector<HTMLElement>('.category');
const cancel = document.querySelector('.cancel');
const minPrice = <HTMLElement>document.querySelector('#minPrice');

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
      showPopup();
    });

    if (produce) {
      produce.onclick = function (e) {
        addProperty(produceArr, e);
        fltr(dataSort, data);
        showPopup();
      };
    }

    if (color) {
      color.onclick = function (e) {
        addProperty(categoryArr, e);
        fltr(dataSort, data);
        showPopup();
      };
    }

    if (search) {
      search.oninput = function () {
        fltr(dataSort, data);
        showPopup();
      };
    }

    if (fromPrice) {
      fromPrice.onchange = function () {
        fltr(dataSort, data);
        showPopup();
      };
    }
  }
}

export default FilterData;
