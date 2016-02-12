/**
 * Created by Nivi on 10/02/16.
 */
var app = angular.module("MovieDBApp", []);

(function () {
    angular
        .module("MovieDBApp" ,[])
        .controller("MovieListController",MovieListController);

    function MovieListController($scope){
    console.log("Hello from MovieDBApp")
    }
})();