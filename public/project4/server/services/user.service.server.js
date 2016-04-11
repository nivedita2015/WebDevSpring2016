
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/project4/user", editUser);
    app.get("/api/project4/user/:id", getUserById);
    app.get("/api/project4/user/:id", getUserById);
    app.put("/api/project4/user/:id", updateUser);
    app.delete("/api/project4/user/:id", deleteUser);


    function createUser(req, res){
        var user = req.body;
        var users = [];
        users = userModel.createUser(user);
        res.send(users);

    };

    function editUser(req, res){
        console.log("inside editUser");
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        console.log(cred);

        if(cred){
         var user = userModel.findUserByCredentials(cred);
            res.send(user);}
        else{
            var users=[];
            users=userModel.findAllUsers();
            res.json(users);
        }
    };

    function getUserById(req, res){

        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);

    };

    function updateUser(req,res){
        var updatedUser = req.body;
        userModel.updateUser(req.params, updatedUser);
        var users = userModel.findAllUsers();
        res.json(users);
    };

    function deleteUser(req, res){
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.editUser();
        res.json(users);
    };
};