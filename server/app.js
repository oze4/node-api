const express = require('express');
const app = express();
const middleware = require('../utils/middleware.js');
const UserController = require('../controllers/user.controller.js');
const HomeController = require('../controllers/home.controller.js');
const AuthController = require('../controllers/auth.controller.js')


app.use('/', HomeController);
app.use('/auth', AuthController);
app.use('/users', middleware.verifyToken, UserController);

// 404 middleware
app.use(middleware.routeNotFound);


module.exports = app;