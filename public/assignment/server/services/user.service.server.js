/////**
//// * Created by Nivi on 17/03/16.
//// */
////module.exports = function(app,model) {
////    app.get("/api/assignment/user",function(req,res){
////        res.json(model.findAll());
////    });
////    app.get("/api/assignment/user/:id",function(req,res){
////        res.json(model.findById(req.params.id));
////    });
////    app.get("/api/assignment/user?username=username",function(req,res){
////        res.json(model.findUserByUsername(req.params.username));
////    });
////    app.get("/api/assignment/user?username=alice&password=wonderland",function(req,res){
////        res.json(model.findUserByCredentials(req.params.username,req.params.password));
////    });
////    app.post("/api/assignment/user",function(req,res){
////        res.json(model.createUser(req.body.user));
////    });
////    app.put("/api/assignment/user/:id",function(req,res){
////        res.json(model.updateUser(req.params.id,req.body.user));
////    });
////    app.delete("/api/assignment/user/:id",function(req,res){
////        res.json(model.deleteUserById(req.params.id));
////    });
////}
//
//
//module.exports = function(app, userModel) {
//
//    app.get("/api/assignment/user",getAllUsers);
//    app.get("/api/assignment/user/:id",get)
//    app.get("/api/assignment/user?username=username")
//    app.get("/api/assignment/user?username=alice&password=wonderland)
//    app.post("/api/assignment/user",get)
//    app.put("/api/assignment/user/:id")
//    app.delete("/api/assignment/user/:id")
//
//    //app.post("/api/project/omdb/login", login);
//    //app.get("/api/project/omdb/loggedin", loggedin);
//    //app.post("/api/project/omdb/logout", logout);
//    //app.post("/api/project/omdb/register", register);
//    //app.get("/api/project/omdb/profile/:userId", profile);
//
//    function profile(req, res) {
//        var userId = req.params.userId;
//        var user = userModel.findUserById(userId);
//        var movieImdbIDs = user.likes;
//        var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
//        user.likesMovies = movies;
//        res.json(user);
//    }
//
//    function register(req, res) {
//        var user = req.body;
//        user = userModel.createUser(user);
//        req.session.currentUser = user;
//        res.json(user);
//    }
//
//    function login(req, res) {
//        var credentials = req.body;
//        var user = userModel.findUserByCredentials(credentials);
//        req.session.currentUser = user;
//        res.json(user);
//    }
//
//    function loggedin(req, res) {
//        res.json(req.session.currentUser);
//    }
//
//    function logout(req, res) {
//        req.session.destroy();
//        res.send(200);
//    }
//}

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=USERNAME&password=PASSWORD", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res){
        var user = req.body;
        var users = [];
        users = userModel.createUser(user, allUsers);
        res.send(users);

    };

    function getAllUsers(req, res){

        var users = [];
        users = userModel.findAllUsers();
        res.json(users);

    };

    function getUserById(req, res){

        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);

    };

    function getUserByUsername(req, res){
        var username= req.query.username;
        var user = userModel.findUserByUsername(username);
        res.send(user);
    };

    function getUserByCredentials(req, res){
        console.log("Inside service");
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.send(user);
    };

    function updateUser(req, res){
        var updatedUser = req.body;
        userModel.updateUser(req.params.id, updatedUser);
        var users = userModel.findAllUsers();
        res.json(users);
    };

    function deleteUser(req, res){
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.findAllUsers();
        res.json(users);
    };
};