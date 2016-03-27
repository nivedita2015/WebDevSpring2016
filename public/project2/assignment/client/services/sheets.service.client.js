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
            return $http.post("/api/assignment/user/"+userId+"/sheet", sheet);
        };

        function findAllSheetsForUser(userId){
            console.log("entered find All sheets for User");
            return $http.get("/api/assignment/user/"+userId+"/sheet");
        };

        function deleteSheetById(sheetId){
            console.log("entered deleteSheetById in sheets service client");
            return $http.delete("/api/assignment/sheet/"+ sheetId);
        };

        function updateSheetById(sheetId, newSheet){
            return $http.put("/api/assignment/sheet/"+ sheetId, newSheet);
        };
    }
})();