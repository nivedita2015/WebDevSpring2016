
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", editUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res){
        console.log("inside service");
        var user = req.body;
        var users = [];
        users = userModel.createUser(user);
        res.send(users);

    };

    function editUser(req, res){
        var cred = {
            username: req.query.username,
            password: req.query.password
        };

        if(cred){
         var user = userModel.findUserByCredentials(cred);
            res.send(user);}
        else{
            var users=[];
            users=userModel.findAllUsers();
            res.json(users);
        }


        users = userModel.findAllUsers();
        res.json(users);

    };

    function getUserById(req, res){

        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);

    };

    //function getUserByUsername(req, res){
    //    var username= req.query.username;
    //    var user = userModel.findUserByUsername(username);
    //    res.send(user);
    //};

    //function getUserByCredentials(req, res){
    //    console.log("Inside service");
    //    var credentials = {
    //        username: req.query.username,
    //        password: req.query.password
    //    };
    //    var user = userModel.findUserByCredentials(credentials);
    //    res.send(user);
    //};

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