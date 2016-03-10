(function() {
    angular
        .module("SheetBuilderApp")
        .factory("SheetDetailsService", SheetDetailsService);

    function SheetDetailsService($rootScope) {
        var model = {
            fields: [
                {"_id": "000", "title": "Heading", "userId": 123},
                {"_id": "010", "title": "Heading-2", "userId": 123},
                {"_id": "020", "title": "Paragraph", "userId": 234}
            ],
            createsheetFieldForUser: createsheetFieldForUser,
            findAllsheetsFieldsForUser: findAllsheetsFieldsForUser,
            deletesheetFieldById: deletesheetFieldById,
            updatesheetFieldById: updatesheetFieldById
        };
        $rootScope.fields = model.fields;
        return model;


        function setCurrentsheet(field) {
            $rootScope.currentsheet = field;
        }

        function getCurrentsheet() {
            return $rootScope.currentsheet;
        }

        function createsheetFieldForUser(userId, field, callback) {
            var newField = {
                _id: (new Date).getTime(),
                id: userId,
                title: sheet.title
            };
            model.fields.push(newField);

            callback(newField);
        }

        function findAllsheetsFieldsForUser(userId, callback) {
            var a = [];
            for (var f in model.fields) {
                var i = 0;
                if (model.fields[f].userId == userId) {
                    a[i] = model.fields[f];
                    i++;
                }
            }
            callback(a);
        }

        function deletesheetFieldById(sheetId, callback) {
            for (var f in model.fields) {
                if (model.fields[f]._id == sheetId) {
                    var fIndex = $rootScope.fields.indexOf(model.fields[f]);
                    $rootScope.fields.splice(fIndex,1);
                    callback(model.fields);
                    break;
                }
            }
        }


        function updatesheetFieldById(sheetId, newsheet, callback) {
            for (var f in model.fields) {
                if (model.fields[f]._id == sheetId) {
                    model.fields[f].title = newsheet.title;
                    var field = model.fields[f];
                    callback(field);
                    break;
                }
            }
        }
    }
})();
