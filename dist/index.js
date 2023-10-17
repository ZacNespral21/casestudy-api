"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const validatecc_1 = __importDefault(require("./validatecc"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// var corsOptions = {
//   origin: 'http://locahost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
// Default Route
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// Credit Card Validation Route
/***
  Passes data to ValidateCreditCard where it performs individual checks of each data point using both Luhn & manual validation,
  then returns a total isValid check along with each indidual bool in the event some of the details are invalid
***/
app.post('/validate', (req, res) => {
    try {
        const reqData = {
            cardNum: req.body.cardnum,
            expMth: req.body.expmth,
            expYr: req.body.expyr,
            cvv: req.body.cvv
        };
        const verify = new validatecc_1.default(reqData.cardNum, reqData.expMth, reqData.expYr, reqData.cvv);
        const verifyResults = [
            verify.luhnCheck(reqData.cardNum),
            verify.cardNumber(reqData.cardNum),
            verify.cardExpDate(reqData.expMth, reqData.expYr),
            verify.cardCVV(reqData.cvv)
        ];
        const results = {
            isValid: verifyResults.every(Boolean),
            luhnValid: verify.luhnCheck(reqData.cardNum),
            cardNum: verify.cardNumber(reqData.cardNum),
            cardExpDate: verify.cardExpDate(reqData.expMth, reqData.expYr),
            cardCVV: verify.cardCVV(reqData.cvv),
            cardType: verify.cardType(reqData.cardNum),
            cvc: req.body.cvv,
        };
        console.log(results);
        if (!verifyResults.every(Boolean)) {
            res.status(500).json();
        }
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({
            err: "Something Went Wrong"
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
