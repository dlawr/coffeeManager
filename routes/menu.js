'use strict';
const express     = require('express');
const menu        = express.Router();
const db          = require('../db/menudb');

// menu route
menu.route('/')
  .get( db.getMenuItems,(req, res) => {
    // get menu
    res.send(res.items);
  })
  .post( db.addMenuItem, (req, res) => {
    // add menu item
    res.send(res.item_id);
  });

menu.route('/:itemid')

  .delete( db.deleteMenuItem, (req, res) => {
    // delete beverage
    res.send(req.method);
  });


module.exports = menu;
