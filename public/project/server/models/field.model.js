var mockFields = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        createField: createField,
        findAllFields: findAllFields,
        findFieldById: findFieldById,
        updateField: updateField,
        deleteField: deleteField,
        findFieldByTitle: findFieldByTitle,
        findFieldsForForm: findFieldsForForm

    };

    return api;

    function createField(field) {
        field._id = (new Date).getTime();
        mockFields.push(field);
        console.log(field);
        return field;
    };

    function findAllFields() {
        return mockFields;
    };

    function findFieldById(fieldId) {
        for (var index in mockFields) {
            if (mockFields[index]._id === fieldId) {
                return mockFields[index];
                break;
            }
        }
        return null;
    };

    function updateField(fieldId, field) {
        for (var index in mockFields) {
            if (mockFields[index]._id === fieldId) {
                mockFields[index] = field;
                return true;
            }
        }
    };

    function deleteField(fieldId) {
        console.log("entered deleteField in model");
        console.log("fieldId is " + fieldId);
        for (var index in mockFields) {
            if (mockFields[index]._id == fieldId) {
                console.log("entered if condition");
                mockFields.splice(index, 1);
                return true;
            }
        }
        return false;
    };

    function findFieldByTitle(title) {
        var field;
        for (var index in mockFields) {
            field = mockFields[index];
            if (field.title == title) {
                return field;
                break;
            }
        }
        return null;
    };

    function findFieldsForForm(formId) {
        console.log("entred find sheets for form in field model server");
        console.log("formId is " + formId);
        var fieldsForForm = [];
        var field;
        for (var index in mockFields) {
            if (mockFields[index].formId == formId) {

                fieldsForForm.push(mockFields[index]);
            }
        }
        return fieldsForForm;

    }
}
();