import { сreateItemPage } from './pagesCreator';
import data from '../data/data';
import { showPopup } from './itemListener';
import Goods from './goodsCreator';

const filters = document.querySelector('.filter');
const search = document.querySelector('.header__search');

export function router(event: Event) {
  event.preventDefault();
  const target = event.target;
  if (target === null || !(target instanceof Element)) return;

  let key = target.getAttribute('title');
  if (key === null) {
    const parent = target.closest('.item');
    if (parent === null) return;

    key = parent.getAttribute('title');
  }

  history.pushState({}, 'newUrl', key?.replace(' ', '_'));
  const item = data.find((el) => el.title === key);
  if (item === undefined) return;

  сreateItemPage(item);
  filters?.classList.add('hide');
  search?.classList.add('hide');
}

window.addEventListener('popstate', function () {
  const route = window.location.pathname.split('/');
  const page = route[route.length - 1];
  console.log(page);
  if (page === 'index.html') {
    const createMain = new Goods();
    createMain.createGoods(Goods.currentItems);
    showPopup();
    filters?.classList.remove('hide');
    search?.classList.remove('hide');
  } else if (page === 'cart') {
    // createCart(); Метод создания корзины - пока ничего нет
  } else {
    // Создание карточки товара - пока тоже минус
    const key = page.replace('_', ' ');
    const item = data.find((el) => el.title === key);
    if (item === undefined) return;
    сreateItemPage(item);
  }
});

/* Шаблон для будущей работы
window.addEventListener('DOMContentLoaded', function() {
  let route = data.find(item => item.path == window.location.pathname);
  root.innerHTML = route.data;
})*/
