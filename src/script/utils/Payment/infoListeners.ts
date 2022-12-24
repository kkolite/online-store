import { validateAdress, validateEMail, validateName, validateTel } from './infoValidation';
import { removePayment } from './payAction';

export function infoListeners() {
  const name = document.getElementById('form__name');
  const tel = document.getElementById('form__tel');
  const adress = document.getElementById('form__adress');
  const email = document.getElementById('form__email');
  const background = document.querySelector('.form__background');

  if (
    !(name instanceof HTMLInputElement) ||
    !(tel instanceof HTMLInputElement) ||
    !(adress instanceof HTMLInputElement) ||
    !(email instanceof HTMLInputElement) ||
    !background
  )
    return;

  background.addEventListener('click', () => {
    removePayment();
  });
  name.addEventListener('focus', () => {
    classRemover(name);
    name.classList.add('onfocus');
  });

  name.addEventListener('input', () => {
    const regex = /[0-9]|[!,&,@,#,$,%,^,(,),+,-,/,*,=,_]/i;
    name.value = name.value.replace(regex, '');
  });

  name.addEventListener('blur', () => {
    const result = validateName(name.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(name);
    name.classList.add(className);
  });

  tel.addEventListener('focus', () => {
    classRemover(tel);
    tel.classList.add('onfocus');
  });

  tel.addEventListener('input', () => {
    const regex = /[a-z]|[а-я]/i;
    tel.value = tel.value.replace(regex, '');
  });

  tel.addEventListener('blur', () => {
    const result = validateTel(tel.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(tel);
    tel.classList.add(className);
  });

  adress.addEventListener('focus', () => {
    classRemover(adress);
    adress.classList.add('onfocus');
  });

  adress.addEventListener('blur', () => {
    const result = validateAdress(adress.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(adress);
    adress.classList.add(className);
  });

  email.addEventListener('focus', () => {
    classRemover(email);
    email.classList.add('onfocus');
  });

  email.addEventListener('blur', () => {
    const result = validateEMail(email.value);
    const className = result ? 'valid' : 'invalid';
    classRemover(email);
    email.classList.add(className);
  });
}

export function classRemover(el: Element) {
  el.classList.remove('onfocus');
  el.classList.remove('valid');
  el.classList.remove('invalid');
}
