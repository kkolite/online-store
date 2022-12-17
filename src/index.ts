import data from './script/data/data';
import './styles/style.scss';
import FilterData from './script/filter';
import { showPopup } from './script/utils/itemListener';
import { createFilters } from './script/utils/filtersCreator';

createFilters();
const arr = new FilterData();
arr.filterGoods(data);
showPopup();
