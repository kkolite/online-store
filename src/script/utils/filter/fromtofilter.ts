export function controlFromSlider(
  fromProperty: HTMLInputElement,
  toProperty: HTMLInputElement,
  minValue: Element,
  key: string
) {
  const [from, to] = getParsed(fromProperty, toProperty);
  if (from > to) {
    fromProperty.value = to.toString();
    minValue.innerHTML = to.toString();
  } else {
    minValue.innerHTML = from.toString();
  }
  sessionStorage.setItem(key, minValue.innerHTML);
}

export function controlToSlider(
  fromProperty: HTMLInputElement,
  toProperty: HTMLInputElement,
  maxValue: Element,
  id: string,
  key: string
) {
  const [from, to] = getParsed(fromProperty, toProperty);

  setToggleAccessible(toProperty, id);
  if (from <= to) {
    toProperty.value = to.toString();
    maxValue.innerHTML = to.toString();
  } else {
    maxValue.innerHTML = from.toString();
    toProperty.value = from.toString();
  }
  sessionStorage.setItem(key, maxValue.innerHTML);
}

function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

export function setToggleAccessible(currentTarget: HTMLInputElement, id: string) {
  const toElement = document.querySelector(id);
  if (Number(currentTarget.value) <= 0) {
    (<HTMLElement>toElement).style.zIndex = '2';
  } else {
    (<HTMLElement>toElement).style.zIndex = '0';
  }
}
