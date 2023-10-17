"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    appName: process.env.APPNAME || 'EngageMD Case Study',
    title: process.env.TITLE || 'EngageMD Case Study Development Test',
    port: process.env.PORT || 8080,
    cors: {
        allowedOrigins: [
            '*'
            // 'http://localhost:3000',
            // 'https://master.d2i7sis2ulo6ua.amplifyapp.com'
        ]
    }
};
exports.default = config;
