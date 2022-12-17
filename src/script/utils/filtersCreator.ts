import data from '../data/data';

function createCatagoryFilter() {
  const categoryList = document.querySelector('.category');
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
  const produceList = document.querySelector('.produce');
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
  const priceControls = document.querySelector('.price__control');
  (<Element>priceControls).innerHTML = '';
  const priceView = document.querySelector('.price__view');
  (<Element>priceView).innerHTML = '';
  const price = data.map((el) => el.price);
  const max = Math.max(...price) / 1000000;
  const min = Math.min(...price) / 1000000;
  [
    [min, 'fromPrice', 'minPrice'],
    [max, 'toPrice', 'maxPrice'],
  ].forEach((el) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'range');
    input.setAttribute('min', `${min}`);
    input.setAttribute('max', `${max}`);
    input.setAttribute('value', `${el[0]}`);
    input.id = `${el[1]}`;
    priceControls?.appendChild(input);

    const div = document.createElement('div');
    div.id = `${el[2]}`;
    div.textContent = `${el[0]}`;
    priceView?.appendChild(div);
  });
}

function createCapacityFilter() {
  const capacityControls = document.querySelector('.capacity__control');
  (<Element>capacityControls).innerHTML = '';
  const capacityView = document.querySelector('.capacity__view');
  (<Element>capacityView).innerHTML = '';
  const capacity = data.map((el) => el.capacity);
  const max = Math.max(...capacity);
  const min = Math.min(...capacity);
  [
    [min, 'fromCapacity', 'minCapacity'],
    [max, 'toCapacity', 'maxCapacity'],
  ].forEach((el) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'range');
    input.setAttribute('min', `${min}`);
    input.setAttribute('max', `${max}`);
    input.setAttribute('value', `${el[0]}`);
    input.id = `${el[1]}`;
    capacityControls?.appendChild(input);

    const div = document.createElement('div');
    div.id = `${el[2]}`;
    div.textContent = `${el[0]}`;
    capacityView?.appendChild(div);
  });
}

export function createFilters() {
  createCapacityFilter();
  createCatagoryFilter();
  createPriceFilter();
  createProduceFilter();
}
