'use strict';

const express = require('express');
const cors = require('cors')
const request = require('request');
const path = require('path');

const app = express();
app.use(cors());

app.get('/',  (req, res) =>{
  res.set('Content-Type', 'text/html');
  res.send("This is the backend service for <a href='https://csci571hw8-frontend-chiahaol.appspot.com'>USC CSCI 571 HW8</a>")
});

app.get('/finnhub/profile', (req, res) => {
  request(`https://finnhub.io/api/v1/stock/profile2?symbol=${req.query.symbol}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/quote', (req, res) => {
  request(`https://finnhub.io/api/v1/quote?symbol=${req.query.symbol}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/stockCandles', (req, res) => {
  request(`https://finnhub.io/api/v1/stock/candle?symbol=${req.query.symbol}&resolution=${req.query.resolution}&from=${req.query.fromTimestamp}&to=${req.query.toTimestamp}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/autocomplete', (req, res) => {
  request(`https://finnhub.io/api/v1/search?q=${req.query.queryString}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/news', (req, res) => {
  let toDate = new Date();
  let fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  let fromDateString = fromDate.toISOString().split('T')[0];
  let toDateString = toDate.toISOString().split('T')[0];
  request(`https://finnhub.io/api/v1/company-news?symbol=${req.query.symbol}&from=${fromDateString}&to=${toDateString}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/recommendation', (req, res) => {
  request(`https://finnhub.io/api/v1/stock/recommendation?symbol=${req.query.symbol}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/socialSentiment', (req, res) => {
  request(`https://finnhub.io/api/v1/stock/social-sentiment?symbol=${req.query.symbol}&from=2022-01-01&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/peers', (req, res) => {
  request(`https://finnhub.io/api/v1/stock/peers?symbol=${req.query.symbol}&token=c84dig2ad3ide9heiong`).pipe(res);
});

app.get('/finnhub/earnings', (req, res) => {
  request(`https://finnhub.io/api/v1/stock/earnings?symbol=${req.query.symbol}&token=c84dig2ad3ide9heiong`).pipe(res);
});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
