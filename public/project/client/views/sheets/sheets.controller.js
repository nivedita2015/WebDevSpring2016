(function(){
    "use strict"
    angular
        .module("SheetBuilderApp")
        .controller("SheetController",SheetController);

    function SheetController(SheetService,$rootScope,$scope){

        var vm = this;

        vm.addSheet = addSheet;
        vm.deleteSheet = deleteSheet;
        vm.updateSheet = updateSheet;
        vm.selectSheet = selectSheet;

        function init(){
            SheetService.findAllSheets.then(function (response){
                vm.sheets = response.data;
            });
        }

        init();

        function selectSheet($index){

            vm.sheet = {
                _id : $scope.sheets[$index]._id,
                title: $scope.sheets[$index].title,
                userId: $scope.sheets[$index].userId
            };
        }


        function addSheet(sheet){
            SheetService.createSheet(sheet).then(function (response){
                init();
            });
            vm.sheet = null;
            }

        function deleteSheet(sheet){
            SheetService.deleteSheetById(sheet.sheetId).then(function(response){
                vm.sheets = response.data;
            });
        }

        function updateSheet(newSheet){
            SheetService.updateSheetById(vm.sheet._id,newSheet).then(function (response){
                init();
            });
            vm.sheet = null;
        }
    }

})();