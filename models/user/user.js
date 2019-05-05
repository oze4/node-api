const mongoose = require('mongoose');  
const databaseConnection = require('../../db/db.js');
const usersDatabase = databaseConnection.useDb('Users');


const UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});


module.exports = usersDatabase.model('Users', UserSchema, 'users');