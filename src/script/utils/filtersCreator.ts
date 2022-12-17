import data from '../data/data';

const categoryList = document.querySelector('.category');
const produceList = document.querySelector('.produce');
const priceControls = document.querySelector('.price__control');
const priceView = document.querySelector('.price__view');
const capacityControls = document.querySelector('.capacity__control');
const capacityView = document.querySelector('.capacity__view');

function createCatagoryFilter() {
  const categories = data.map((el) => el.category);
  const set = new Set(categories);
  set.forEach((cat) => {
    const li = document.createElement('li');
    li.classList.add('filter__item', 'filter__category');
    li.setAttribute('title', `${cat}`);
    li.textContent = cat;
    categoryList?.appendChild(li);
  });
}

function createProduceFilter() {
  const produce = data.map((el) => el.produce);
  const set = new Set(produce);
  set.forEach((prod) => {
    const li = document.createElement('li');
    li.classList.add('filter__item', 'filter__produce');
    li.setAttribute('title', `${prod}`);
    li.textContent = prod;
    produceList?.appendChild(li);
  });
}

function createPriceFilter() {
  const price = data.map((el) => el.price);
  const max = Math.max(...price) / 1000000;
  const min = Math.min(...price) / 1000000;
  [
    [min, 'fromPrice', 'minPrice'],
    [max, 'toPrice', 'maxPrice'],
  ].forEach((el) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'range');
    input.setAttribute('value', `${el[0]}`);
    input.setAttribute('min', `${min}`);
    input.setAttribute('max', `${max}`);
    input.id = `${el[1]}`;
    priceControls?.appendChild(input);

    const div = document.createElement('div');
    div.id = `${el[2]}`;
    div.textContent = `${el[0]}`;
    priceView?.appendChild(div);
  });
}

function createCapacityFilter() {
  const capacity = data.map((el) => el.capacity);
  const max = Math.max(...capacity);
  const min = Math.min(...capacity);
  [
    [min, 'fromCapacity', 'minCapacity'],
    [max, 'toCapacity', 'maxCapacity'],
  ].forEach((el) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'range');
    input.setAttribute('value', `${el[0]}`);
    input.setAttribute('min', `${min}`);
    input.setAttribute('max', `${max}`);
    input.id = `${el[1]}`;
    capacityControls?.appendChild(input);

    const div = document.createElement('div');
    div.id = `${el[2]}`;
    div.textContent = `${el[0]}`;
    capacityView?.appendChild(div);
  });
}

export function createFilters() {
  //createCapacityFilter();
  createCatagoryFilter();
  //createPriceFilter();
  createProduceFilter();
}
