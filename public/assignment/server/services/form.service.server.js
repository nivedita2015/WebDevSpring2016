/**
 * Created by Nivi on 17/03/16.
 */
module.exports = function(app,model) {
    app.get("/api/assignment/user/:userId/form",function(req,res){
        res.json(model.findAllFormsForUser(req.params.userId));
    });
    app.get("/api/assignment/form/:formId",function(req,res){
        res.json(model.findById(req.params.formId));
    });


    app.post("/api/assignment/user/:userId/form",function(req,res){
        res.json(model.createFormForUser(req.params.userId,req.body.form));
    });

    app.put(" /api/assignment/form/:formId",function(req,res){
        res.json(model.updateForm(req.params.formId,req.body.form));

    });
    app.delete("/api/assignment/form/:formId",function(req,res){
        res.json(model.deleteFormById(req.params.formId));
    });
}