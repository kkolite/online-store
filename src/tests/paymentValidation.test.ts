import { validateCard, validateCVC, validateDate } from "../script/utils/Payment/payValidation";

document.body.innerHTML = `<div class="form__card_error"></div>
<div class="form__date_error"></div>
<div class="form__cvc_error"></div>`;

describe('Card Validation', () => {
    it('should correct validate card', () => {
        const result = validateCard('4444 4444 4444 4444')
        expect(result).toEqual(true)
    });
    it('should return false if short card length', () => {
        const result = validateCard('4255 2533 2355 25')
        expect(result).toEqual(false)
    });
})

describe('Date Validation', () => {
    it('should correct validate date', () => {
        const result = validateDate('12 / 24')
        expect(result).toEqual(true)
    });
    it('should return false if old', () => {
        const result = validateDate('12 / 21')
        expect(result).toEqual(false)
    });
    it('should return false if incorrect month', () => {
        const result = validateDate('24 / 24')
        expect(result).toEqual(false)
    });
})

describe('CVC Validation', () => {
    it('should correct validate CVC', () => {
        const result = validateCVC('111')
        expect(result).toEqual(true)
    });
    it('should return false if short', () => {
        const result = validateCVC('87')
        expect(result).toEqual(false)
    });
    it('should return false if big', () => {
        const result = validateCVC('123456789')
        expect(result).toEqual(false)
    });
})