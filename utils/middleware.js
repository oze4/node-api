const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');
const _e_ = require('./helper.js');


const middleware = {

    verifyToken: (req, res, next) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({
                auth: false,
                message: 'Not authorized'
            });
        }
        const t = _e_.d(token, config.jwtEncryptionKey);
        jwt.verify(t, config.jwtSignature, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate'
                });
            }
            req.userId = decoded.id;
            next();
        });
    },

    routeNotFound: (req, res, next) => {
        return res.status(500).send({
            auth: false,
            message: 'Not authorized'
        });
    },

    e: _e_,

}


module.exports = middleware;