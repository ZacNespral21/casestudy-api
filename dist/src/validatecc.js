"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luhn_js_1 = __importDefault(require("luhn-js"));
class ValidateCreditCard {
    constructor(cardNum, expMth, expYr, cvv) {
        this.cardNum = cardNum;
        this.expMth = expMth;
        this.expYr = expYr;
        this.cvv = cvv;
    }
    // Initalize Luhn Check
    luhnCheck(cardNum) {
        return luhn_js_1.default.isValid(cardNum); // should respond true.
    }
    /***** Manual verification runs alongside Luhn as a backup method for more accurate verification *****/
    cardNumber(cardNum) {
        let sum = 0;
        let isEven = false;
        for (let i = cardNum.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNum.charAt(i), 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }
    cardExpDate(expMth, expYr) {
        const getDate = new Date();
        const getYr = getDate.getFullYear();
        const getMth = getDate.getMonth() + 1; // January is 0
        if (expYr > getYr) {
            return true;
        }
        else if (expYr === getYr && expMth >= getMth) {
            return true;
        }
        return false;
    }
    cardCVV(cvv) {
        const cvvPattern = /^[0-9]{3,4}$/;
        return cvvPattern.test(cvv);
    }
    // Gets card type based on number pattern
    cardType(cardNum) {
        const patterns = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        };
        for (const cardType in patterns) {
            if (patterns[cardType].test(cardNum)) {
                return cardType;
            }
        }
        return "Unknown";
    }
}
;
exports.default = ValidateCreditCard;
