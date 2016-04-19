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

function getMenuItems(req, res, next) {
  db.any(`select * from menu_items`)
  .then(function(data) {
    res.items = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}


function addMenuItem(req, res, next) {
  db.one("insert into menu_items\
  (item_name, base_price)\
  values (${item_name}, ${base_price})\
  returning item_id;", req.body)
    .then(function(data) {

      res.item_id = data;
      next();
    })
    .catch(function(err) {
      console.log(req.body);
      console.error(err);
    })
}

function deleteMenuItem(req, res, next){
  db.none(`delete from menu_items where item_id = ($1)`,
  [req.params.itemid])
  .then(function() {
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

module.exports.getMenuItems = getMenuItems;
module.exports.addMenuItem = addMenuItem;
module.exports.deleteMenuItem = deleteMenuItem;
