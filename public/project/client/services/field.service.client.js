(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http){
        var fieldsApi = {
            createFieldForForm: createFieldForForm,
            findAllFieldsForForm: findAllFieldsForForm,
            deleteFieldById: deleteFieldById,
            updateFieldById: updateFieldById,
            setCurrentField: setCurrentField,
            getCurrentField: getCurrentField,
            getCurrentFields: getCurrentFields,
            findMyForm : findMyForm,
            getFieldsForForm: getFieldsForForm
        };
        //$rootScope.sheets = fieldsApi.sheets;
        return fieldsApi;

        function setCurrentField(field){
            $rootScope.currentField= field;
        }

        function getCurrentField(){
            return $rootScope.currentField;
        }

        function getCurrentFields(){
            return fieldsApi.fields;
        }
        function createFieldForForm(formId, field){
            return $http.post("/api/project/form/"+formId+"/field", field);
        };

        function getFieldsForForm(formId){
            return $http.get("/api/project/form/"+formId+"/field");
        };

        function findAllFieldsForForm(formId){
            return $http.get("/api/project/form/"+formId+"/field");
        };

        function deleteFieldById(fieldId,formId){
            return $http.delete("/api/project/form/"+formId+"/field/"+fieldId);
        };

        function updateFieldById(formId,fieldId, newField){
            console.log("inside put client service");
            return $http.put("/api/project/form/"+formId+"/field/"+ fieldId, newField);
        };

        function findMyForm(formId){
            return $http.get("/api/project/form/"+ formId);
        };
    }
})();