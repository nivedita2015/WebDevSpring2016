(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$location,$rootScope,$scope){

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            var tempForm;
            var callback = function(form){
               tempForm=form;
            };

            FormService.createFormForUser($rootScope.currentUser,form,callback);

        }

        function updateForm(form){

            var tempform;
            var callback = function(form){
                tempform = form;
            };
            FormService.updateForm($rootScope.currentForm._id,form,callback);
        }

        function deleteForm($index){

            var tempForms;

            var callback = function(forms){
                tempForms = forms;
            };

            FormService.deleteFormById($scope.forms[$index]._id,callback);
        }

        function selectForm($index){

            $rootScope.currentForm = $scope.forms[$index]._id;

        }

    }

})();