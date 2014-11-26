/**
 * Created by john.nana on 11/14/2014.
 */

var mongoose = require('mongoose'),
    dbConfig= require('../db.js');



mongoose.connect(dbConfig.url);
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});

module.exports= mongoose.model('User', UserSchema);





