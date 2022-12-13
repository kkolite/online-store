import { IGoods } from '../data/types';
import data from '../data/data';

class Cart {
  cartArr: IGoods[];
  constructor() {
    this.cartArr = [];
  }

  pushInCart(str: string) {
    data.forEach((good) => {
      if (good.title === str) {
        this.cartArr.push(good);
      }
    });
  }

  deleteFromCart(str: string) {
    this.cartArr.forEach((good) => {
      if (good.title === str) {
        this.cartArr.splice(this.cartArr.indexOf(good), 1);
      }
    });
  }
}

const cart = new Cart();
export default cart;
