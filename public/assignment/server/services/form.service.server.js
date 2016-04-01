module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);



    function getFormsForUser(req, res){
        res.send(formModel.findFormsForUser(req.params.userId));
    };

    function getFormById(req, res){
        res.send(formModel.findFormById(req.params.formId));
    };

    function deleteFormById(req, res){
        res.send(formModel.deleteForm(req.params.formId));
    };

    function createFormForUser(req, res){
        var form = req.body;
        var userId = req.params.userId;
        form.userId = userId;
        res.send(formModel.createForm(form));
    };

    function updateFormById(req, res){
        res.send(formModel.updateForm(req.params.formId, req.body));
    };
};