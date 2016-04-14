(function(){
    angular
        .module("SheetEditorApp")
        .factory("CellService", CellService);

    function CellService($http, $q) {
        var api = {
            addCell: addCell,
            removeCell: removeCell,
            updateCell: updateCell
        };
        return api;

        function updateCell(sheetId, cellIndex, cell) {
            if(cell.visible == undefined)
            //setting undefined cell visible as true//
                cell.visible = true;

            if(cell.editable == undefined)
            //setting undefined cell editable as false//
                cell.editable= false;


            var deferred = $q.defer();

            $http.put("/ds/ss/sheet/"+sheetId+"/cell/"+cellIndex, cell)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        /*
        function updateCells(sheetId, cellIndies, cells) {
            var deferred = $q.defer();
            $http.put("/ds/ss/sheet/" + sheetId + "/cells/" + cellIndies, cells)
                .success(function(response){
                    deferred.resolve(response);
                })
            return deferred.promise;
        }
        */

        function addCell(sheetId, cell) {
            if(cell === undefined){
                cell = new Cell(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    false,
                    undefined,
                    true)
            }
            var deferred = $q.defer();

            $http.post("/ds/ss/sheet/"+sheetId+"/cell", cell)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function removeCell(sheetId, cellIndex) {
            var deferred = $q.defer();

            $http.delete("/ds/ss/sheet/"+sheetId+"/cell/"+cellIndex)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();