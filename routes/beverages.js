'use strict';
const express     = require('express');
const beverages   = express.Router();
const db          = require('../db/pg');

// beverages route
beverages.route('/')
  .get( db.getItems,(req, res) => {
    // get beverages
    res.send(res.items);
  })
  .post( db.addItem, (req, res) => {
    // add beverage
    res.send(res.order_id);
  });

beverages.route('/:orderid')
  .put( db.itemReady, (req, res) => {
    // update ready status
    res.send(req.method);
  })
  .delete( db.deleteItem, (req, res) => {
    // delete beverage
    res.send(req.method);
  });


module.exports = beverages;
