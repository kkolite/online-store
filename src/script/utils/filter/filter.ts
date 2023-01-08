import SortData from './sort';
import { IGoods, IFilter } from '../../data/types';
import { addProperty, fltr, produceArr, categoryArr /*sortByalphabet*/ } from './multifilter';
import { showPopup } from '../goods/goodsListener';
import Goods from '../goods/goodsCreator';
//import { sortType } from '../filter/sort';
import { createMain } from '../body/mainCreator';
import { showGrid, showList, view } from '../view/view';
import { mainQuery } from '../mainQuery';

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
      //const temp = (<HTMLSelectElement>document.getElementById('sortBy')).selectedIndex;
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
      data.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        return -1;
      });
      //sortType.type = 'default';
      createMain();
      const dataSort = new SortData();
      (<HTMLInputElement>document.querySelector('#search')).value = '';
      if (view === 'grid') {
        showGrid();
      } else {
        showList();
      }
      fltr(dataSort, data);
      showPopup();
      //mainQuery();
      //(<HTMLSelectElement>document.getElementById('sortBy')).selectedIndex = temp;
    });

    copy.addEventListener('click', () => {
      const temp = window.location.href;
      navigator.clipboard.writeText(temp);
      copy.textContent = 'Done!';
      copy.classList.add('filter__copy_done');
      setTimeout(function () {
        copy.textContent = 'Copy';
        copy.classList.remove('filter__copy_done');
      }, 2000);
    });

    cancel.addEventListener('click', () => {
      const dataSort = new SortData();
      search.value = '';
      search.focus();
      fltr(dataSort, data);
      showPopup();
      mainQuery();
    });

    if (produce) {
      produce.onclick = function (e) {
        addProperty(produceArr, e);
        const dataSort = new SortData();
        fltr(dataSort, data);
        showPopup();
        mainQuery();
      };
    }

    if (color) {
      color.onclick = function (e) {
        addProperty(categoryArr, e);
        const dataSort = new SortData();
        fltr(dataSort, data);
        showPopup();
        mainQuery();
      };
    }

    if (search) {
      search.oninput = function () {
        const dataSort = new SortData();
        fltr(dataSort, data);
        showPopup();
        mainQuery();
      };
    }

    if (fromPrice) {
      fromPrice.onchange = function () {
        const dataSort = new SortData();
        fltr(dataSort, data);
        const valueMin = sessionStorage.getItem('minPrice');
        if (valueMin) {
          fromPrice.value = valueMin;
          const minPrice = document.getElementById('minPrice');
          if (minPrice) {
            minPrice.innerHTML = valueMin;
          }
        }
        showPopup();
        mainQuery();
      };
    }

    if (toPrice) {
      toPrice.onchange = function () {
        const dataSort = new SortData();
        fltr(dataSort, data);
        const valueMax = sessionStorage.getItem('maxPrice');
        if (valueMax) {
          toPrice.value = valueMax;
          const maxPrice = document.getElementById('maxPrice');
          if (maxPrice) {
            maxPrice.innerHTML = valueMax;
          }
        }
        showPopup();
        mainQuery();
      };
    }

    if (fromCapacity) {
      fromCapacity.onchange = function () {
        const dataSort = new SortData();
        fltr(dataSort, data);
        const valueMin = sessionStorage.getItem('minCapacity');
        if (valueMin) {
          fromCapacity.value = valueMin;
          const minCapacity = document.getElementById('minCapacity');
          if (minCapacity) {
            minCapacity.innerHTML = valueMin;
          }
        }
        showPopup();
        mainQuery();
      };
    }

    if (toCapacity) {
      toCapacity.onchange = function () {
        const dataSort = new SortData();
        fltr(dataSort, data);
        const valueMax = sessionStorage.getItem('maxCapacity');
        if (valueMax) {
          toCapacity.value = valueMax;
          const maxCapacity = document.getElementById('maxCapacity');
          if (maxCapacity) {
            maxCapacity.innerHTML = valueMax;
          }
        }
        showPopup();
        mainQuery();
      };
    }
  }
}

export default FilterData;
