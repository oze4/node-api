const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');
const middleware = require('../utils/middleware.js');
const User = require('../models/user.js');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('/', (req, res) => {
    return res.status(403).send({
        auth: false,
        message: 'No token provided.'
      });
});




router.post('/register', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((user) => {
        const token = jwt.sign({ id: user._id }, config.jwtSignature, { expiresIn: 60000 });
        const et = middleware.e.e(token, config.jwtEncryptionKey);
        res.status(200).send({ auth: true, token: et });
    })
    .catch((err) => {
        // 11000 means user already exists
        if(err.code !== 11000){
            setTimeout(() => {
                User.findOneAndDelete({email: req.body.email}, (err,doc)=>{});
            }, 1000)
        }
        res.status(500).send("There was a problem registering the user");
    })
});


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        if (!user.validPassword(req.body.password)) { 
            return res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ id: user._id }, config.jwtSignature, { expiresIn: 60000 });
        const et = middleware.e.e(token, config.jwtEncryptionKey);
        res.status(200).send({ auth: true, token: et });
    });
});


module.exports = router;