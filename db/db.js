const mongoose = require('mongoose');
const dbInfo = require('./db.credentials.js');
const mongoBaseUrl = `${dbInfo.connectionString}/${dbInfo.authenticationDatabase}`;
const database = mongoose.createConnection(mongoBaseUrl, { useNewUrlParser: true });


module.exports = database;