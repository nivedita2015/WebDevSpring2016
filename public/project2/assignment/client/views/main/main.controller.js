
(function()
{
    "use strict"
    angular
        .module("WebBuilderApp")
        .controller("MainController",MainController);
    function MainController($rootScope,$location)
    {
        $rootScope.$location = $location;
    }
})();
