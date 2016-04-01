var mockForms = require("./form.mock.json");

module.exports = function(app,db,mongoose) {


    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var FieldSchema = require('./field.schema.server.js')(mongoose);
    var FieldModel= mongoose.model("Field", FieldSchema);


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

   //Field Functions
    function findAllFieldsInForm(formId) {
        var fields = [];
        var form;
        for (var index in mockForms) {
            form = mockForms[index];
            if (form._id === formId) {
                fields = form.fields;
                return fields;
                break;
            }
        }
        return null;
    };

    function findFieldInForm(fieldId, formId) {
        var field;
        var form = findFormById(formId);
        for (var index in form.fields) {
            field = form.fields[index];
            if (field._id === fieldId) {
                return field;
                break;
            }
        }
        return null;
    };

    function deleteFieldFromForm(fieldId, formId) {
        var field;
        var form = findFormById(formId);
        for (var index in form.fields) {
            field = form.fields[index];
            if (field._id == fieldId) {
                form.fields.splice(index, 1);
                return form.fields;
            }
        }
    };

    function createFieldInForm(formId, newField) {
        var form = findFormById(formId);
        newField._id = (new Date).getTime();
        form.fields.push(newField);
        return form.fields;
    };

    function updateFieldInForm(formId, fieldId, updatedField) {
        var form = findFormById(formId);
        for (var index in form.fields) {
            if (form.fields[index]._id == fieldId) {
                form.fields[index] = updatedField;
                return form.fields;
            }

        }
    };
}
