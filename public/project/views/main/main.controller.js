
(function()
{
    angular
        .module("WebPageBuilderApp")
        .controller("MainController",MainController);
    function MainController($rootScope,$location)
    {
        $rootScope.$location = $location;
    }
})();
