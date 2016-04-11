(function()
{
    "use strict"
    angular
        .module("WebBuilderApp")
        .controller("SidebarController",SidebarController);
    function SidebarController($location, $scope) {
        $scope.$location = $location;

}});