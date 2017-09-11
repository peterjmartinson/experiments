/*jshint esversion:6 */
(function() {

  'use strict';

  let db = require('../data/metadata'),
      dbfunction = {};

  // todo: autopopulate the ID
  dbfunction.createItem = function (new_item) {
    if (db.push(new_item)) {
      return 'New item ' + JSON.stringify(new_item) + ' has been added';
    }
    else {
      return 'Error: Item not added!';
    }
  };

  dbfunction.updateItem = function (item_id, updated_item) {
    let item_index = findIndex(item_id);
    let response = { success: false, message: '', item: updated_item };
    if (item_index < 0) {
      response.message = 'Item not found';
      return response;
    }
    else if ( !updated_item || typeof updated_item !== 'string') {
      response.message = 'Error - incorrect format';
      return response;
    }
    else {
      db[item_index] = { id: item_id, item: updated_item };
      response.success = true;
      response.message = 'Success!';
      return response;
    }
  };

  dbfunction.readAllItems = function () {
    return db;
  };

  dbfunction.readItem = function (item_id) {
    let item_index = findIndex(item_id);
    if (item_index < 0) {
      return "Item not found";
    }
    else {
      return db[item_index];
    }
  };

  dbfunction.deleteItem = function (item_id) {
    let item_index = findIndex(item_id);
    let response = { success: false, message: '', item: db[item_id] || {} };
    if (item_index < 0) {
      response.message = 'Item not found';
      return response;
    }
    else {
      db.splice(item_index, 1);
      response.success = true;
      response.message = 'Success!';
      return response;
    }
  };

  function findIndex(item_id) {
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === item_id) return i;
    }
    return -1;
  }

  module.exports = dbfunction;

}());
