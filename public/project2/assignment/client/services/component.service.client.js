(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .factory("ComponentService", ComponentService);

    function ComponentService($rootScope, $http){
        var componentsApi = {
            findMyForm: findMyForm,
            createComponentForForm: createComponentForForm,
            getComponentsForForm: getComponentsForForm,
            getComponentForForm: getComponentForForm,
            deleteComponentFromForm: deleteComponentFromForm,
            updateComponent: updateComponent
        };

        return componentsApi;

        function createComponentForForm(formId, component){
            console.log("inside createComponentForForm client service");
            return $http.post("/api/assignment/form/"+formId+"/component", component);
        };

        function getComponentsForForm(formId){
            console.log("inside client service"+formId);
            return $http.get("/api/assignment/form/"+formId+"/component");
        };

        function getComponentForForm(formId, componentId){
            return $http.get("/api/assignment/form/"+formId+"/component/"+ componentId);
        };

        function deleteComponentFromForm(formId, componentId){
            console.log("inside deleteFirledFromFormID");
            return $http.delete("/api/assignment/form/"+ formId+"/component/"+ componentId);
        }

        function updateComponent(formId, componentId, component){
            return $http.put("/api/assignment/form/"+formId+"/component/"+ componentId, component);
        };

        function findMyForm(formId){
            return $http.get("/api/assignment/form/"+ formId);
        };
    }
})();