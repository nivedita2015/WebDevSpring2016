(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http){
        var fieldsApi = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        //$rootScope.forms = formsApi.forms;
        return fieldsApi;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/"+formId+"/field", field);
        };

        function getFieldsForForm(formId){
            console.log("inside client service"+formId);

            return $http.get("/api/assignment/form/"+formId+"/field");
        };

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignment/form/"+formId+"/field/"+ fieldId);
        };

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/"+ formId+"/field/"+ fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignment/form/"+formId+"/field/"+ fieldId, field);
        };
    }
})();