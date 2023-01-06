import { Callback, IGoods, IFilter } from '../../data/types';
import { categoryCount, produceCount } from './filterCount';

export const produceArr: string[] = [];
export const categoryArr: string[] = [];
export let searchStr = '';
//export const search = <HTMLInputElement>document.querySelector('#search');

export function sortByalphabet(data: IGoods[]) {
  data.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    return -1;
  });
}

function multifilter(fltr: Array<Callback>) {
  return function (goods: IGoods) {
    return fltr.every((filterFunc: Callback) => filterFunc(goods));
  };
}

function inclColor(goods: IGoods) {
  return categoryArr.includes(goods.category);
}

function inclProduce(goods: IGoods) {
  return produceArr.includes(goods.produce);
}

function inclMinPrice(goods: IGoods) {
  const minPrice = document.querySelector('#minPrice');
  if (!minPrice) return;

  return goods.price >= +minPrice.innerHTML * 1000000;
}

function inclMaxPrice(goods: IGoods) {
  const maxPrice = document.querySelector('#maxPrice');
  if (!maxPrice) return;

  return goods.price <= +maxPrice.innerHTML * 1000000;
}

function inclMinCapacity(goods: IGoods) {
  const minCapacity = document.querySelector('#minCapacity');
  if (!minCapacity) return;

  return goods.capacity >= +minCapacity.innerHTML;
}

function inclMaxCapacity(goods: IGoods) {
  const maxCapacity = document.querySelector('#maxCapacity');
  if (!maxCapacity) return;

  return goods.capacity <= +maxCapacity.innerHTML;
}

function inclTitle(goods: IGoods) {
  const search = <HTMLInputElement>document.querySelector('#search');
  searchStr = search.value;

  const title = goods.title.toLowerCase().includes(search.value.toLowerCase());
  const category = goods.category.toLowerCase().includes(search.value.toLowerCase());
  const prod = goods.produce.toLowerCase().includes(search.value.toLowerCase());
  const price = goods.price.toString().includes(search.value);
  const capacity = goods.capacity.toString().includes(search.value);
  const onstock = goods.onstock.toString().includes(search.value);

  return title || category || prod || price || capacity || onstock;
}

export function fltr(filtersList: IFilter, data: IGoods[]) {
  const propArr = [];

  if (categoryArr.length !== 0) propArr.push(inclColor);
  //if (memoryArr.length !== 0) propArr.push(inclMemory);
  if (produceArr.length !== 0) propArr.push(inclProduce);

  propArr.push(inclTitle);
  propArr.push(inclMinPrice);
  propArr.push(inclMaxPrice);
  propArr.push(inclMinCapacity);
  propArr.push(inclMaxCapacity);

  const arr = data.filter(multifilter(propArr as Callback[]));
  categoryCount(arr);
  produceCount(arr);
  filtersList.sortGoods(arr);
}

export function addProperty(property: Array<string>, e: Event) {
  //(<HTMLElement>e.target).classList.toggle('active');
  const key = (<HTMLElement>e.target).getAttribute('title');
  if (!key) return;
  if (property.includes(key)) {
    property.splice(property.indexOf(key), 1);
  } else {
    property.push(key);
  }
}
