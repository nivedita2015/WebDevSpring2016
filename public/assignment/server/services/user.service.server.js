module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {

        console.log("inside create user server");

        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user == null) {
                        return userModel.createUser(newUser)
                            .then(
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
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

    function getAllUsers(req, res){
        var password = req.query.password;
        var username = req.query.username;
        var id = req.params.id;

        if(username && password){
            getUserByCredentials(req, res);
        }
        else if (username){
            getUserByUsername(req, res);
        }
        else if(id){
            getUserById(req, res);
        }
        else{
            var users = [];
            users = userModel.findAllUsers();
            res.json(users);
            res.err(err)
        }
    };

    function getUserById(req, res){

        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);

    };

    function getUserByUsername(req, res){
        var username= req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    };

    function getUserByCredentials(req, res){

        console.log("inside get user by credentials");

        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel
            .findUserByCredentials(credentials)
            .then(
                function(result)
                {
                    console.log("printing the result " +result);
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };

    function updateUser(req, res) {
        var newUser = req.body;
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

    function deleteUser(req, res){
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.editUser();
        res.json(users);
    };
};