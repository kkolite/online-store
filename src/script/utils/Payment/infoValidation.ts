import { ERROR_TEXT } from '../../data/constants';

export function validateName(val: string) {
  const errorLabel = document.querySelector('.form__name_error');
  if (!errorLabel) return;

  const checkArr = val.trim().split(' ');
  if (checkArr.length > 1 && checkArr.every((el) => el.length > 2)) {
    errorLabel.textContent = '';
    return true;
  }

  errorLabel.textContent = ERROR_TEXT;
  return false;
}

export function validateAdress(val: string) {
  const errorLabel = document.querySelector('.form__adress_error');
  if (!errorLabel) return;

  const checkArr = val.trim().split(' ');
  if (checkArr.length > 2 && checkArr.every((el) => el.length > 4)) {
    errorLabel.textContent = '';
    return true;
  }

  errorLabel.textContent = ERROR_TEXT;
  return false;
}

export function validateTel(val: string) {
  const errorLabel = document.querySelector('.form__tel_error');
  if (!errorLabel) return;

  if (val.replaceAll(/[0-9]/gi, '').length !== 1) {
    errorLabel.textContent = ERROR_TEXT;
    return false;
  }
  if (val.length > 9 && val[0] === '+') {
    errorLabel.textContent = '';
    return true;
  }

  errorLabel.textContent = ERROR_TEXT;
  return false;
}

export function validateEMail(val: string) {
  const errorLabel = document.querySelector('.form__email_error');
  if (!errorLabel) return;

  const checkArr = val.split('@');
  if (checkArr.length === 2 && checkArr.every((el) => el.length > 0)) {
    errorLabel.textContent = '';
    return true;
  }

  errorLabel.textContent = ERROR_TEXT;
  return false;
}
