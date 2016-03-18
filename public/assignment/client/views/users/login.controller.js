(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $location) {
        console.log("inside login controller");

        var vm = this;
        vm.login=login;

        function init() {
        }
        init();

        //function login(user) {
        //    console.log("inside login.controller.js");
        //    UserService.findUserByCredentials(user.username,user.password).then(
        //        function(response){
        //            $rootScope.currentUser=response;
        //            $location.url("/profile");
        //        });
        //}

        function login(user) {
            if(!user) {

                console.log("no user for login");
                return;
            }
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                        console.log("all logged in ");
                    }
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