export function validateName(val: string) {
  const error = document.querySelector('.form__name_error');
  if (error === null) return;

  const checkArr = val.split(' ');
  if (checkArr.length > 1 && checkArr.every((el) => el.length > 2)) {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error! Invalid string';
  return false;
}

export function validateAdress(val: string) {
  const error = document.querySelector('.form__adress_error');
  if (error === null) return;

  const checkArr = val.split(' ');
  if (checkArr.length > 2 && checkArr.every((el) => el.length > 4)) {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error! Invalid string';
  return false;
}

export function validateTel(val: string) {
  const error = document.querySelector('.form__tel_error');
  if (error === null) return;

  if (val.replaceAll(/[0-9]/gi, '').length !== 1) {
    error.textContent = 'Error! Invalid string';
    return false;
  }
  if (val.length > 9 && val[0] === '+') {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error! Invalid string';
  return false;
}

export function validateEMail(val: string) {
  const error = document.querySelector('.form__email_error');
  if (error === null) return;

  const checkArr = val.split('@');
  if (checkArr.length === 2 && checkArr.every((el) => el.length > 0)) {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error! Invalid string';
  return false;
}
