import { createFilters } from '../filter/filtersCreator';
import { showPopup } from '../goods/goodsListener';
import FilterData from '../filter/filter';
import data from '../../data/data';
import { visibleSearch } from './header';
import cart from '../cart/cart';
import { createHeader } from './headerCreator';
import { createFooter } from './footerCreator';
import { showGrid, showList, view } from '../view/view';

export function createMain() {
  createHeader();
  createFooter();

  const main = <Element>document.querySelector('.main__content');
  const body = <Element>document.querySelector('.page');
  const page = <Element>document.querySelector('.main');

  body.classList.remove('no-scroll');
  page.classList.remove('error__background');
  main.classList.remove('error__main');
  main.innerHTML = `<aside class="filter">
      <button class="filter__reset">Reset</button>
      <button class="filter__copy">Copy</button>
      <div>
        <h4 class="filter__title">Produce</h4>
        <ul class="filter__list produce"></ul>
      </div>
      <div>
        <h4 class="filter__title">Category</h4>
        <ul class="filter__list category"></ul>
      </div>
      <div class="filter__double-range">
        <h4 class="filter__title">Price</h4>
        <div class="price__control">
            <input id="fromPrice" type="range" value="1" min="1" max="500"/>
            <input id="toPrice" type="range" value="500" min="1" max="500"/>
        </div>
        <div class="price__view">
          <div id="minPrice">1</div>
          <div id="maxPrice">500</div>
        </div>
        <h4 class="filter__title">Capacity</h4>
        <div class="capacity__control">
            <input id="fromCapacity" type="range" value="1" min="1" max="550"/>
            <input id="toCapacity" type="range" value="550" min="1" max="550"/>
        </div>
        <div class="capacity__view">
          <div id="minCapacity">1</div>
          <div id="maxCapacity">550</div>
        </div>
      </div>
    </aside>
    <section class="goods">
      <div class="sort">
        <div class="goods__view">
          <img src="./assets/png/2099192.png" alt="list-view" class="goods__view_list">
          <img src="./assets/png/3603178.png" alt="grid-view" class="goods__view_grid">
        </div>
        <div class="sort__items">Items found: <span class="sort__found"></span></div>
        <div class="sort_select">
          <select name="sorting" id="sortBy" class="sort__options">
            <option value="sortByNameUp"><button class="button name_up">By Name (A-Z)</button></option>
            <option value="sortByNameDown"><button class="button name_down">By Name (Z-A)</button></option>
            <option value="sortByPriceUp"><button class="button price_up">By Price (lower)</button></option>
            <option value="sortByPriceDown"><button class="button price_down">By Price (higher)</button></option>
          </select>
        </div>
      </div>
      <div class="items">
      </div>
    </section>`;
  //history.pushState({}, 'newUrl', '/');
  createFilters();
  const filter = new FilterData();
  filter.filterGoods(data);
  visibleSearch();
  cart.setFromLocalStorage();
  showPopup();
  document.title = 'Online-store';

  const gridView = main.querySelector('.goods__view_grid');
  const listView = main.querySelector('.goods__view_list');

  if (!gridView || !listView) return;

  if (view === 'grid') {
    listView.classList.remove('goods__view_active');
    gridView.classList.add('goods__view_active');
    showGrid();
  } else {
    gridView.classList.remove('goods__view_active');
    listView.classList.add('goods__view_active');
    showList();
  }
}
