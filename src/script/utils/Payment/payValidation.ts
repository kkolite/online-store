import { ERROR_TEXT } from '../../data/constants';

export function validateCard(val: string) {
  const errorLabel = document.querySelector('.form__card_error');
  if (!errorLabel) return;

  if (val.length === 19) {
    errorLabel.textContent = '';
    return true;
  }

  errorLabel.textContent = ERROR_TEXT;
  return false;
}

export function validateDate(val: string) {
  const errorLabel = document.querySelector('.form__date_error');
  if (!errorLabel) return;

  const checkArr = val.split(' / ');
  if (
    val.length === 7 &&
    val.replaceAll(' ', '').length === 5 &&
    checkArr.length === 2 &&
    Number(checkArr[0]) < 13 &&
    Number(checkArr[0]) > 0 &&
    Number(checkArr[1]) > 22 &&
    Number(checkArr[1]) < 100
  ) {
    errorLabel.textContent = '';
    return true;
  }
  errorLabel.textContent = ERROR_TEXT;
  return false;
}

export function validateCVC(val: string) {
  const errorLabel = document.querySelector('.form__cvc_error');
  if (!errorLabel) return;

  if (val.length === 3) {
    errorLabel.textContent = '';
    return true;
  }

  errorLabel.textContent = ERROR_TEXT;
  return false;
}
