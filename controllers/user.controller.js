'use strict'
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/user.js');




/**********************************************************************/
/******************************** POST ********************************/
/**********************************************************************/
//                   * post requests would go here *                   /
/*--------------------------------------------------------------------*/




/************************************************************************/
/********************************** GET *********************************/
/************************************************************************/
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        return err
            ? res.status(500).send("There was a problem finding the users.")
            : res.status(200).send(users);
    });
});


router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        return err
            ? res.status(500).send("There was a problem finding the user.")
            : !user
                ? res.status(404).send("No user found.")
                : res.status(200).send(user);
    });
});
/*--------------------------------------------------------------------*/




/**********************************************************************/
/******************************** DELETE ******************************/
/**********************************************************************/
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        return err
            ? res.status(500).send("There was a problem deleting the user.")
            : res.status(200).send("User " + user.name + " was deleted.");
    });
});
/*--------------------------------------------------------------------*/




/**********************************************************************/
/********************************** PUT *******************************/
/**********************************************************************/
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, user) => {
        return err
            ? res.status(500).send("There was a problem updating the user.")
            : res.status(200).send(user);
    });
});
/*--------------------------------------------------------------------*/



module.exports = router;