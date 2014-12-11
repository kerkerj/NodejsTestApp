'use strict';

var mongoose = require('mongoose');

var LogModel = new mongoose.Schema({
  name:       { type: String, require: true },
  test1:       { type: String, require: true },
  test2:       { type: String, require: true },
  test3:       { type: String, require: true },
  test4:       { type: String, require: true },
  test5:       { type: String, require: true },
  test6:       { type: String, require: true },
  test7:       { type: String, require: true },
  test8:       { type: String, require: true },
  test9:       { type: String, require: true },
  test10:       { type: String, require: true },
  test11:       { type: String, require: true },
  test12:       { type: String, require: true },
  test13:       { type: String, require: true },
  test14:       { type: String, require: true },
  test15:       { type: String, require: true },
  created_at:  { type: String, default: Date.now }
});

module.exports = mongoose.model('logs', LogModel);