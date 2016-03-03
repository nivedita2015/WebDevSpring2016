(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234}
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        $rootScope.forms = model.forms;
        return model;


        function setCurrentForm(form) {
            $rootScope.currentForm = form;
        }

        function getCurrentForm() {
            return $rootScope.currentForm;
        }

        function createFormForUser(userId, form, callback) {
            var newform = {
                _id: (new Date).getTime(),
                id: userId,
                title: form.title
            };
            model.forms.push(newform);

            callback(newform);
        }

        function findAllFormsForUser(userId, callback) {
            var a = [];
            for (var f in model.forms) {
                var i = 0;
                if (model.forms[f].userId == userId) {
                    a[i] = model.forms[f];
                    i++;
                }
            }
            callback(a);
        }

        function deleteFormById(formId, callback) {
            for (var f in model.forms) {
                if (model.forms[f]._id == formId) {
                    var fIndex = $rootScope.forms.indexOf(model.forms[f]);
                    $rootScope.forms.splice(fIndex,1);
                    callback(model.forms);
                    break;


                    //var temp = model.forms[f];
                    //model.forms.pop(temp);
                    //callback(model.forms);
                    //break;
                }
            }
        }


        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            console.log("deleteMovie: " + index);
            $scope.movies.splice(index, 1);
        }

        function updateFormById(formId, newForm, callback) {
            for (var f in model.forms) {
                if (model.forms[f]._id == formId) {
                    model.forms[f].title = newForm.title;
                    var form = model.forms[f];
                    callback(form);
                    break;
                }
            }
        }
    }
})();
