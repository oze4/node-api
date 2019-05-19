'use strict'
const config       = require('../utils/config.js');
const mongoose     = require('mongoose');
const mongoBaseUrl = `${config.db.connectionString}/${config.db.authenticationDatabase}`;
const mongoDB      = mongoose.createConnection(mongoBaseUrl, { useNewUrlParser: true });

mongoose.set('useCreateIndex', true) // needed to suppress errors


module.exports = mongoDB;
