(function(){
    angular
        .module("SheetBuilderApp")
        .controller("SheetController",SheetController);

    function SheetController(SheetService,$location,$rootScope,$scope){

        $scope.addSheet = addSheet;
        $scope.deleteSheet = deleteSheet;
        $scope.selectSheet = selectSheet;


        function addSheet(sheet){
            var tempSheet;
            var callback = function(sheet){
                tempSheet=sheet;
            };

                SheetService.createSheetForUser(sheet,callback);
                $scope.sheet = {};

            }

        function deleteSheet($index){

            var tempSheets;

            var callback = function(sheets){
                tempSheets = sheets;
            };

            SheetService.deleteSheetById($scope.sheets[$index].sheetId,callback);
        }

        function selectSheet($index){

            $scope.sheet = {
                _id : $scope.sheets[$index]._id,
                title: $scope.sheets[$index].title,
                userId: $scope.sheets[$index].userId
            };
            $rootScope.currentsheet = $scope.sheet;
        }

    }

})();