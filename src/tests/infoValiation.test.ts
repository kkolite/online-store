import { validateAdress, validateEMail, validateName, validateTel } from '../script/utils/Payment/infoValidation';

document.body.innerHTML = `<div class="form__name_error"></div>
<div class="form__adress_error"></div>
<div class="form__tel_error"></div>;
<div class="form__email_error"></div>`;

describe('Name Validation', () => {
  it('should correct validate name', () => {
    const result = validateName('Egor Litavor');
    expect(result).toEqual(true);
  });
  it('should return false if short name', () => {
    const result = validateName('Egor');
    expect(result).toEqual(false);
  });
  it('should return false if incorrect length of name', () => {
    const result = validateName('Yi Ho');
    expect(result).toEqual(false);
  });
});

describe('Adress Validation', () => {
  it('should correct validate adress', () => {
    const result = validateAdress('Lenina Minsk Belarus');
    expect(result).toEqual(true);
  });
  it('should return false if short adress', () => {
    const result = validateAdress('Minsk Belarus');
    expect(result).toEqual(false);
  });
  it('should return false if incorrect length of adress part', () => {
    const result = validateAdress('Nizami Baku AZ');
    expect(result).toEqual(false);
  });
});

describe('Tel Validation', () => {
  it('should correct validate tel', () => {
    const result = validateTel('+375331234567');
    expect(result).toEqual(true);
  });
  it('should return false if no +', () => {
    const result = validateTel('80331234567');
    expect(result).toEqual(false);
  });
  it('should return false if incorrect length of tel', () => {
    const result = validateTel('+37533');
    expect(result).toEqual(false);
  });
});

describe('EMail Validation', () => {
  it('should correct validate email', () => {
    const result = validateEMail('name@host.com');
    expect(result).toEqual(true);
  });
  it('should return false if no @', () => {
    const result = validateEMail('fakeemail.com');
    expect(result).toEqual(false);
  });
  it('should return false if incorrect length of any part', () => {
    const result = validateEMail('email@');
    expect(result).toEqual(false);
  });
});
