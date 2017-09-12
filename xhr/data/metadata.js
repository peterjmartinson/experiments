(function() {

  'use strict';

  let database = [
    { id: 1, item: 'First Todo', file_name:'test.md' },
    { id: 2, item: 'Second Todo', file_name:'test2.md' }
  ];

  module.exports = database || [];

}());
