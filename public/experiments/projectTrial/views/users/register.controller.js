(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.user = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            var tempUser;
            var callback = function(user){
                tempUser = user;
            }
            UserService.findUserByCredentials(user.username,user.password,callback);
            if (tempUser != null) {
                console.log("already exists");
                $scope.message = "User already exists";
                return;
            }
            else{
                UserService.createUser($scope.user,callback);
                UserService.setCurrentUser(tempUser);
                $location.url("/profile");
            }

        }
    }
})();
