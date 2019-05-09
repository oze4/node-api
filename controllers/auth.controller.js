const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');
const User = require('../models/user.js');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('/', (req, res) => {
    return res.status(403).send({
        auth: false,
        message: 'No token provided.'
      });
});


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        if (!user.validPassword(req.body.password)) { 
            return res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 600 });
        /**
         * do something here to encrypt (bcrypt) token before sending?
         */
        res.status(200).send({ auth: true, token: token });
    });
});


module.exports = router;