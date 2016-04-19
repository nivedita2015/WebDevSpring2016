(function(){
    angular
        .module("SheetEditorApp")
        .factory("SheetService", SheetService);

    function SheetService($http, $q) {
        var api = {
            createSheet: createSheet,
            readAllSheet: readAllSheet,
            readOneSheet: readSheet,
            updateSheet: updateSheet,
            deleteSheet: deleteSheet
        };
        return api;

        function createSheet(sheet) {
            var deferred = $q.defer();

            $http.post("/spreadsheetEditor/sheet", sheet)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function readAllSheet() {
            var deferred = $q.defer();

            $http.get("/spreadsheetEditor/sheet")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function readSheet(id) {
            var deferred = $q.defer();

            $http.get("/spreadsheetEditor/sheet/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateSheet(id, sheet) {
            var deferred = $q.defer();

            $http.put("/spreadsheetEditor/sheet/" + id, sheet)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteSheet(id) {
            var deferred = $q.defer();

            $http.delete("/spreadsheetEditor/sheet/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();
