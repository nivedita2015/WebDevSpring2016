(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.user = null;
        $scope.register = register;

        var vm = this;

        function register(user) {
            vm.message = null;

            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            if(!user.email){
                vm.message="Please provide an email";
                return;
            }

            UserService.findUserByCredentials(user.username,user.password).then(
                function(response){
                    UserService.createUser(vm.user);
                    UserService.setCurrentUser(vm.user);
                    $location.url("/profile");
                }, function (response){
                    vm.message="User already exists";
                });
        }
    }
})();
