import Goods from '../goods/goodsCreator';
import { IGoods, ISort, sortBy } from '../../data/types';
import { sortByalphabet } from './multifilter';
import { showPopup } from '../goods/goodsListener';
import { mainQuery } from '../mainQuery';

export const sortType = { type: 'default' };

class SortData {
  goods: ISort;

  constructor() {
    this.goods = new Goods();
  }

  sortGoods(data: IGoods[]) {
    const select = <HTMLSelectElement>document.getElementById('sortBy');

    this.goods.createGoods(data);
    select.addEventListener('change', () => {
      const index = select.selectedIndex;

      if (index === sortBy.alphabetUp) {
        sortByalphabet(data);
        this.goods.createGoods(data);
        sortType.type = 'a';
      }

      if (index === sortBy.alphabetDown) {
        sortByalphabet(data);
        this.goods.createGoods(data.reverse());
        sortType.type = 'z';
      }

      if (index === sortBy.priceUp) {
        data.sort((a, b) => a.price - b.price);
        this.goods.createGoods(data);
        sortType.type = 'lp';
      }

      if (index === sortBy.priceDown) {
        data.sort((a, b) => b.price - a.price);
        this.goods.createGoods(data);
        sortType.type = 'hp';
      }
      showPopup();
      mainQuery();
    });
  }
}

export default SortData;
