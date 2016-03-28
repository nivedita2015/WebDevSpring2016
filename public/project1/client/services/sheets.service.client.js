(function(){
    "use strict";
    angular
        .module("SheetBuilderApp")
        .factory("SheetService", SheetService);

    function SheetService($rootScope, $http){
        var sheetsApi = {
            createSheet: createSheet,
            findAllSheets: findAllSheets,
            deleteSheetById: deleteSheetById,
            updateSheetById: updateSheetById,
            setCurrentSheet: setCurrentSheet,
            getCurrentSheet: getCurrentSheet,
            getCurrentSheets: getCurrentSheets
        };
        //$rootScope.sheets = sheetsApi.sheets;
        return sheetsApi;

        function setCurrentSheet(sheet){
            $rootScope.currentSheet= sheet;
        }

        function getCurrentSheet(){
            return $rootScope.currentSheet;
        }

        function getCurrentSheets(){
            return sheetsApi.sheets;
        }
        function createSheet(sheet){
            return $http.post("/api/project1/sheet", sheet);
        };

        function findAllSheets(){

            console.log("inside client.js");

            return $http.get("/api/project1/sheet");
        };

        function deleteSheetById(sheetId){
            return $http.delete("/api/project1/sheet/"+ sheetId);
        };

        function updateSheetById(sheetId, newSheet){
            return $http.put("/api/project1/sheet/"+ sheetId, newSheet);
        };
    }
})();
