const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');
const User = require('../models/user.js/index.js');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        const t = jwt.sign({ id: user._id }, config.secret, { expiresIn: 600 });
        res.status(200).send({ auth: true, token: token });
    });
});


module.exports = router;