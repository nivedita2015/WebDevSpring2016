(function(){
    angular
        .module("SheetBuilderApp")
        .controller("SheetController",SheetController);

    function SheetController(SheetService,$location,$rootScope,$scope){

        $scope.addsheet = addsheet;
        $scope.updatesheet = updatesheet;
        $scope.deletesheet = deletesheet;
        $scope.selectsheet = selectsheet;


        function addsheet(sheet){
            var tempsheet;
            var callback = function(sheet){
               tempsheet=sheet;
            };
            if(sheet){
                SheetService.createsheetForUser(sheet,callback);
                $scope.sheet = {};
            }
            else {
                return null;
            }
        }

        function updatesheet(sheet){

            var tempsheet;
            var callback = function(sheet){
                tempsheet = sheet;
            };
            if($rootScope.currentsheet){
                SheetService.updatesheetById($rootScope.currentsheet._id,sheet,callback);
                $scope.sheet = {};
            }
        }

        function deletesheet($index){

            var tempsheets;

            var callback = function(sheets){
                tempsheets = sheets;
            };

            SheetService.deletesheetById($scope.sheets[$index]._id,callback);
        }

        function selectsheet($index){

            $scope.sheet = {
                _id : $scope.sheets[$index]._id,
                title: $scope.sheets[$index].title,
                userId: $scope.sheets[$index].userId
            };
            $rootScope.currentsheet = $scope.sheet;


        }

    }

})();