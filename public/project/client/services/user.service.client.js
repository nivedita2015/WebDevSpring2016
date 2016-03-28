(function(){
    angular
        .module("WebBuilderApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {
        var api = {

            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            findUserByUsername:findUserByUsername
        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=username",username);
           
        }

        function createUser(user) {

            return $http.post("/api/assignment/user",user);

        }

        function findUserByCredentials(username, password) {
            //console.log("inside user.service.client.js");

            return $http.get("/api/assignment/user?username="+username+"&password="+password);

        }

        function findAllUsers() {

            return $http.get("/api/assignment/user");

        }

        function deleteUserById(userId) {

            //$http.delete("/api/assignment/user/",+userId);
        }

        function updateUser(userId, user) {
            console.log("user service client update");

           return $http.put("/api/assignment/user/"+userId,user);

        }
    }
})();
