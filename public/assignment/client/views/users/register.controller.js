(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {

        console.log("inside register controller");

        var vm = this;

        vm.register = register;

        function init() {

        }

        init();

        function register(user) {

            console.log("inside register");
            UserService
                .createUser(user)
                .then(function(newUser){
                    if(newUser) {
                        UserService.setCurrentUser(newUser.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();
