'use strict';

var debug = require('debug')('TEST');
var mongoose = require('mongoose');
var express = require('express');
var LogComplexModel = require('./LogComplexModel');
var app = express();

var dbIp = process.env.MONGODB_IP;
var dbUrl = "mongodb://" + dbIp + ":27017/GG";

debug(dbUrl);

mongoose.connect(dbUrl);

app.get('/', function(req, res) {
  res.status(200).json({index: "hello"});
});

app.post('/normal', function(req, res) {
  var log = new LogComplexModel(genLogComplexModelObj());

  log.save(function(err, results) {
    if (err) {
      debug(err);
      res.status(400).json( { error: err } ) ;
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/normal/:id', function(req, res) {
  var id = req.params.id;

  LogComplexModel
      .find({ _id: id })
      .exec(function(err, results) {
        if (err) {
          debug(err);
          res.status(404).json( { error: err } );
        } else {
          debug(results.length);
          res.status(200).json( results[0] );
        }
      });
});

app.get('/normal', function(req, res) {
  LogComplexModel
      .find({})
      .select({ _id: 1 })
      .exec(function(err, results) {
        if (err) {
          debug(err);
          res.status(404).json( { error: err } );
        } else {
          var arr = [];

          results.forEach(function(value, index) {
            console.log(index + " : " + value);
            arr.push(value._id);
          });

          res.status(200).json( { _ids: arr } );
        }
      });
});

app.get('/longtask/:sec', function(req, res) {
  var sec = req.params.sec;

  setTimeout(function() {
    res.status(200).json({ index: "long task is done." });
  }, sec*1000);
});

function genLogComplexModelObj() {
  var obj = { name: 'gg' };

  for ( var i = 1 ; i <= 15 ; i++ ) {
    var key = "test" + i;
    obj[key] = randomString(255);
  }

  return obj;
}

function randomString(length)
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = app;