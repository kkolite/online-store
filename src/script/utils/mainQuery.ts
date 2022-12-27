import { categoryArr, produceArr, searchStr } from './filter/multifilter';
import { sortType } from './filter/sort';
import { view } from './view/view';

export function mainQuery() {
  const queryCategory = `cat=${categoryArr.join('.')}`;
  const queryProduce = `prod=${produceArr.join('.')}`;
  const queryView = `view=${view}`;
  const querySort = `sort=${sortType.type}`;
  const querySearch = `search=${searchStr}`;

  history.pushState({}, 'newURL', `?${queryCategory}&${queryProduce}&${querySort}&${queryView}&${querySearch}`);
}
