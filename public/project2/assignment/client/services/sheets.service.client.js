(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .factory("SheetService", SheetService);

    function SheetService($rootScope, $http){
        var sheetsApi = {
            createSheetForUser: createSheetForUser,
            findAllSheetsForUser: findAllSheetsForUser,
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
        function createSheetForUser(userId, sheet){
            return $http.post("/api/project1/user/"+userId+"/sheet", sheet);
        };

        function findAllSheetsForUser(userId){
            console.log("entered find All sheets for User");
            return $http.get("/api/project1/user/"+userId+"/sheet");
        };

        function deleteSheetById(sheetId){
            console.log("entered deleteSheetById in sheets service client");
            return $http.delete("/api/project1/sheet/"+ sheetId);
        };

        function updateSheetById(sheetId, newSheet){
            return $http.put("/api/project1/sheet/"+ sheetId, newSheet);
        };
    }
})();