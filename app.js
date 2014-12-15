'use strict';

var debug = require('debug')('TEST');
var mongoose = require('mongoose');
var express = require('express');
var log4js = require('log4js');
var LogComplexModel = require('./LogComplexModel');
var app = express();

// Set logger
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台輸出
    {
      type: 'file', //文件輸出
      filename: './logs/access.log',
      maxLogSize: 20000000, // 20 MB
      backups: 10,
      category: 'normal'
    }
  ],
  replaceConsole: true
});

var logger = log4js.getLogger('normal');
app.use(log4js.connectLogger(logger));

logger.debug("Some debug messages");
logger.debug("Some debug messages");
logger.debug("Some debug messages");
logger.debug("Some debug messages");

var dbIp = process.env.MONGODB_IP;

if (dbIp === undefined) {
  console.log("Warning! You should setup an env variable called: MONGODB_IP!");
  console.log("Program exited!");
  process.exit(0);
}

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

  if (sec < 0) sec = 1;
  if (sec > 20) sec = 20;

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