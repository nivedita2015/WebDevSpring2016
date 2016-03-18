(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $location,$rootScope,$scope) {

        var vm = this;
        vm.login=login;


        function login(user) {
            console.log("inside login.controller.js");
            UserService.findUserByCredentials(user.username,user.password).then(
                function(response){
                    $rootScope.currentUser=response;
                    $location.url("/profile");
                });
        }
    }
    //   $scope.login = login;
    //
    //    function login (user) {
    //        var tempUser;
    //        var callback = function(user){
    //            tempUser=user;
    //        }
    //
    //        UserService.findUserByCredentials(user.username,user.password,callback);
    //        console.log(tempUser);
    //        if (tempUser) {
    //            $rootScope.currentUser = tempUser;
    //            UserService.setCurrentUser(tempUser);
    //            $location.url("/profile");
    //        }
    //        else console.log("Not found");
    //    }
    //}
})();