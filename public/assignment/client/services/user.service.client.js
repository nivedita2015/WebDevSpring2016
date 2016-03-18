(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http) {
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

            $http.get("/api/assignment/user?username=username",username);
           
        }

        function createUser(user) {

            $http.post("/api/assignment/user",user);

        }

        function findUserByCredentials(username, password) {
            console.log("inside user.service.client.js");

            $http.get("/api/assignment/user?username=alice&password=wonderland",username,password);

        }

        function findAllUsers() {

            $http.get("/api/assignment/user");

        }

        function deleteUserById(userId) {

            //$http.delete("/api/assignment/user/",+userId);
        }

        function updateUser(userId, user) {

            $http.put("/api/assignment/user/"+userId,user);

        }
    }
})();
