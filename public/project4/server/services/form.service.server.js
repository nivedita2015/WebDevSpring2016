module.exports = function(app, formModel) {
    app.get("/api/project4/user/:userId/form", getFormsForUser);
    app.get("/api/project4/form/:formId", getFormById);
    app.delete("/api/project4/form/:formId", deleteFormById);
    //app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.post("/api/project4/user/:userId/form", createFormForUser);

    app.put("/api/project4/form/:formId", updateFormById);



    function getFormsForUser(req, res){
        var userId = req.params.userId;
        var forms = formModel.findFormsForUser(userId);
        res.send(forms);
    };

    function getFormById(req, res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.send(form);
    };

    function deleteFormById(req, res){
        var deleteFormId = req.params.formId;
        var response = formModel.deleteForm(deleteFormId);
        res.send(response);
    };

    function createFormForUser(req, res){
        var form = req.body;
        var userId = req.params.userId;
        form.userId = userId;
        var createdForm = formModel.createForm(form);
        res.send(createdForm);
    };

    function updateFormById(req, res){
        var formId = req.params.formId;
        var updatedForm = req.body;
        var response = formModel.updateForm(formId, updatedForm);
        res.send(response);
    };

    function getAllForms(req, res){
        var allForms = [];
        allForms = formModel.findAllForms();
        res.send(allForms);
    };
};