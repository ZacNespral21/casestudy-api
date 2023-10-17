import express, { Express, Request, Response } from 'express';
import luhn from 'luhn-js';

class ValidateCreditCard{
  constructor(
    public cardNum: number,
    public expMth: number,
    public expYr: number,
    public cvv: number
  ) { }

  // Initalize Luhn Check
  public luhnCheck(cardNum: any) {
    return luhn.isValid(cardNum); // should respond true.
  }

  /***** Manual verification runs alongside Luhn as a backup method for more accurate verification *****/
  public cardNumber(cardNum: any) {
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

  public cardExpDate(expMth: number, expYr: number){
    const getDate = new Date();
    const getYr = getDate.getFullYear() % 100;
    const getMth = getDate.getMonth() + 1; // January is 0

    if (expYr > getYr) {
      return true;
    } else if (expYr === getYr && expMth >= getMth) {
      return true;
    }

    return false;
  }

  public cardCVV(cvv: any) {
    const cvvPattern = /^[0-9]{3,4}$/;
    return cvvPattern.test(cvv);
  }

  // Gets card type based on number pattern
  public cardType(cardNum: any) {
    const patterns: any = {
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

};

export default ValidateCreditCard;