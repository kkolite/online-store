import data from './script/data/data';
import './styles/style.scss';
import FilterData from './script/filter';
import { showPopup } from './script/utils/popup';

const arr = new FilterData();
arr.filterGoods(data);
showPopup();
