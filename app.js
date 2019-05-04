var express = require('express');
var app = express();
var db = require('./db/db.js');


var UserController = require('./user/usercontroller.js');
app.use('/users', UserController);


module.exports = app;