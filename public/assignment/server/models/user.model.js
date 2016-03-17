
var mock = require ("./user.mock.json");

module.exports = function() {

    var api = {

      findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        findAll: findAll,
        findById: findById,
        deleteUser: deleteUser


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

    function findAll(){
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

    function deleteUser(id){

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

    function findUserByCredentials(credentials) {

        for(var i in mock){
            if(mock[i].username==credentials.username
                &&
                mock[i].password == credentials.password){
                return mock[i];
            }
        }
        return null;
    }
};