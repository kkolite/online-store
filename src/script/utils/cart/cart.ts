import { IGoods } from '../../data/types';
import data from '../../data/data';

class Cart {
  cartArr: IGoods[];
  constructor() {
    this.cartArr = [];
  }

  pushInCart(str: string) {
    data.forEach((good) => {
      if (good.title === str) {
        this.cartArr.push(good);
        this.cartArr.sort((a: IGoods, b: IGoods) => {
          if (a.title > b.title) {
            return 1;
          }
          return -1;
        });
        this.saveLocalStorage();
      }
    });
  }

  deleteFromCart(str: string) {
    const temp = this.cartArr.map((el) => el.title);
    if (temp.includes(str)) {
      this.cartArr.splice(temp.indexOf(str), 1);
      this.saveLocalStorage();
    }
  }

  deleteAllFromCart(str: string) {
    this.cartArr = this.cartArr.filter((el) => el.title !== str);
    this.saveLocalStorage();
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

  moneySum() {
    const sum = this.cartArr.reduce((acc, el) => acc + el.price, 0);
    if (sum === 0) {
      return '0';
    }
    return `${sum / 1000000} m.`;
  }

  itemPriceSum(key: string) {
    const arr = this.cartArr.filter((el) => el.title === key);
    return arr.reduce((acc, el) => acc + el.price, 0);
  }

  saveLocalStorage() {
    localStorage.clear();
    const cart = JSON.stringify(this.cartArr);
    localStorage.setItem('cart', cart);
  }

  setFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    const count = document.querySelector('.count');
    if (!cart || !count) return;

    this.cartArr = JSON.parse(cart);
    count.textContent = `${this.cartLength()}`;
  }
}

const cart = new Cart();
export default cart;
