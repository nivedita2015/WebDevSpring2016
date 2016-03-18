(function(){
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
            if(!user) {

                console.log("no user for login");
                return;
            }
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