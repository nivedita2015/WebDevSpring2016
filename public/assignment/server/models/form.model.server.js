var mongoose      = require("mongoose");

module.exports = function() {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);
    var FieldSchema = require('./field.schema.server.js')(mongoose);
    //var FieldModel= mongoose.model("Field", FieldSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        //field functions
        findAllFieldsInForm: findAllFieldsInForm,
        findFieldInForm: findFieldInForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm
    };

    return api;

    function createForm(form) {
        return FormModel.create(form);
    };

    function findAllForms() {
        return FormModel.find();
    };

    function findFormById(formId) {
        return FormModel.findById(formId);
    };

    function updateForm(formId, form) {
        return FormModel.update({_id: formId}, {$set: form});
    };

    function deleteForm(formId) {
        return FormModel.remove({_id: formId});
    };

    function findFormByTitle(title) {
        return FormModel.findOne({title: title});
    };

    function findFormsForUser(userId) {
        var formsForUser = FormModel.find({userId: userId});
        return formsForUser;
    };

    function findAllFieldsInForm(formId){
        return FormModel.findById(formId)
            .then(function(result){
                return result.fields;
            })
    };

    function findFieldInForm(fieldId, formId){
        return FormModel.findById({_id: formId})
            .then(function(form){
                return form.fields.id(fieldId);
            });
    };

    function createFieldInForm(formId, newField){
        return FormModel.findById(formId).then(function(result) {
                result.fields.push(newField);
                return result.save();
            });
    };

    function updateFieldInForm(formId, fieldId, updatedField){
        return FormModel.findOne({_id: formId})
            .then(function(form){
                form.fields.update({_id: fieldId}, {$set: updatedField});
                return form.save();
            })
    };

    function deleteFieldFromForm(fieldId, formId){
        return FormModel.findById(formId)
            .then(function(result){
                result.fields.id(fieldId).remove();
                return result.save();
            });

    };


}
