'use strict';
const express    = require('express');
const logger     = require('morgan');
const path       = require('path');
const bodyParser = require('body-parser');
const db         = require('./db/pg');
const app        = express();
const _port      = process.env.PORT || 3000;

const beveragesRoute  = require('./routes/beverages');
const menuRoute       = require('./routes/menu');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// set up some logging
app.use(logger('dev'));
app.use('/beverages', beveragesRoute);
app.use('/menu', menuRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});



app.listen(_port, () => {
  console.log('listening on', _port);
});
