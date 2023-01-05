import { payListeners } from './payListeners';
import { infoListeners } from './infoListeners';
import { pay } from './payAction';
import { hideSearch } from '../body/header';

export function createPay() {
  //const main = <Element>document.querySelector('.main__content');
  const page = document.createElement('form');
  const body = <Element>document.querySelector('.page');

  page.classList.add('form');
  //main.innerHTML = '';
  page.innerHTML = `<div class="form__info">
    <div class="form__input-container">
      <label for="form__name" class="form__label">Name</label>
      <input type="text" name="" id="form__name" class="form__input" placeholder="Name Surname">
      <label for="form__name" class="form__label form__name_error label_error"></label>
    </div>
    <div class="form__input-container">
      <label for="form__tel" class="form__label">Phone</label>
      <input type="tel" name="" id="form__tel" class="form__input" placeholder="+375291234567">
      <label for="form__tel" class="form__label form__tel_error label_error"></label>
    </div>
    <div class="form__input-container">
      <label for="form__adress" class="form__label">Adress</label>
      <input type="text" name="" id="form__adress" class="form__input" placeholder="Nemiga Minsk Belarus">
      <label for="form__adress" class="form__label form__adress_error label_error"></label>
    </div>
    <div class="form__input-container">
      <label for="form__email" class="form__label">E-Mail</label>
      <input type="email" name="" id="form__email" class="form__input" placeholder="customer@email.com">
      <label for="form__email" class="form__label form__email_error label_error"></label>
    </div>
  </div>
  <div class="form__payment">
    <img src="./assets/png/credit-card.png" alt="card" height="40px" class="form__cart-img">
    <div class="form__input-container">
      <label for="form__card" class="form__label">Card</label>
      <input type="text" name="" id="form__card" maxlength="19" class="form__input" placeholder="4 - Visa, 5 - MC, 6 - UP">
      <label for="form__card" class="form__label form__card_error label_error"></label>
    </div>
    <div class="form__input-container">
      <label for="form__date" class="form__label">Date</label>
      <input type="text" name="" id="form__date" maxlength="7" class="form__input form__input-date">
      <label for="form__date" class="form__label form__date_error label_error"></label>
    </div>
    <div class="form__input-container">
      <label for="form__cvc" class="form__label">CVC</label>
      <input type="password" name="" id="form__cvc" maxlength="3" class="form__input form__input-cvc">
      <label for="form__cvc" class="form__label form__cvc_error label_error"></label>
    </div>
  </div>`;

  const div = document.createElement('div');
  div.innerHTML = `<button class="form__button">Pay</button>
  <p class="form__afterpay"></p>`;

  const background = document.createElement('div');
  background.classList.add('form__background');
  const container = document.createElement('div');
  container.classList.add('form__container');
  container.appendChild(page);
  container.appendChild(div);
  body.appendChild(container);
  body.appendChild(background);

  hideSearch();
  payListeners();
  infoListeners();
  pay();
}
