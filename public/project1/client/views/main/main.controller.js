
(function()
{
    angular
        .module("SheetBuilderApp")
        .controller("MainController",MainController);
    function MainController($rootScope,$location)
    {
        $rootScope.$location = $location;
    }
})();
