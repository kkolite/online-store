import { Callback, IGoods, IFilter } from '../../data/types';

export const produceArr: string[] = [];
//export const minPriceArr: string[] = [];
export const categoryArr: string[] = [];
export const search = <HTMLInputElement>document.querySelector('#search');
/* export const fromPrice = <HTMLInputElement>document.querySelector('#fromPrice');
export const toPrice = <HTMLInputElement>document.querySelector('#toPrice');
export const fromCapacity = <HTMLInputElement>document.querySelector('#fromCapacity');
export const toCapacity = <HTMLInputElement>document.querySelector('#toCapacity');
export const minPrice = <HTMLElement>document.querySelector('#minPrice');
export const maxPrice = <HTMLElement>document.querySelector('#maxPrice');
export const minCapacity = <HTMLElement>document.querySelector('#minCapacity');
export const maxCapacity = <HTMLElement>document.querySelector('#maxCapacity'); */

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
  return goods.price >= +(<HTMLElement>document.querySelector('#minPrice')).innerHTML * 1000000;
}
function inclMaxPrice(goods: IGoods) {
  return goods.price <= +(<HTMLElement>document.querySelector('#maxPrice')).innerHTML * 1000000;
}
function inclMinCapacity(goods: IGoods) {
  return goods.capacity >= +(<HTMLElement>document.querySelector('#minCapacity')).innerHTML;
}
function inclMaxCapacity(goods: IGoods) {
  return goods.capacity <= +(<HTMLElement>document.querySelector('#maxCapacity')).innerHTML;
}
function inclTitle(goods: IGoods) {
  return goods.title.toLowerCase().includes(search.value.toLowerCase());
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
  filtersList.sortGoods(data.filter(multifilter(propArr)));
}

export function addProperty(property: Array<string>, e: Event) {
  //(<HTMLElement>e.target).classList.toggle('active');
  const key = (<HTMLElement>e.target).getAttribute('title');
  if (key === null) return;
  if (property.includes(key)) {
    property.splice(property.indexOf(key), 1);
  } else {
    property.push(key);
  }
}
