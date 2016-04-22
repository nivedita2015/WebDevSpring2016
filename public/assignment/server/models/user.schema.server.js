var mongoose = require('mongoose');

module.exports = function(){
    var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
    }, {collection: "user"});
    return UserSchema;
};