const express = require('express');
const app = express();
const UserController = require('./controllers/user/usercontroller.js');
const HomeController = require('./controllers/home/homecontroller.js');
const AuthController = require('./controllers/authentication/authcontroller.js')


app.use('/', HomeController);
app.use('/auth', AuthController);
app.use('/users', UserController);


module.exports = app;