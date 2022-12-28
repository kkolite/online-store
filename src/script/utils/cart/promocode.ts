import promocodes from '../../data/promocodes';
import { IPromocode } from '../../data/types';

export class Promocode {
  static activePromo: IPromocode[] = [];

  private addPromo(promo: string) {
    const obj = promocodes.find((el) => el.key === promo);
    if (!obj) return;

    Promocode.activePromo.push(obj);
    this.buildPromo(promo);
  }

  deletePromo(promo: string) {
    const obj = promocodes.find((el) => el.key === promo);
    if (!obj) return;

    const i = Promocode.activePromo.indexOf(obj);
    Promocode.activePromo.splice(i, 1);

    const list = document.querySelectorAll('.promo-list__item');
    list.forEach((el) => {
      if (el.id === promo) {
        el.remove();
        return;
      }
    });
  }

  checkPromo(promo: string) {
    const promoArr = promocodes.map((el) => el.key);
    const currArr = Promocode.activePromo.map((el) => el.key);
    if (currArr.includes(promo)) return;

    if (promoArr.includes(promo)) {
      this.addPromo(promo);
    }
  }

  sumDiscount() {
    return Promocode.activePromo.reduce((acc, el) => acc + el.discount, 0);
  }

  newPrice(currPrice: number, discount: number) {
    const num = currPrice * (1 - discount / 100);
    return Math.floor(num * 10) / 10;
  }

  afterReload() {
    const titles = Promocode.activePromo.map((el) => el.key);
    titles.forEach((el) => {
      this.buildPromo(el);
    });
  }

  private buildPromo(promo: string) {
    const promoList = document.querySelector('.promo-list');
    if (!promoList) return;

    const promoArr = promocodes.map((el) => el.key);
    const i = promoArr.indexOf(promo);
    const promocode = promocodes[i];
    const li = document.createElement('li');
    const text = document.createElement('span');
    const discount = document.createElement('span');
    const remove = document.createElement('button');

    li.id = `${promocode.key}`;
    li.classList.add('promo-list__item');
    text.classList.add('promo-list__text');
    discount.classList.add('promo-list__discount');
    remove.classList.add('promo-list__remove');

    remove.textContent = 'Remove';
    text.textContent = `Promo: ${promocode.key},`;
    discount.textContent = `-${promocode.discount}%`;

    li.appendChild(text);
    li.appendChild(discount);
    li.append(remove);
    promoList.appendChild(li);
  }
}
