import SortData from './sort';
import { IGoods, IFilter } from '../../data/types';
import { addProperty, fltr, produceArr, categoryArr /*, search*/ } from './multifilter';
import { showPopup } from '../goods/goodsListener';
import Goods from '../goods/goodsCreator';

class FilterData {
  sortGood: IFilter;

  constructor() {
    this.sortGood = new SortData();
  }

  filterGoods(data: IGoods[]) {
    const produce = document.querySelector('.produce');
    const color = document.querySelector('.category');
    const cancel = document.querySelector('.cancel');
    const fromPrice = document.querySelector('#fromPrice');
    const toPrice = document.querySelector('#toPrice');
    const fromCapacity = document.querySelector('#fromCapacity');
    const toCapacity = document.querySelector('#toCapacity');
    const search = document.querySelector('#search');
    const dataSort = this.sortGood;

    if (
      !(produce instanceof HTMLElement) ||
      !(color instanceof HTMLElement) ||
      !(fromPrice instanceof HTMLInputElement) ||
      !(fromCapacity instanceof HTMLInputElement) ||
      !(toPrice instanceof HTMLInputElement) ||
      !(toCapacity instanceof HTMLInputElement) ||
      !(search instanceof HTMLInputElement) ||
      cancel === null
    ) {
      return;
    }

    if (Goods.currentItems.length === 0) {
      dataSort.sortGoods(data);
    } else {
      dataSort.sortGoods(Goods.currentItems);
    }

    cancel.addEventListener('click', () => {
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
