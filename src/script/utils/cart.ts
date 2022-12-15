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
    const temp = this.cartArr.map((el) => el.title);
    if (temp.includes(str)) {
      this.cartArr.splice(temp.indexOf(str), 1);
    }
  }

  deleteAllFromCart(str: string) {
    this.cartArr = this.cartArr.filter((el) => el.title !== str);
  }

  cartLength() {
    return this.cartArr.length;
  }

  itemsInCart(str: string) {
    return this.cartArr.filter((el) => el.title === str).length;
  }

  isEnough(title: string) {
    const arr = this.cartArr.filter((item) => item.title === title);
    if (arr.length > 0) {
      const onstock = arr[0].onstock;
      if (onstock > 0 && onstock <= arr.length) {
        return true;
      }
    }
    return false;
  }
}

const cart = new Cart();
export default cart;
