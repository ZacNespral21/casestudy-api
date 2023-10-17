import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import ValidateCreditCard from './validatecc';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// var corsOptions = {
//   origin: 'http://locahost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Credit Card Validation Route
/***
  Passes data to ValidateCreditCard where it performs individual checks of each data point using both Luhn & manual validation,
  then returns a total isValid check along with each indidual bool in the event some of the details are invalid
***/
app.post('/validate', (req: Request, res: Response) => {
  try {
    const reqData = {
      cardNum: req.body.cardnum,
      expMth: req.body.expmth,
      expYr: req.body.expyr,
      cvv: req.body.cvv
    }

    const verify = new ValidateCreditCard(reqData.cardNum, reqData.expMth, reqData.expYr, reqData.cvv);
    const verifyResults = [
      verify.luhnCheck(reqData.cardNum),
      verify.cardNumber(reqData.cardNum),
      verify.cardExpDate(reqData.expMth, reqData.expYr),
      verify.cardCVV(reqData.cvv)
    ]

    const results = {
      isValid: verifyResults.every(Boolean),
      luhnValid: verify.luhnCheck(reqData.cardNum),
      cardNum: verify.cardNumber(reqData.cardNum),
      cardExpDate: verify.cardExpDate(reqData.expMth, reqData.expYr),
      cardCVV: verify.cardCVV(reqData.cvv),
      cardType: verify.cardType(reqData.cardNum),
      cvc: req.body.cvv,
    }

    console.log(results);
    if (!verifyResults.every(Boolean)){
      res.status(500).json();
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      err: "Something Went Wrong"
    })
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});