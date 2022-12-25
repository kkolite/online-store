import { classRemover } from './infoListeners';
import { validateCard, validateCVC, validateDate } from './payValidation';

export function payListeners() {
  const card = document.getElementById('form__card');
  const date = document.getElementById('form__date');
  const CVC = document.getElementById('form__cvc');
  const cardImage = document.querySelector('.form__cart-img');

  if (
    !(card instanceof HTMLInputElement) ||
    !(date instanceof HTMLInputElement) ||
    !(CVC instanceof HTMLInputElement) ||
    !(cardImage instanceof Image)
  )
    return;

  let prevCardIndex = 0;
  let prevDateIndex = 0;

  card.addEventListener('focus', () => {
    classRemover(card);
    card.classList.add('onfocus');
  });

  card.addEventListener('blur', () => {
    const result = validateCard(card.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(card);
    card.classList.add(className);
  });

  card.addEventListener('input', () => {
    const value = card.value;
    const length = value.length;
    const last = value[length - 1];
    const first = value[0];

    switch (first) {
      case '5':
        cardImage.src = './assets/png/mastercard.png';
        cardImage.alt = 'mastercard';
        break;
      case '4':
        cardImage.src = './assets/png/visa.png';
        cardImage.alt = 'visa';
        break;
      case '6':
        cardImage.src = './assets/png/unionpay.png';
        cardImage.alt = 'unionpay';
        break;
      default:
        cardImage.alt = 'card';
        cardImage.src = './assets/png/credit-card.png';
    }

    if (!last.match(/[0-9]| /)) {
      card.value = value.slice(0, -1);
    }

    if ((length === 5 || length === 10 || length === 15) && length > prevCardIndex) {
      card.value = value.slice(0, length - 1) + ' ' + last;
    }

    if ((length === 5 || length === 10 || length === 15) && length < prevCardIndex) {
      card.value = value.slice(0, length - 1);
      prevCardIndex = length - 1;
    } else {
      prevCardIndex = length;
    }
  });

  date.addEventListener('focus', () => {
    classRemover(date);
    date.classList.add('onfocus');
  });

  date.addEventListener('blur', () => {
    const result = validateDate(date.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(date);
    date.classList.add(className);
  });

  date.addEventListener('input', () => {
    const value = date.value;
    const length = value.length;
    const last = value[length - 1];

    if (!last.match(/[0-9]| |\//)) {
      date.value = value.slice(0, -1);
    }

    if (length === 3 && length > prevDateIndex) {
      date.value = `${value.slice(0, 2)} / ${last}`;
    }

    if (length > 2 && length < 6 && length < prevDateIndex) {
      date.value = date.value.slice(0, 2);
      prevDateIndex = 2;
    } else {
      prevDateIndex = length;
    }
  });

  CVC.addEventListener('focus', () => {
    classRemover(CVC);
    CVC.classList.add('onfocus');
  });

  CVC.addEventListener('blur', () => {
    const result = validateCVC(CVC.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(CVC);
    CVC.classList.add(className);
  });

  CVC.addEventListener('input', () => {
    const value = CVC.value;
    const length = value.length;
    const last = value[length - 1];

    if (!last.match(/[0-9]/)) {
      CVC.value = value.slice(0, -1);
    }
  });
}
