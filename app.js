var express = require('express'),
    app = express(),
    db = require('./db/db.js'),
    UserController = require('./controllers/user/usercontroller.js'),
    HomeController = require('./controllers/home/homecontroller.js')


app.use('/', HomeController);
app.use('/users', UserController);


module.exports = app;