import './styles/style.scss';
import { headerListener } from './script/utils/cart/cartListener';
import { location } from './script/utils/router';
import cart from './script/utils/cart/cart';

location();
headerListener();
cart.setFromLocalStorage();
