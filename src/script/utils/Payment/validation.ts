export function validateName(val: string) {
  const checkArr = val.split(' ');
  if (checkArr.length > 1 && checkArr.every((el) => el.length > 2)) {
    return true;
  }
  return false;
}

export function validateAdress(val: string) {
  const checkArr = val.split(' ');
  if (checkArr.length > 2 && checkArr.every((el) => el.length > 4)) {
    return true;
  }
  return false;
}

export function validateTel(val: string) {
  if (val.replaceAll(/[0-9]/gi, '').length !== 1) {
    return false;
  }
  if (val.length > 9 && val[0] === '+') {
    return true;
  }
  return false;
}

export function validateEMail(val: string) {
  const checkArr = val.split('@');
  if (checkArr.length === 2 && checkArr.every((el) => el.length > 0)) {
    return true;
  }
  return false;
}
