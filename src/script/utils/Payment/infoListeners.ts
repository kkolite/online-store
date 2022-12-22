import { validateAdress, validateEMail, validateName, validateTel } from './infoValidation';

export function infoListeners() {
  const name = document.getElementById('form__name');
  const tel = document.getElementById('form__tel');
  const adress = document.getElementById('form__adress');
  const email = document.getElementById('form__email');
  const valid = {
    name: false,
    tel: false,
    adress: false,
    email: false,
  };

  if (
    !(name instanceof HTMLInputElement) ||
    !(tel instanceof HTMLInputElement) ||
    !(adress instanceof HTMLInputElement) ||
    !(email instanceof HTMLInputElement)
  )
    return;

  name.addEventListener('focus', () => {
    classRemover(name);
    name.classList.add('onfocus');
  });

  name.addEventListener('input', () => {
    const regex = /[0-9]|[!,&,@,#,$,%,^,(,),+,-,/,*,=,_]/i;
    name.value = name.value.replace(regex, '');
  })

  name.addEventListener('blur', () => {
    const result = validateName(name.value);
    if (result === true) {
      valid.name = true;
      classRemover(name);
      name.classList.add('valid');
    } else {
      valid.name = false;
      classRemover(name);
      name.classList.add('invalid');
    }
  });

  tel.addEventListener('focus', () => {
    classRemover(tel);
    tel.classList.add('onfocus');
  });

  tel.addEventListener('input', () => {
    const regex = /[a-z]|[а-я]/i;
    tel.value = tel.value.replace(regex, '');
  })

  tel.addEventListener('blur', () => {
    const result = validateTel(tel.value);
    if (result === true) {
      valid.tel = true;
      classRemover(tel);
      tel.classList.add('valid');
    } else {
      valid.tel = false;
      classRemover(tel);
      tel.classList.add('invalid');
    }
  });

  adress.addEventListener('focus', () => {
    classRemover(adress);
    adress.classList.add('onfocus');
  });

  adress.addEventListener('blur', () => {
    const result = validateAdress(adress.value);
    if (result === true) {
      valid.adress = true;
      classRemover(adress);
      adress.classList.add('valid');
    } else {
      valid.adress = false;
      classRemover(adress);
      adress.classList.add('invalid');
    }
  });

  email.addEventListener('focus', () => {
    classRemover(email);
    email.classList.add('onfocus');
  });

  email.addEventListener('blur', () => {
    const result = validateEMail(email.value);
    if (result === true) {
      valid.email = true;
      classRemover(email);
      email.classList.add('valid');
    } else {
      valid.email = false;
      classRemover(email);
      email.classList.add('invalid');
    }      
  });
}

export function classRemover(el: Element) {
  el.classList.remove('onfocus');
  el.classList.remove('valid');
  el.classList.remove('invalid');
}
