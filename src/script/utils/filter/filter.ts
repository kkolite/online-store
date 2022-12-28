import SortData from './sort';
import { IGoods, IFilter } from '../../data/types';
import { addProperty, fltr, produceArr, categoryArr /*sortByalphabet*/ } from './multifilter';
import { showPopup } from '../goods/goodsListener';
import Goods from '../goods/goodsCreator';
import { sortType } from '../filter/sort';
import { createMain } from '../body/mainCreator';
//import { doc } from 'prettier';

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
    const reset = document.querySelector('.filter__reset');
    const copy = document.querySelector('.filter__copy');
    const dataSort = this.sortGood;

    if (
      !(produce instanceof HTMLElement) ||
      !(color instanceof HTMLElement) ||
      !(fromPrice instanceof HTMLInputElement) ||
      !(fromCapacity instanceof HTMLInputElement) ||
      !(toPrice instanceof HTMLInputElement) ||
      !(toCapacity instanceof HTMLInputElement) ||
      !(search instanceof HTMLInputElement) ||
      !cancel ||
      !reset ||
      !copy
    ) {
      return;
    }

    if (!Goods.currentItems.length) {
      dataSort.sortGoods(data);
    } else {
      dataSort.sortGoods(Goods.currentItems);
    }

    reset.addEventListener('click', () => {
      search.value = '';
      while (produceArr.length !== 0) {
        produceArr.pop();
      }
      while (categoryArr.length !== 0) {
        categoryArr.pop();
      }
      sessionStorage.setItem('minPrice', fromPrice.min);
      sessionStorage.setItem('maxPrice', toPrice.max);
      sessionStorage.setItem('minCapacity', fromCapacity.min);
      sessionStorage.setItem('maxCapacity', toCapacity.max);
      sortType.type = 'default';
      createMain();
      (<HTMLInputElement>document.querySelector('#search')).value = '';
      /* showGrid(); */
      fltr(dataSort, data);
      showPopup();
    });

    copy.addEventListener('click', () => {
      const temp = window.location.href;
      navigator.clipboard.writeText(temp);
    });

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
