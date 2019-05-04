const mongoose = require('mongoose'),
    dbInfo = require('./db.credentials.js'),
    mongoBaseUrl = `${dbInfo.connectionString}/${dbInfo.authenticationDatabase}`,
    database = mongoose.createConnection(mongoBaseUrl, {
        useNewUrlParser: true
    });


module.exports = database;