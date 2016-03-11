(function(){
    angular
        .module("SheetBuilderApp")
        .controller("SheetDetailController",SheetDetailController);

    function SheetDetailController(SheetDetailsService,$rootScope,$scope){

        $scope.addSheetField = addSheetField;
        $scope.updateSheetField = updateSheetField;
        $scope.deleteSheetField = deleteSheetField;
        $scope.selectSheetField = selectSheetField;


        function addSheetField(field){
            var tempSheet;
            var callback = function(field){
                tempSheet=field;
            };

                SheetDetailsService.createSheetFieldForUser($rootScope.currentsheet,field,callback);
                $scope.field = {};
        }

        function updateSheetField(field){

            var tempSheet;
            var callback = function(field){
                tempSheet = field;
            };
            if($rootScope.currentsheet){
                SheetDetailsService.updateSheetFieldById($rootScope.currentsheet._id,field,callback);
                $scope.field = {};
            }
        }

        function deleteSheetField($index){

            var tempSheets;

            var callback = function(fields){
                tempSheets = fields;
            };

            SheetDetailsService.deleteSheetFieldById($scope.fields[$index]._id,callback);
        }

        function selectSheetField($index){

            $scope.field = {
                _id : $scope.fields[$index]._id,
                title: $scope.fields[$index].title,
                userId: $scope.fields[$index].userId
            };
            $rootScope.currentsheet = $scope.field;


        }

    }

})();