/*jshint esversion:6, node:true */
(function() {
  'use strict';

  const express    = require('express'),
        app        = express(),
        port       = 3000,
        bodyParser = require('body-parser'),
        fs         = require('fs'),
        model      = require('./bin/model');

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

  // current ghetto way to grab the contents of a file.
  app.get('/file:file_name', function(req, res) {
    console.log('requested string: ' + req.params.file_name);
    let file_name = __dirname + '/data/' + req.params.file_name;
    fs.readFile(file_name, 'utf8', function(err, data) {
      res.send(data);
    });
  });

  app.get('/query:id', function(req, res) {
    let item = readItem(req.params.id);
    let file_name = __dirname + '/data/' + item.file_name;
    fs.readFile(file_name, 'utf8', function(err, data) {
      res.send(data);
    });
  });

  app.listen(port, function (){
    console.log('Server is listening to %d port in %s mode',port,app.settings.env);
  });


}());
