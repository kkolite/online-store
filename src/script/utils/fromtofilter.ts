export function controlFromSlider(fromPrice: HTMLInputElement, toPrice: HTMLInputElement, minPrice: Element) {
  const [from, to] = getParsed(fromPrice, toPrice);
  if (from > to) {
    fromPrice.value = to.toString();
    minPrice.innerHTML = to.toString();
  } else {
    minPrice.innerHTML = from.toString();
  }
}

export function controlToSlider(fromPrice: HTMLInputElement, toPrice: HTMLInputElement, maxPrice: Element) {
  const [from, to] = getParsed(fromPrice, toPrice);

  setToggleAccessible(toPrice);
  if (from <= to) {
    toPrice.value = to.toString();
    maxPrice.innerHTML = to.toString();
  } else {
    maxPrice.innerHTML = from.toString();
    toPrice.value = from.toString();
  }
}

function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

export function setToggleAccessible(currentTarget: HTMLInputElement) {
  const toPrice = document.querySelector('#toPrice');
  if (Number(currentTarget.value) <= 0) {
    (<HTMLElement>toPrice).style.zIndex = '2';
  } else {
    (<HTMLElement>toPrice).style.zIndex = '0';
  }
}
