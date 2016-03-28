(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http){
        var fieldsApi = {
            findMyForm: findMyForm,
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return fieldsApi;

        function createFieldForForm(formId, field){
            console.log("inside createFieldForForm client service");
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
            console.log("inside deleteFirledFromFormID");
            return $http.delete("/api/assignment/form/"+ formId+"/field/"+ fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignment/form/"+formId+"/field/"+ fieldId, field);
        };

        function findMyForm(formId){
            return $http.get("/api/assignment/form/"+ formId);
        };
    }
})();