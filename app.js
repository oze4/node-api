const express = require('express');
const app = express();
const UserController = require('./controllers/user/usercontroller.js');
const HomeController = require('./controllers/home/homecontroller.js');


app.use('/', HomeController);
app.use('/users', UserController);


module.exports = app;