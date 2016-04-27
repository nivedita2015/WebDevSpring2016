
module.exports = function(app, db , mongoose) {

    var q = require('q');
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model("User", UserSchema);
    var api = {

        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getMongooseModel: getMongooseModel
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user,
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        // return a promise
        return deferred.promise;
    };


    //updateUser function
    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.update({_id: userId},{$set: user},
            function (err, doc)
            {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //deleteUser function
    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //findAllUsers function
    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc)
                }
            });
        return deferred.promise;
    }

    //findUserById function
    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //findUserByUsername function
    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //findUserByCredentials function
    function findUserByCredentials(credentials) {
        var username= credentials.username;
        var password= credentials.password;
        return UserModel.findOne({username: username, password: password});
    };

    // get mongooseModel
    function getMongooseModel() {
        return UserModel;
    }

}