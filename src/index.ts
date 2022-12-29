import './styles/style.scss';
import { headerListener } from './script/utils/body/header';
import { location, popstate } from './script/utils/router';
//import cart from './script/utils/cart/cart';

location();
//cart.setFromLocalStorage();
headerListener();
popstate();
