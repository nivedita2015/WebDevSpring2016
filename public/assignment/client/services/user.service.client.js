(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
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
            findUserByUsername:findUserByUsername,
            findUserById: findUserById,
            getCurrentUserId: getCurrentUserId

        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function getCurrentUserId() {
            return $rootscope.currentUser._id;
        }

        function findUserByUsername(username){

            return $http.get("/api/assignment/user?username=username",username);
           
        }

        function findUserByCredentials(username, password) {

            console.log("find user by cred user client service");

            return $http.get("/api/assignment/user?username="+username+"&password="+password);

        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/" + userId);

        };


        function createUser(user) {

            console.log("inside create user service");

            return $http.post("/api/assignment/user",user);

        }



        function findAllUsers() {

            return $http.get("/api/assignment/user");

        }

        function deleteUserById(userId) {

            $http.delete("/api/assignment/user/",+userId);
        }

        function updateUser(userId, user) {
            console.log("user service client update");

           return $http.put("/api/assignment/user/"+userId,user);

        }
    }
})();
