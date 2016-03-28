(function(){
    "use strict"
    angular
        .module("WebBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        var vm = this;
        vm.updateUser = updateUser;
        console.log("inside profile controller");
        vm.error = null;
        vm.message = null;

        console.log(UserService.getCurrentUser());

        vm.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function updateUser(user){
            console.log("profile controller update");

            UserService.updateUser(vm.currentUser._id,user).then(
                function (response){
                    UserService.setCurrentUser(vm.currentUser);
                    $location.url("/profile");
                });
        }
    }
})();