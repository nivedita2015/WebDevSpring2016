(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById
        };
        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function createUser(user, callback) {
            var new_user = {
                username: user.username,
                password: user.password,
                _id: (new Date).getTime()

            };
            model.users.push(new_user);
            callback(new_user);
        }

        function findUserByCredentials(username, password, callback) {

            for (var u in model.users) {

                if ((model.users[u].username == username) && (model.users[u].password == password)) {

                    var user = model.users[u];
                    callback(user);
                    break;
                }
                else {
                    console.log("nothing found");
                }

            }
        }

        function findAllUsers(callback) {
            callback(model.users);
        }

        function deleteUserById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    var temp = model.users[u];
                     model.users.pop(temp);
                    callback(model.users);
                }
            }
        }

        function updateUser(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    var newUser = model.users[u];
                    newUser.firstName = user.firstName;
                    newUser.lastName = user.lastName;
                    callback(newUser);

                }
            }
        }
    }
})();
