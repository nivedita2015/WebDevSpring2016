(function() {
    angular
        .module("SheetBuilderApp")
        .factory("SheetService", SheetService);

    function SheetService($rootScope) {
        var model = {
            sheets: [
                {"sheetId": "000", "title": "myPage"},
                {"sheetId": "010", "title": "MyBlog"},
                {"sheetId": "020", "title": "Todo"}
            ],
            createSheetForUser: createSheetForUser,
            deleteSheetById: deleteSheetById,
            updateSheetById: updateSheetById,
            setCurrentSheet: setCurrentSheet,
            getCurrentSheet: getCurrentSheet
        };
        $rootScope.sheets = model.sheets;
        return model;


        function setCurrentSheet(sheet) {
            $rootScope.currentsheet = sheet;
        }

        function getCurrentSheet() {
            return $rootScope.currentsheet;
        }

        function createSheetForUser(sheet, callback) {
            var newSheet = {
                sheetId: (new Date).getTime(),
                title: sheet.title
            };
            model.sheets.push(newSheet);

            callback(newSheet);
        }

        function deleteSheetById(sheetId, callback) {

            for (var f in model.sheets) {
                if (model.sheets[f].sheetId == sheetId) {
                    console.log("inside delete");
                    var fIndex = $rootScope.sheets.indexOf(model.sheets[f]);
                    $rootScope.sheets.splice(fIndex,1);
                    callback(model.sheets);
                    break;
                }
            }
        }


        function updateSheetById(sheetId, newSheet, callback) {
            for (var f in model.sheets) {
                if (model.sheets[f].sheetId == sheetId) {
                    model.sheets[f].title = newSheet.title;
                    var sheet = model.sheets[f];
                    callback(sheet);
                    break;
                }
            }
        }
    }
})();
