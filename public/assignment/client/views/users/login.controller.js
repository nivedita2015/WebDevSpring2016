(function(){
    "use strict"
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

        function login(user) {

            console.log("inside login");

            if(!user) {

                console.log("no user for login");
                return;
            }

            console.log("user found. going ahead");
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                        console.log("all logged in ");
                    }
                });
        }
    }
})();