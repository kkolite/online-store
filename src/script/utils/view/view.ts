export function showList() {
  const items = document.querySelector('.items');
  if (items === null) return;

  const item = items.querySelectorAll('.item');
  items.classList.add('items__list');
  if (item) {
    item.forEach((i) => {
      i.classList.add('item__list');
    });
  }
}

export function showGrid() {
  const items = document.querySelector('.items');
  if (items === null) return;

  const item = items.querySelectorAll('.item');
  items.classList.remove('items__list');
  if (item) {
    console.log(item);
    item.forEach((i) => {
      i.classList.remove('item__list');
    });
  }
}
