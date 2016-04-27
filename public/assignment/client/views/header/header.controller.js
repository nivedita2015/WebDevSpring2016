(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);
    function headerController($scope, $location, UserService){
        $scope.$location = $location;
        $scope.logout = logout;
        function logout(){
            UserService
                .logout()
                .then(function(){
                    console.log("logout fired");
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                })
        }
    }
})();