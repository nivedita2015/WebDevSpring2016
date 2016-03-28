(function(){
    "use strict"
    angular
        .module("WebBuilderApp")
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
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/sheets");
                        console.log("all logged in ");
                    }
                });
        }
    }
})();