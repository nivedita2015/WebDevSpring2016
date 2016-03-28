module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/field/:fieldId", getFieldById);
    app.delete("/api/assignment/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/field/:fieldId", updateFieldById);
    app.get("/api/assignment/form/:formId", getMyForm);



    function getFieldsForForm(req, res){
        console.log("entered get sheets for form in field service in server");
        var formId = req.params.formId;
        console.log(formId);
        var fields = formModel.findFieldsForForm(formId);
        console.log("sheets in field service server js (response) is ");
        console.log(fields);
        res.send(fields);
    };

    function getFieldById(req, res){
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(fieldId);
        res.send(field);
    };

    function deleteFieldById(req, res){
        console.log("entered deleteFieldById in server service");
        var deleteFieldId = req.params.fieldId;
        var response = formModel.deleteField(deleteFieldId);
        res.send(response);
    };

    function createFieldForForm(req, res){
        var field = req.body;
        var formId = req.params.formId;
        field.formId = formId;
        var createdField = formModel.createField(field);
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