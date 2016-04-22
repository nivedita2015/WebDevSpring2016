(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {
        var api = {

            login:login,
            logout:logout,
            register:register,
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            findUserByUsername:findUserByUsername,
            findUserById: findUserById,
            getCurrentUserId: getCurrentUserId

        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function getCurrentUserId() {
            return $rootscope.currentUser._id;
        }

        function login(){
            console.log("inside client service login");
            return $http.post("/api/assignment/login", user);
        };

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function register(){
            return $http.post("/api/assignment/register", user);
        }


        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=username",username);
           
        }

        function findUserByCredentials(username, password) {
            console.log("FuBc client service");
            return $http.get("/api/assignment/user?username="+username+"&password="+password);

        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/" + userId);

        };

        function findAllUsers() {

            return $http.get("/api/assignment/user");

        }

        function deleteUserById(userId) {

            $http.delete("/api/assignment/user/",+userId);
        }

        function updateUser(userId, user) {
           return $http.put("/api/assignment/user/"+userId,user);

        }

        function createUser(user) {
            console.log("client service creat user");
            return $http.post("/api/assignment/user",user);
        }


    }
})();
