"use strict";
// import express from 'express';
// const app = express();
// const requestLogger = (request, response, next) => {
//   console.log(request);
//   next();
// };
// app.use(requestLogger);
// const requireJsonContent = (request, response, next) => {
//   if (request.headers['content-type'] !== 'application/json') {
//     response.status(400).send('Server requires json')
//   } else {
//     next()
//   }
// }
// const errorLogger = (err, request, response, next) => {
//   console.log(`error ${err.message}`)
//   next(err)
// }
// const errorResponder = (err, request, response, next) => {
//   response.header("Content-Type", 'application/json')
//   response.status(err.statusCode).send(err.message)
// }
// const invalidPathHandler = (request, response, next) => {
//   response.status(400)
//   response.send('invalid path')
// }
// module.exports = { requireJsonContent, errorLogger, errorResponder, invalidPathHandler }
