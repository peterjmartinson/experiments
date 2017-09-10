/*jshint esversion:6 */
let model = require('../bin/model');
let db = require('../bin/mock_database');
let assert = require('assert');

let second_item = {id:2, item:'First test item'};
let third_item = {id:3, item:'Second test item'};
db.push(second_item);
db.push(third_item);

describe('model.js', function() {
  it('should have a Create method', function() {
    assert.equal(typeof model.createItem, 'function');
  });
  it('should have a Read method', function() {
    assert.equal(typeof model.readItem, 'function');
  });
  it('should have a Read All method', function() {
    assert.equal(typeof model.readAllItems, 'function');
  });
  it('should have a Update method', function() {
    assert.equal(typeof model.updateItem, 'function');
  });
  it('should have a Delete method', function() {
    assert.equal(typeof model.deleteItem, 'function');
  });
});

describe('model.js - readAllItems()', function() {
  it('should return the whole database', function() {
    let dump = [];
    dump = model.readAllItems();
    assert.equal(dump.length, 3);
    assert.equal(second_item, dump[1]);
  });
});

describe('model.js - readItem()', function() {
  it('should return a specific item', function() {
    let item = model.readItem(2);
    assert.equal(item.item, second_item.item);
  });

  it('should respond gracefully to bad requests', function() {
    let item = model.readItem(4);
    assert.equal(item, 'Item not found');
  });
});

describe('model.js - createItem()', function() {
  it('should create a new item', function() {
    let new_item = {id:4, item: "Fourth test item"};
    model.createItem(new_item);
    assert.equal(db.length, 4);
  });
});

describe('model.js - updateItem()', function() {
  it('should update an existing item', function() {
    let old_item = db[0],
        updated_item = "Test",
        response = model.updateItem(1, updated_item),
        new_item = db[0];
    assert.notDeepEqual(old_item, new_item);
    assert.ok(response.success);
  });
  it('should respond gracefully to bad requests', function() {
    let bad_id = 100,
        good_id = 1,
        bad_item = {},
        good_item = {id:1, item: "Another Test"},
        response_bad_id = model.updateItem(bad_id, good_item),
        response_bad_item = model.updateItem(good_id, bad_item);
    assert.equal(response_bad_id.success, false);
    assert.equal(response_bad_item.success, false);
  });
});

describe('model.js - deleteItem()', function() {
  it('should remove an item from the list', function() {
    let deleted_item = db[0];
    let response = model.deleteItem(1);
    assert.notDeepEqual(db[0], deleted_item);
    assert.equal(response.success, true);
  });
});

    
