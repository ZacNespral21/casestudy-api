"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config"));
const validatecc_1 = __importDefault(require("./validatecc"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = config_1.default.port;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/validate', (req, res) => {
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
        cardCVV: false,
        zac: 'yes',
        cardType: verify.cardType(reqData.cardNum)
    };
    console.log(verify.cardType(reqData.cardNum));
    res.send(results);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
