import SortData from './sort';
import { IGoods, IFilter } from './data/types';
//import { createFilters } from './utils/filtersCreator';
import { addProperty, fltr, produceArr, categoryArr, search } from './utils/multifilter';
import { showPopup } from './utils/goodsListener';
import Goods from './utils/goodsCreator';

//const minPrice = <HTMLElement>document.querySelector('#minPrice');

class FilterData {
  sortGood: IFilter;

  constructor() {
    //createFilters();
    this.sortGood = new SortData();
  }

  filterGoods(data: IGoods[]) {
    const produce = document.querySelector<HTMLElement>('.produce');
    const color = document.querySelector<HTMLElement>('.category');
    const cancel = document.querySelector('.cancel');
    const fromPrice = <HTMLInputElement>document.querySelector('#fromPrice');
    const toPrice = <HTMLInputElement>document.querySelector('#toPrice');
    const fromCapacity = <HTMLInputElement>document.querySelector('#fromCapacity');
    const toCapacity = <HTMLInputElement>document.querySelector('#toCapacity');
    const dataSort = this.sortGood;
    if (Goods.currentItems.length === 0) {
      dataSort.sortGoods(data);
    } else {
      dataSort.sortGoods(Goods.currentItems);
    }

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

    if (toPrice) {
      toPrice.onchange = function () {
        fltr(dataSort, data);
        showPopup();
      };
    }

    if (fromCapacity) {
      fromCapacity.onchange = function () {
        fltr(dataSort, data);
        showPopup();
      };
    }

    if (toCapacity) {
      toCapacity.onchange = function () {
        fltr(dataSort, data);
        showPopup();
      };
    }
  }
}

export default FilterData;
