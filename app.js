var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var router = require('./routes');
var tables = require('./models/index.js');

// nunjucks configuration
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates

// logging middleware
app.use(morgan('dev'));

// serve up index file
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname+'/views/index.html'));
// });
app.use('/', router);

// serve up static files
app.use(express.static(path.join(__dirname, '/public')));

// sync the database tables
tables.db.sync({force: true}).then(function() {
  // start server
  app.listen(3000, function() {
    console.log("server is listening");
  })
}).catch(console.error);
