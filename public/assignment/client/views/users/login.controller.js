(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){
        var vm = this;
        vm.login = login;
        vm.message = null;
        function init(){

        }
        init();

        function login(user){
            if(!user){
                vm.error="Please enter the credentials";
                return;
            }
            if(!user.username){
                vm.error="Please enter the username";
                return;
            }
            if(!user.password){
                vm.error="Please enter the password";
                return;
            }else {
                UserService
                    .login(user)
                    .then(function (response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }else{
                            vm.error="Please check your credentials";
                        }
                    });
            }
        }
    }
})();