(function() {
    angular
        .module("SheetBuilderApp")
        .factory("SheetDetailsService", SheetDetailsService);

    function SheetDetailsService($rootScope) {
        var model = {
            fields: [
                {"_id": "000", "title": "Heading", "sheetId": 123},
                {"_id": "010", "title": "Heading-2", "sheetId": 123},
                {"_id": "020", "title": "Paragraph", "sheetId": 234}
            ],
            createSheetFieldForUser: createSheetFieldForUser,
            findAllSheetsFieldsForUser: findAllSheetsFieldsForUser,
            deleteSheetFieldById: deleteSheetFieldById,
            updateSheetFieldById: updateSheetFieldById
        };
        $rootScope.fields = model.fields;
        return model;


        function setCurrentSheetField(field) {
            $rootScope.currentsheet = field;
        }

        function getCurrentSheetField() {
            return $rootScope.currentsheet;
        }

        function createSheetFieldForUser(sheetId, field, callback) {
            var newField = {
                _id: (new Date).getTime(),
                id: sheetId,
                title: field.title
            };
            model.fields.push(newField);

            callback(newField);
        }

        function findAllSheetsFieldsForUser(sheetId, callback) {
            var a = [];
            for (var f in model.fields) {
                var i = 0;
                if (model.fields[f].sheetId == sheetId) {
                    a[i] = model.fields[f];
                    i++;
                }
            }
            callback(a);
        }

        function deleteSheetFieldById(sheetId, callback) {
            for (var f in model.fields) {
                if (model.fields[f]._id == sheetId) {
                    var fIndex = $rootScope.fields.indexOf(model.fields[f]);
                    $rootScope.fields.splice(fIndex,1);
                    callback(model.fields);
                    break;
                }
            }
        }


        function updateSheetFieldById(sheetId, newSheet, callback) {
            for (var f in model.fields) {
                if (model.fields[f]._id == sheetId) {
                    model.fields[f].title = newSheet.title;
                    var field = model.fields[f];
                    callback(field);
                    break;
                }
            }
        }
    }
})();
