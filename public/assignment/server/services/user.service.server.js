/**
 * Created by Nivi on 17/03/16.
 */
module.exports = function(app,model) {
    app.get("/api/assignment/user",function(req,res){
        res.json(model.findAll());
    });
    app.get("/api/assignment/user/:id",function(req,res){
        res.json(model.findById(req.params.id));
    });
    app.get("/api/assignment/user?username=username",function(req,res){
        res.json(model.findUserByUsername(req.params.username));
    });
    app.get("/api/assignment/user?username=alice&password=wonderland",function(req,res){
        res.json(model.findUserByCredentials(req.params.username,req.params.password));
    });
    app.post("/api/assignment/user",function(req,res){
        res.json(model.createUser(req.body.user));
    });
    app.put("/api/assignment/user/:id",function(req,res){
        res.json(model.updateUser(req.params.id,req.body.user));
    });
    app.delete("/api/assignment/user/:id",function(req,res){
        res.json(model.deleteUserById(req.params.id));
    });
}