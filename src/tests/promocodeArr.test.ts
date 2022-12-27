import { IPromocode } from '../script/data/types';
import { Promocode } from '../script/utils/cart/promocode';

const stubPromo: IPromocode[] = [
  {
    key: 'qwqw',
    discount: 10,
  },
  {
    key: 'qwqw',
    discount: 8,
  },
  {
    key: 'qwqw',
    discount: 7,
  },
  {
    key: 'qwqw',
    discount: 15,
  },
];
const realPromo = Promocode.activePromo;
beforeEach(() => {
  Promocode.activePromo = stubPromo;
});

afterEach(() => {
  Promocode.activePromo = realPromo;
});
const promo = new Promocode();

describe('Promo', () => {
  it('should return the sum of all discounts', () => {
    const result = promo.sumDiscount();
    expect(result).toEqual(40);
  });
  it('should return correct new price', () => {
    const result = promo.newPrice(1000, promo.sumDiscount());
    expect(result).toEqual(600);
  });
});
