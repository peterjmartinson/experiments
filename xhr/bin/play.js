let db = require('./mock_database');

console.log(db);

db.push({id:2, item:'pushed item'});
console.log(db);
