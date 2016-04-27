(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService($http, $rootScope) {

        var api= {
            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getCurrentUserId: getCurrentUserId
        };

        return api;

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        };

        function deleteUser(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        };

        function updateUser(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        };

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);

        };

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+ username);
        };


        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username="
                +username+"&password=" +password);
        };

        function findAllUsers() {
            var users = $http.get("/api/assignment/admin/user");
            return users;
        };

        function setCurrentUser(user){
            $rootScope.currentUser= user;
        };

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        };
        function getCurrentUserId(){
            return $rootScope.currentUser._id;
        };

        function login(user){
            return $http.post("/api/assignment/login", user);
        };

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function register(user){
            return $http.post("/api/assignment/register", user);
        }
    }
})();