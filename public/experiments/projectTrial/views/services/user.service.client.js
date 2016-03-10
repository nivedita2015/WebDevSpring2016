(function(){
    angular
        .module("SheetBuilderApp")
        .factory("SheetService",SheetService);

    function SheetService($rootScope) {
        var model = {
            sheet: [
                {
                    "_id": 123
                },
                {
                    "_id": 234
                },
                {
                    "_id": 345
                },
                {
                    "_id": 456
                },
                {
                    "_id": 567
                }
            ],
            createSheet: createSheet,
            setCurrentSheet: setCurrentSheet,
            getCurrentSheet: getCurrentSheet,
            findAllSheets: findAllSheets,
            deleteSheetById: deleteSheetById
        };
        return model;

        function setCurrentSheet(sheet) {
            $rootScope.currentSheet = sheet;
        }

        function getCurrentSheet() {
            return $rootScope.currentSheet;
        }

        function createSheet(sheet, callback) {
            var new_sheet = {
                _id: (new Date).getTime()

            };
            model.sheets.push(new_sheet);
            callback(new_sheet);
        }


        function findAllSheets(callback) {
            callback(model.sheets);
        }

        function deleteSheetById(sheetId, callback) {
            for (var u in model.sheets) {
                if (model.sheets[u]._id == sheetId) {
                    var temp = model.sheets[u];
                     model.sheets.pop(temp);
                    callback(model.sheets);
                }
            }
        }
    }
})();
