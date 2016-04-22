//module.exports = function(app,db,mongoose) {
//    var UserSchema = require("./user.schema.server.js")(mongoose);
//    var UserModel = mongoose.model('UserModel',UserSchema);
//
//    var api = {
//
//        findUserByUsername: findUserByUsername,
//        findUserByCredentials: findUserByCredentials,
//        createUser: createUser,
//        updateUser: updateUser,
//        findAllUsers: findAllUsers,
//        findUserById: findUserById,
//        deleteUserById: deleteUserById,
//        getMongooseModel: getMongooseModel
//
//
//    };
//    return api;
//
//    function getMongooseModel() {
//        return UserModel;
//    }
//
//    function createUser(user) {
//        console.log("inside create user model");
//        return UserModel.create(user);
//    }
//
//    function findAllUsers() {
//        return UserModel.find();
//    }
//
//    function findUserById(userId) {
//        return UserModel.findById(userId);
//    }
//
//    function updateUser(userId, user) {
//        return UserModel.update({_id: userId}, {$set: user});
//    }
//
//    function deleteUserById(userId) {
//        return UserModel.remove({_id: userId});
//    }
//
//    function findUserByUsername(username) {
//        return UserModel.findOne({username: username});
//    }
//
//    function findUserByCredentials(credentials) {
//
//        console.log("inside model");
//
//        return UserModel.findOne(
//            {
//                username: credentials.username,
//                password: credentials.password
//            }
//        );
//    }
//}

var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        getMongooseModel: getMongooseModel
    };
    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findAllUsers() {
        return UserModel.find();
    }
    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function getMongooseModel() {
        return UserModel;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
}