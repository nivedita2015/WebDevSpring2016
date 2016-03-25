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
            return $http.post("/api/project/sheet", sheet);
        };

        function findAllSheets(){

            return $http.get("/api/project/sheet");
        };

        function deleteSheetById(sheetId){
            return $http.delete("/api/project/sheet/"+ sheetId);
        };

        function updateSheetById(sheetId, newSheet){
            return $http.put("/api/project/sheet/"+ sheetId, newSheet);
        };
    }
})();
