'use strict';
var pgp = require('pg-promise')({
    // Initialization Options
});
var cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'coffee_shop',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

var db = pgp(cn);

function getItems(req, res, next) {
  db.any(`select * from orders`)
  .then(function(data) {
    res.items = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

function addItem(req, res, next) {
  db.one("insert into orders\
  (drink_name, size, price, comments)\
  values (${drink_name}, ${size}, ${price}, ${comments})\
  returning order_id;", req.body)
    .then(function(data) {

      res.order_id = data;
      next();
    })
    .catch(function(err) {
      console.error(err);
    })
}

function itemReady(req, res, next) {
  db.none(`update orders set ready = true where order_id = ($1)`, [req.params.orderid])
  .then(function() {
    next();
  })
  .catch(function(err) {
    console.error(err);
  })
}

function deleteItem(req, res, next){
  db.none(`delete from orders where order_id = ($1)`,
  [req.params.orderid])
  .then(function() {
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

module.exports.getItems = getItems;
module.exports.addItem = addItem;
module.exports.itemReady = itemReady;
module.exports.deleteItem = deleteItem;
