"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const luhn_1 = __importDefault(require("luhn"));
class ValidateCreditCard {
    constructor(cardNumber, expMth, expYr, cvv) {
        this.cardNumber = cardNumber;
        this.expMth = expMth;
        this.expYr = expYr;
        this.cvv = cvv;
        // let cardNumber = 4111111111111111;
        this.luhnVerify = (function (cardNumber) {
            var is_valid = (0, luhn_1.default)(cardNumber); // should respond true.
            return is_valid;
        });
        this.verifyType = (function (cardNumber) {
            const patterns = {
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                mastercard: /^5[1-5][0-9]{14}$/,
                amex: /^3[47][0-9]{13}$/,
                discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            };
            for (const cardType in patterns) {
                if (patterns[cardType].test(cardNumber)) {
                    return cardType;
                }
            }
            return "Unknown";
        });
        this.verifyCardNumber = (function (cardNumber) {
            let sum = 0;
            let isEven = false;
            for (let i = cardNumber.length - 1; i >= 0; i--) {
                let digit = parseInt(cardNumber.charAt(i), 10);
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
        });
        this.verifyExpDate = (function (expMth, expYr) {
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
        });
        this.verifyCVV = (function (cvv) {
            const cvvPattern = /^[0-9]{3,4}$/;
            return cvvPattern.test(cvv);
        });
        this.test = (function (cardNum) {
            return cardNum;
        });
    }
}
;
module.exports = ValidateCreditCard;
