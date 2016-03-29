var mockForms = require("./form.mock.json");

module.exports = function(app){
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        findAllFieldsInForm: findAllFieldsInForm,
        findFieldInForm: findFieldInForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm
    };

    return api;

    function createForm (form) {
        form._id = (new Date).getTime();
        mockForms.push(form);
        return form;
    };

    function findAllForms () {
        return mockForms;
    };

    function findFormById (formId) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                return mockForms[index];
            }
        }
        return null;
    };

    function updateForm (formId, form) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                mockForms[index] = form;
                return true;
            }
        }
    };

    function deleteForm (formId) {
        for (var index in mockForms) {
            if (mockForms[index]._id == formId) {
                mockForms.splice(index, 1);
                return true;
            }
        }
        return false;
    };

    function findFormByTitle(title) {
        var form;
        for (var index in mockForms) {
            form = mockForms[index];
            if (form.title == title) {
                return form;
                break;
            }
        }
        return null;
    };

    function findFormsForUser(userId) {
        var formsForUser = [];
        var form;
        for (var index in mockForms) {
            if (mockForms[index].userId == userId) {

                formsForUser.push(mockForms[index]);
            }
        }
        return formsForUser;

    };

    //functions for fields of the form
    function findAllFieldsInForm(formId){

        var fields = [];
        var form;
        for(var index in mockForms){
            form = mockForms[index];
            if(form._id=== formId){
                fields = form.fields;
                return fields;

            }
        }
        return null;
    };

    function findFieldInForm(fieldId, formId){
        var field;
        var form = findFormById(formId);
        for(var index in form.fields){
            field = form.fields[index];
            if(field._id === fieldId){
                return field;
            }
        }
        return null;
    };

    function deleteFieldFromForm(fieldId, formId){
        var field;
        var form = findFormById(formId);
        for (var index in form.fields){
            field = form.fields[index];
            if( field._id === fieldId){
                form.fields.splice(index, 1);
                return form.fields;
            }
        }
    };


    function createFieldInForm(formId, newField){
        console.log(newField);
        var form = findFormById(formId);
        var nf = {
            _id: "id_"+(new Date).getTime(),
            title: newField.title

        };

        //newField._id = "id_"+(new Date).getTime();
        form.fields.push(nf);
        return nf;
    };

    function updateFieldInForm(formId, fieldId, updatedField){
        var form = findFormById(formId);
        var field;
        for(var index in form.fields){
            if(form.fields[index]._id === fieldId){
                form.fields[index] = updatedField;
                break;
            }
        }
    };



}