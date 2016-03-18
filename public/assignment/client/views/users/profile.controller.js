(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        var vm = this;
        vm.updateUser = updateUser;

        function updateUser(user){
            UserService.updateUser(user).then(
                function (response){
                    UserService.setCurrentUser($scope.currentUser);
                    $location.url("/profile");
                });
        }
    }
})();