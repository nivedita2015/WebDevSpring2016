(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http){
        var formsApi = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            setCurrentForm: setCurrentForm,
            getCurrentForm: getCurrentForm,
            getCurrentForms: getCurrentForms,
            findFormById: findFormById
        };
        //$rootScope.sheets = formsApi.sheets;
        return formsApi;

        function setCurrentForm(form){
            $rootScope.currentForm= form;
        }

        function getCurrentForm(){
            return $rootScope.currentForm;
        }

        function getCurrentForms(){
            return formsApi.forms;
        }
        function createFormForUser(userId, form){
            return $http.post("/api/project4/user/"+userId+"/form", form);
        };

        function findAllFormsForUser(userId){
            return $http.get("/api/project4/user/"+userId+"/form");
        };

        function deleteFormById(formId){
            return $http.delete("/api/project4/form/"+ formId);
        };

        function updateFormById(formId, newForm){
            return $http.put("/api/project4/form/"+ formId, newForm);
        };

        function findFormById(formId){
            return $http.get("/api/project4/form/"+ formId);
        };
    }
})();