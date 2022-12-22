import cart from "../cart/cart";
import { createMain } from "../pagesCreator";
import { validateAdress, validateEMail, validateName, validateTel } from "./infoValidation";
import { validateCard, validateCVC, validateDate } from "./payValidation";

export function pay() {
    const button = document.querySelector('.form__button');
    const message = document.querySelector('.form__afterpay');

    if (button === null || message === null) return;

    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (globalValidate() === true) {
            message.textContent = 'Success! You will be redirected to main page in 5 seconds.';
            message.classList.add('success-payment');
            setTimeout(newStore, 5000);
        } else {
            message.textContent = 'Error! Please, check input fields';
            message.classList.add('error-payment');
        }
    })
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
    ) return;

    validateAdress(adress.value);
    validateName(name.value);
    validateTel(tel.value);
    validateEMail(email.value);
    validateCard(card.value);
    validateCVC(CVC.value);
    validateDate(date.value);

    return (validateAdress(adress.value) && 
    validateName(name.value) &&
    validateTel(tel.value) &&
    validateEMail(email.value) &&
    validateCard(card.value) &&
    validateCVC(CVC.value) &&
    validateDate(date.value));
}

function newStore() {
    const count = document.querySelector('.count');
    if (count === null) return;

    count.textContent = '0';
    cart.cartArr = [];
    createMain();
    localStorage.clear();
    history.pushState({}, 'newUrl', '/');
}