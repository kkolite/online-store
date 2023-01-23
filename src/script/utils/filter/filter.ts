import SortData from './sort';
import { IGoods, IFilter, viewType } from '../../data/types';
import { addProperty, filter, produceArr, categoryArr } from './multifilter';
import { showPopup } from '../goods/goodsListener';
import Goods from '../goods/goodsCreator';
import { createMain } from '../body/mainCreator';
import { showGrid, showList, view } from '../view/view';
import { mainQuery } from '../mainQuery';
import { COPY, COPY_DONE } from '../../data/constants';

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
      data.sort((a, b) => (a.title > b.title ? 1 : -1));
      createMain();
      const dataSort = new SortData();
      (<HTMLInputElement>document.querySelector('#search')).value = '';
      if (view === viewType.Grid) {
        showGrid();
      } else {
        showList();
      }
      filter(dataSort, data);
      showPopup();
    });

    copy.addEventListener('click', () => {
      const temp = window.location.href;
      navigator.clipboard.writeText(temp);
      copy.textContent = COPY_DONE;
      copy.classList.add('filter__copy_done');
      setTimeout(function () {
        copy.textContent = COPY;
        copy.classList.remove('filter__copy_done');
      }, 2000);
    });

    cancel.addEventListener('click', () => {
      const dataSort = new SortData();
      search.value = '';
      search.focus();
      filter(dataSort, data);
      showPopup();
      mainQuery();
    });

    if (produce) {
      produce.onclick = function (e) {
        addProperty(produceArr, e);
        const dataSort = new SortData();
        filter(dataSort, data);
        showPopup();
        mainQuery();
      };
    }

    if (color) {
      color.onclick = function (e) {
        addProperty(categoryArr, e);
        const dataSort = new SortData();
        filter(dataSort, data);
        showPopup();
        mainQuery();
      };
    }

    if (search) {
      search.oninput = function () {
        const dataSort = new SortData();
        filter(dataSort, data);
        showPopup();
        mainQuery();
      };
    }

    if (fromPrice) {
      filterByDualSlider(fromPrice, 'minPrice');
    }

    if (toPrice) {
      filterByDualSlider(toPrice, 'maxPrice');
    }

    if (fromCapacity) {
      filterByDualSlider(fromCapacity, 'minCapacity');
    }

    if (toCapacity) {
      filterByDualSlider(toCapacity, 'maxCapacity');
    }

    function filterByDualSlider(property: HTMLInputElement, propertyId: string) {
      property.onchange = function () {
        const dataSort = new SortData();
        filter(dataSort, data);
        const value = sessionStorage.getItem(propertyId);
        if (value) {
          property.value = value;
          const propertyElement = document.getElementById(propertyId);
          if (propertyElement) {
            propertyElement.innerHTML = value;
          }
        }
        showPopup();
        mainQuery();
      };
    }
  }
}

export default FilterData;
