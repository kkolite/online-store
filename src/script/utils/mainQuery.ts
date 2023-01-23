import { categoryArr, produceArr, searchStr } from './filter/multifilter';
import { sortType } from './filter/sort';
import { view } from './view/view';

export function mainQuery() {
  const queryCategory = `cat=${categoryArr.join('.')}`;
  const queryProduce = `prod=${produceArr.join('.')}`;
  const queryView = `view=${view}`;
  const querySort = `sort=${sortType.type}`;
  const querySearch = `search=${searchStr}`;

  const queryPmin = `pmin=${
    sessionStorage.getItem('minPrice')
      ? sessionStorage.getItem('minPrice')
      : (<HTMLInputElement>document.querySelector('#fromPrice')).min
  }`;
  const queryPmax = `pmax=${
    sessionStorage.getItem('maxPrice')
      ? sessionStorage.getItem('maxPrice')
      : (<HTMLInputElement>document.querySelector('#toPrice')).max
  }`;
  const queryCmin = `cmin=${
    sessionStorage.getItem('minCapacity')
      ? sessionStorage.getItem('minCapacity')
      : (<HTMLInputElement>document.querySelector('#fromCapacity')).min
  }`;
  const queryCmax = `cmax=${
    sessionStorage.getItem('maxCapacity')
      ? sessionStorage.getItem('maxCapacity')
      : (<HTMLInputElement>document.querySelector('#toCapacity')).max
  }`;

  history.replaceState(
    {},
    'newURL',
    `/?${queryCategory}&${queryProduce}&${querySort}&${queryView}&${querySearch}&${queryPmin}&${queryPmax}&${queryCmin}&${queryCmax}`
  );
}
