import './styles/style.scss';
import { headerListener } from './script/utils/body/header';
import { location, popstate } from './script/utils/router';

location();
headerListener();
popstate();
