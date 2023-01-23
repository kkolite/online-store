import { ERROR_PAYMENT_TEXT, SUCSESS_PAYMENT_TEXT } from '../../data/constants';
import cart from '../cart/cart';
import { createMain } from '../body/mainCreator';
import { validateAdress, validateEMail, validateName, validateTel } from './infoValidation';
import { validateCard, validateCVC, validateDate } from './payValidation';
import { Promocode } from '../cart/promocode';
import { mainQuery } from '../mainQuery';

export function pay() {
  const button = document.querySelector('.form__button');
  const message = document.querySelector('.form__afterpay');

  if (!button || !message) return;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (globalValidate()) {
      message.textContent = SUCSESS_PAYMENT_TEXT;
      message.classList.remove('error-payment');
      message.classList.add('success-payment');
      setTimeout(newStore, 5000);
    } else {
      message.textContent = ERROR_PAYMENT_TEXT;
      message.classList.add('error-payment');
    }
  });
}

function globalValidate() {
  const name = document.getElementById('form__name');
  const tel = document.getElementById('form__tel');
  const adress = document.getElementById('form__adress');
  const email = document.getElementById('form__email');
  const card = document.getElementById('form__card');
  const date = document.getElementById('form__date');
  const CVC = document.getElementById('form__cvc');

  if (
    !(card instanceof HTMLInputElement) ||
    !(date instanceof HTMLInputElement) ||
    !(CVC instanceof HTMLInputElement) ||
    !(name instanceof HTMLInputElement) ||
    !(tel instanceof HTMLInputElement) ||
    !(adress instanceof HTMLInputElement) ||
    !(email instanceof HTMLInputElement)
  )
    return;

  return [
    validateAdress(adress.value),
    validateName(name.value),
    validateTel(tel.value),
    validateEMail(email.value),
    validateCard(card.value),
    validateCVC(CVC.value),
    validateDate(date.value),
  ].every((validate) => validate);
}

function newStore() {
  const count = document.querySelector('.count');
  if (!count) return;

  count.textContent = '0';
  cart.cartArr = [];
  Promocode.activePromo = [];
  localStorage.clear();
  removePayment();
  history.pushState({}, 'newUrl', '/');
  createMain();
  mainQuery();
}

export function removePayment() {
  const background = document.querySelector('.form__background');
  const container = document.querySelector('.form__container');

  if (!background || !container) return;

  background.remove();
  container.remove();
}
