(function(){
    angular
        .module("SheetBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($location,$scope) {
        $scope.$location = $location;

    }
})();