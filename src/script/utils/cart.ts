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

  cartCounter() {
    return this.cartArr.length;
  }

  itemInCart(title: string) {
    const arr = this.cartArr.filter((item) => item.title === title);
    const onstock = arr[0].onstock;
    if (onstock > 0 && onstock > arr.length) {
      return true;
    }
    return false;
  }
}

const cart = new Cart();
export default cart;
