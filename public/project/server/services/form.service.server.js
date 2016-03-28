module.exports = function(app, formModel) {

    console.log("form service server");

    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);



    function getFormsForUser(req, res){
        console.log("entered get sheets for user in form service in server");
        var userId = req.params.userId;
        console.log(userId);
        var forms = formModel.findFormsForUser(userId);
        console.log("sheets in form service server js (response) is ");
        console.log(forms);
        res.send(forms);
    };

    function getFormById(req, res){
        console.log("inside form service server"+ req.params.formId);
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        console.log(form);
        res.send(form);
    };

    function deleteFormById(req, res){
        console.log("entered deleteFormById in server service");
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