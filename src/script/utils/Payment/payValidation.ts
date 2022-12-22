export function validateCard(val: string) {
  const error = document.querySelector('.form__card_error');
  if (error === null) return;

  if (val.length === 19) {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error!';
  return false;
}

export function validateDate(val: string) {
  const error = document.querySelector('.form__date_error');
  if (error === null) return;

  const checkArr = val.split(' / ');
  if (checkArr.length === 2 && Number(checkArr[0]) < 13 && Number(checkArr[1]) > 22 && Number(checkArr[1]) < 100) {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error!';
  return false;
}

export function validateCVC(val: string) {
  const error = document.querySelector('.form__cvc_error');
  if (error === null) return;

  if (val.length === 3) {
    error.textContent = '';
    return true;
  }

  error.textContent = 'Error!';
  return false;
}
