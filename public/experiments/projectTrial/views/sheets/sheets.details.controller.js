(function(){
    angular
        .module("SheetBuilderApp")
        .controller("SheetDetailController",SheetDetailController);

    function SheetDetailController(SheetDetailsService,$rootScope,$scope){

        $scope.addsheetfield = addsheetfield;
        $scope.updatesheetfield = updatesheetfield;
        $scope.deletesheetfield = deletesheetfield;
        $scope.selectsheetfield = selectsheetfield;


        function addsheetfield(field){
            var tempsheet;
            var callback = function(field){
                tempsheet=field;
            };
            if(field){
                SheetDetailsService.createsheetFieldForUser($rootScope.currentUser,field,callback);
                $scope.field = {};
            }
            else {
                return null;
            }
        }

        function updatesheetfield(field){

            var tempsheet;
            var callback = function(field){
                tempsheet = field;
            };
            if($rootScope.currentsheet){
                SheetDetailsService.updatesheetFieldById($rootScope.currentsheet._id,field,callback);
                $scope.field = {};
            }
        }

        function deletesheetfield($index){

            var tempsheets;

            var callback = function(fields){
                tempsheets = fields;
            };

            SheetDetailsService.deletesheetFieldById($scope.fields[$index]._id,callback);
        }

        function selectsheetfield($index){

            $scope.field = {
                _id : $scope.fields[$index]._id,
                title: $scope.fields[$index].title,
                userId: $scope.fields[$index].userId
            };
            $rootScope.currentsheet = $scope.field;


        }

    }

})();