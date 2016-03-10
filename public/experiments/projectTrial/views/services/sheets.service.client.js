(function() {
    angular
        .module("SheetBuilderApp")
        .factory("SheetService", SheetService);

    function SheetService($rootScope) {
        var model = {
            sheets: [
                {"_id": "000", "title": "Contacts"},
                {"_id": "010", "title": "ToDo"},
                {"_id": "020", "title": "CDs"}
            ],
            createsheetForUser: createsheetForUser,
            deletesheetById: deletesheetById,
            updatesheetById: updatesheetById,
            setCurrentSheet: setCurrentsheet,
            getCurrentSheet: getCurrentsheet
        };
        $rootScope.sheets = model.sheets;
        return model;


        function setCurrentsheet(sheet) {
            $rootScope.currentsheet = sheet;
        }

        function getCurrentsheet() {
            return $rootScope.currentsheet;
        }

        function createsheetForUser(sheet, callback) {
            var newsheet = {
                _id: (new Date).getTime(),
                title: sheet.title
            };
            model.sheets.push(newsheet);

            callback(newsheet);
        }

        function deletesheetById(sheetId, callback) {
            for (var f in model.sheets) {
                if (model.sheets[f]._id == sheetId) {
                    var fIndex = $rootScope.sheets.indexOf(model.sheets[f]);
                    $rootScope.sheets.splice(fIndex,1);
                    callback(model.sheets);
                    break;
                }
            }
        }


        function updatesheetById(sheetId, newsheet, callback) {
            for (var f in model.sheets) {
                if (model.sheets[f]._id == sheetId) {
                    model.sheets[f].title = newsheet.title;
                    var sheet = model.sheets[f];
                    callback(sheet);
                    break;
                }
            }
        }
    }
})();
