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
            if(form){
                FormService.createFormForUser($rootScope.currentUser,form,callback);
                $scope.form = {};
            }
            else {
                return null;
            }
        }

        function updateForm(form){

            var tempform;
            var callback = function(form){
                tempform = form;
            };
            if($rootScope.currentForm){
                FormService.updateFormById($rootScope.currentForm._id,form,callback);
                $scope.form = {};
            }
        }

        function deleteForm($index){

            var tempForms;

            var callback = function(forms){
                tempForms = forms;
            };

            FormService.deleteFormById($scope.forms[$index]._id,callback);
        }

        function selectForm($index){

            $scope.form = {
                _id : $scope.forms[$index]._id,
                title: $scope.forms[$index].title,
                userId: $scope.forms[$index].userId
            };
            $rootScope.currentForm = $scope.form;


        }

    }

})();