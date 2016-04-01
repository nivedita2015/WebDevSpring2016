module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldForForm);
    app.get("/api/assignment/form/:formId", findForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);
    app.post("/api/assignment/form/:formId/field", createFieldIntoForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldIntoForm);

    function findForm(req, res){
        res.send(formModel.findFormById(req.params.formId));
    }

    function findFieldsForForm(req, res){
        res.json(formModel.findAllFieldsInForm(req.params.formId));
    };

    function findFieldForForm(req, res){
        res.send(formModel.findFieldInForm(req.params.fieldId, req.params.formId));
    };

    function deleteFieldInForm(req, res){
        res.json(formModel.deleteFieldFromForm(req.params.fieldId,req.params.formId));
    };

    function createFieldIntoForm(req, res){
        var newField = req.body;
        newField._id = (new Date).getTime();
        res.json(formModel.createFieldInForm(req.params.formId, newField));
    };

    function updateFieldIntoForm(req, res){
        res.json(formModel.updateFieldInForm(req.params.formId,req.params.fieldId, req.body));
    };
};