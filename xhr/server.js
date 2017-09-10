(function() {
  'use strict';

  const express    = require('express'),
        app        = express(),
        port       = 3001,
        bodyParser = require('body-parser'),
        fs         = require('fs');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(__dirname + '/public'));

  app.use(logError);
  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.get('/', function(req, res) {
    res.send('index');
  });

  app.get('/file:file_name', function(req, res) {
    let file_name = __dirname + '/public/' + req.params.file_name;
    fs.readFile(file_name, 'utf8', function(err, data) {
      res.send(data);
    });
  });

  app.listen(port, function (){
    console.log('Server is listening to %d port in %s mode',port,app.settings.env);
  });


}())
