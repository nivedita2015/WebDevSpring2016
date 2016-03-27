(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .controller("SheetController", SheetController);

    function SheetController(SheetService,UserService){
        var vm = this;

        vm.addSheet = addSheet;
        vm.deleteSheet = deleteSheet;
        vm.updateSheet = updateSheet;
        vm.selectSheet = selectSheet;

        vm.currentUser = UserService.getCurrentUser();

        function init(){
            SheetService.findAllSheetsForUser(vm.currentUser._id).then(function(response){
                    vm.sheets= response.data;
            });}
        init();

        function selectSheet($index){
            vm.sheet = {_id: vm.sheets[$index]._id,
                title: vm.sheets[$index].title,
                userId: vm.sheets[$index].userId
            }
        }

        function addSheet(sheet){
            SheetService.createSheetForUser(vm.currentUser._id, sheet).then(function(response){
                    SheetService.findAllSheetsForUser(vm.currentUser._id).then(function(response){
                            vm.sheets= response.data;
                    });
            });
            vm.sheet = null;
        }

        function deleteSheet(sheet){
            SheetService.deleteSheetById(sheet._id).then(function(response){
                    SheetService.findAllSheetsForUser(vm.currentUser._id).then(function(response){
                            vm.sheets= response.data;
                        });
                });
        }

        function updateSheet(newSheet){
            SheetService.updateSheetById(vm.sheet._id, newSheet).then(function(response){
                    SheetService.findAllSheetsForUser(vm.currentUser._id).then(function(resp){
                            vm.sheets= resp.data;
                            vm.sheet = null;
                        });
                });

        }
    }

})();