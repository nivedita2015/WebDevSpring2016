(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        var vm = this;
        vm.updateUser = updateUser;
        console.log("inside profile controller");
        vm.error = null;
        vm.message = null;

        console.log(UserService.getCurrentUser());

        vm.currentUser = UserService.getCurrentUser();
        if (!vm.currentUser) {
            $location.url("/home");
        }

        function updateUser(user){
            console.log("profile controller update");

            UserService.updateUser(vm.currentUser._id,user).then(
                function (response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();