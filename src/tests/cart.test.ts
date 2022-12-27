import { IGoods } from '../script/data/types';
import cart from '../script/utils/cart/cart';
import data from '../script/data/data';

const stubCart: IGoods[] = [data[0], data[2], data[5]];
const realCart = cart.cartArr;

beforeEach(() => {
  cart.cartArr = stubCart;
});

afterEach(() => {
  cart.cartArr = realCart;
});

describe('Cart array length', () => {
  it('should return the length 3', () => {
    const result = cart.cartLength();
    expect(result).toEqual(3);
  });
});
