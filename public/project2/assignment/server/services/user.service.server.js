
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", editUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res){
        //console.log("inside service");
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
            //console.log(user);
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
        //console.log("inside server updateUser");
        //console.log(req);
        var updatedUser = req.body;
        console.log(req.body);
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