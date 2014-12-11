'use strict';

var debug = require('debug')('TEST');
var app = require('../app');

app.set('port', 8080);

var server = app.listen(app.get('port'), function() {
  debug('Server listening on port ' + server.address().port);
});

process.on('uncaughtException', function(e) {
  debug(e);
});