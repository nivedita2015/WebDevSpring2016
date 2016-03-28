(function(){
    "use strict"
    angular
        .module("WebBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.user = null;

        console.log("inside register controller");
        var vm = this;
        vm.register = register;

        function init() {

        }
        init();

        function register(user) {

            if(!user) {

                console.log("no user for registration");
                return;
            }

                UserService
                    .createUser(user)
                    .then(function(response){
                        var resp = response.data;
                        if(resp != null) {
                            UserService.setCurrentUser(user);
                            //UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }
                    });
        }


    }
})();
