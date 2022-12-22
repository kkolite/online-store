import './styles/style.scss';
import { headerListener } from './script/utils/header';
import { location } from './script/utils/router';
import cart from './script/utils/cart/cart';

cart.setFromLocalStorage();
location();
headerListener();
