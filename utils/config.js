'use strict'
let config;

try {
    config = require('../config/config.js')
} catch {
    config = {
        db: {
            connectionString: process.env.MONGO_STRING,
            authenticationDatabase: process.env.MONGO_AUTH_DB,
        },
        jwtSignature: process.env.JWT_SIGNATURE,
        jwtEncryptionKey: process.env.JWT_ENCRYPTION_KEY,
        port: process.env.PORT
    }
}


module.exports = config;