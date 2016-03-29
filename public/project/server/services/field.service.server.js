module.exports = function(app, formModel) {
    app.get("/api/project/form/:formId/field", getFieldsForForm);
    app.get("/api/project/field/:fieldId", getFieldById);
    app.delete("/api/project/field/:fieldId", deleteFieldById);
    app.post("/api/project/form/:formId/field", createFieldForForm);
    app.put("/api/project/field/:fieldId", updateFieldById);
    app.get("/api/project/form/:formId", getMyForm);



    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsInForm(formId);
        res.send(fields);
    };

    function getFieldById(req, res){
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(fieldId);
        res.send(field);
    };

    function deleteFieldById(req, res){
        var deleteFieldId = req.params.fieldId;
        var response = formModel.deleteField(deleteFieldId);
        res.send(response);
    };

    function createFieldForForm(req, res){
        var field = req.body;
        var formId = req.params.formId;
        field.formId = formId;

        var createdField = formModel.createFieldInForm(formId,field);
        console.log("passed field is "+createdField.label);
        res.send(createdField);
    };

    function updateFieldById(req, res){
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        var response = formModel.updateField(fieldId, updatedField);
        res.send(response);
    };

    function getMyForm(req, res){
        var form = formModel.findFormById(req.params.formId);
        res.send(form);
    }

    function getAllFields(req, res){
        var allFields = [];
        allFields = formModel.findAllFields();
        res.send(allFields);
    };
};