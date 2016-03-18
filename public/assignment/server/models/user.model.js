
var mock = require ("./user.mock.json");


module.exports = function() {

    var api = {

      findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        findById: findById,
        deleteUserById: deleteUserById


    };
    return api;

    function createUser(user) {
        var new_user = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            _id: (new Date).getTime()

        };

        mock.push(new_user);
        return mock;
    }

    function findAllUsers(){
        return mock;
    }

    function findById(id){

        for(var i in mock){
            if(mock[i]._id == id){
                return mock[i];
            }
        }
        return null;
    }

    function updateUser(id,user){

        var idx = mock.indexOf(id);
        mock[idx].username = user.username;
        mock[idx].firstName = user.firstName;
        mock[idx].lastName = user.lastName;

        return mock;
    }

    function deleteUserById(id){

        var u = findById(id);
        var idx = mock.indexOf(u);
        mock.splice(idx,1);
        return mock;

    }

    function findUserByUsername(username) {

        for (var i in mock) {

            if(mock[i].username == username){
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username,password) {

        console.log("inside user.model.js");


        for (var u in mock) {

            if ((mock[u].username == username) && (mock[u].password == password)) {

                var user = mock[u];
                return user;
            }
            else {
                return null;
            }

        }
    }
};