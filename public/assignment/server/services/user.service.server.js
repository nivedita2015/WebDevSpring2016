//module.exports = function(app) {
//
//    var passport = require ('passport');
//    var LocalStrategy = require('passport-local').Strategy;
//    var mongoose      = require("mongoose");
//    var auth = authorized;
//
//    var UserModel = require("../models/user.model.server.js");
//
//    app.post("/api/assignment/assignment/login",passport.authenticate('local'),login);
//    app.post("/api/assignment/assignment/logout",logout);
//    app.post("/api/assignment/assignment/register",register);
//    app.post("/api/assignment/assignment/user",createUser);
//    app.get('/api/assignment/assignment/loggedin',loggedin);
//    app.get("/api/assignment/assignment/user",auth, getAllUsers);
//    app.get("/api/assignment/assignment/user/:id",auth, getUserById);
//    app.get("/api/assignment/assignment/user?username=username",auth, getUserByUsername);
//    app.get("/api/assignment/assignment/user?username=username&password=password",auth, getUserByCredentials);
//    app.put("/api/assignment/assignment/user/:id",auth, updateUser);
//    app.delete("/api/assignment/assignment/user/:id",auth, deleteUser);
//
//
//    passport.use(new LocalStrategy(localStrategy));
//    passport.serializeUser(serializeUser);
//    passport.deserializeUser(deserializeUser);
//
//    function localStrategy(username, password, done) {
//        UserModel
//            .findUserByCredentials({username: username, password: password})
//            .then(
//                function(user) {
//                    if (!user) { return done(null, false); }
//                    return done(null, user);
//                },
//                function(err) {
//                    if (err) { return done(err); }
//                }
//            );
//    }
//
//    function serializeUser(user, done) {
//        done(null, user);
//    }
//
//    function deserializeUser(user, done) {
//        UserModel
//            .findUserById(user._id)
//            .then(
//                function(user){
//                    done(null, user);
//                },
//                function(err){
//                    done(err, null);
//                }
//            );
//    }
//
//    function login(req, res) {
//        var user = req.user;
//        res.json(user);
//    }
//
//    function loggedin(req, res) {
//        res.send(req.isAuthenticated() ? req.user : '0');
//    }
//
//    function logout(req, res) {
//        req.logOut();
//        res.send(200);
//    }
//
//    function register(req, res) {
//        var newUser = req.body;
//        newUser.roles = ['student'];
//
//        UserModel
//            .findUserByUsername(newUser.username)
//            .then(
//                function(user){
//                    if(user) {
//                        res.json(null);
//                    } else {
//                        return UserModel.createUser(newUser);
//                    }
//                },
//                function(err){
//                    res.status(400).send(err);
//                }
//            )
//            .then(
//                function(user){
//                    if(user){
//                        req.login(user, function(err) {
//                            if(err) {
//                                res.status(400).send(err);
//                            } else {
//                                res.json(user);
//                            }
//                        });
//                    }
//                },
//                function(err){
//                    res.status(400).send(err);
//                }
//            );
//    };
//
//    function getAllUsers(req, res){
//        var password = req.query.password;
//        var username = req.query.username;
//        var id = req.params.id;
//
//        if(username && password){
//            getUserByCredentials(req, res);
//        }
//        else if (username){
//            getUserByUsername(req, res);
//        }
//        else if(id){
//            getUserById(req, res);
//        }
//        else{
//            if(isAdmin(req.user)) {
//                UserModel
//                    .findAllUsers()
//                    .then(
//                        function (users) {
//                            res.json(users);
//                        },
//                        function () {
//                            res.status(400).send(err);
//                        }
//                    );
//            } else {
//                res.status(403);
//            }
//        }
//    };
//
//    function createUser(req, res) {
//
//        console.log("inside create user server");
//
//        var newUser = req.body;
//        if(newUser.roles && newUser.roles.length > 1) {
//            newUser.roles = newUser.roles.split(",");
//        } else {
//            newUser.roles = ["student"];
//        }
//
//        UserModel
//            .findUserByUsername(newUser.username)
//            .then(
//                function(user){
//                    if(user == null) {
//                        return UserModel.createUser(newUser)
//                            .then(
//                                function(){
//                                    return UserModel.findAllUsers();
//                                },
//                                function(err){
//                                    res.status(400).send(err);
//                                }
//                            );
//                    } else {
//                        return UserModel.findAllUsers();
//                    }
//                },
//                function(err){
//                    res.status(400).send(err);
//                }
//            )
//            .then(
//                function(users){
//                    res.json(users);
//                },
//                function(){
//                    res.status(400).send(err);
//                }
//            )
//    }
//
//    function getUserById(req, res){
//
//
//        if(isAdmin(req.user)) {
//            UserModel
//                .findUserById(userId)
//                .then(
//                    function (user) {
//                        res.json(user);
//                    },
//                    function () {
//                        res.status(400).send(err);
//                    }
//                );
//        } else {
//            res.status(403);
//        }
//    };
//
//    function getUserByUsername(req, res){
//
//        if(isAdmin(req.user)) {
//            UserModel
//                .findUserByUsername(username)
//                .then(
//                    function (user) {
//                        res.json(user);
//                    },
//                    function () {
//                        res.status(400).send(err);
//                    }
//                );
//        } else {
//            res.status(403);
//        }
//    };
//
//    function getUserByCredentials(req, res){
//
//        console.log("inside get user by credentials");
//
//        var credentials = {
//            username: req.query.username,
//            password: req.query.password
//        };
//
//        if(isAdmin(req.user)) {
//            UserModel
//                .findUserByCredentials(credentials)
//                .then(
//                    function (result) {
//                        res.json(result);
//                    },
//                    function () {
//                        res.status(400).send(err);
//                    }
//                );
//        } else {
//            res.status(403);
//        }
//    };
//
//    function updateUser(req, res) {
//        var newUser = req.body;
//        if(!isAdmin(req.user)) {
//            delete newUser.roles;
//        }
//        if(typeof newUser.roles == "string") {
//            newUser.roles = newUser.roles.split(",");
//        }
//
//        UserModel
//            .updateUser(req.params.id, newUser)
//            .then(
//                function(user){
//                    return UserModel.findAllUsers();
//                },
//                function(err){
//                    res.status(400).send(err);
//                }
//            )
//            .then(
//                function(users){
//                    res.json(users);
//                },
//                function(err){
//                    res.status(400).send(err);
//                }
//            );
//    }
//
//    function deleteUser(req, res) {
//        if(isAdmin(req.user)) {
//
//            UserModel
//                .removeUser(req.params.id)
//                .then(
//                    function(user){
//                        return UserModel.findAllUsers();
//                    },
//                    function(err){
//                        res.status(400).send(err);
//                    }
//                )
//                .then(
//                    function(users){
//                        res.json(users);
//                    },
//                    function(err){
//                        res.status(400).send(err);
//                    }
//                );
//        } else {
//            res.status(403);
//        }
//    }
//
//    function isAdmin(user) {
//        if(user.roles.indexOf("admin") > 0) {
//            return true
//        }
//        return false;
//    }
//
//    function authorized(req,res,next){
//        if (!req.isAuthenticated()) {
//            res.send(401);
//        } else {
//            next();
//        }
//    };
//
//};


var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app,userModel) {

    var auth = authorized;

    app.post  ('/api/assignment/login', passport.authenticate('form-builder'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.post  ('/api/assignment/user', createUser);
    app.get   ('/api/assignment/loggedin',       loggedin);
    app.get   ('/api/assignment/user',     auth, findAllUsers);
    app.put   ('/api/assignment/user/:id', auth, updateUser);
    app.delete('/api/assignment/user/:id', auth, deleteUser);

    passport.use('form-builder',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        console.log("inside ls");
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        console.log("inside su");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("inside dsu");
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        console.log("inside l")
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        console.log("inside re");
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .removeUser(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        console.log("inside auth");
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
}