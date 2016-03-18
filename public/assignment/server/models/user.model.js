
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
       // console.log(user);
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        //return user;
        return mock;
    }

    function findAllUsers(){
       // console.log("inside findAllUsers");
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

       // console.log("inside model updateUser");
       // console.log(mock);

        for( var i in mock){
            if(mock[i]._id==id){
                mock[i].firstName=user.firstName;
                mock[i].lastName=user.lastName;
            }
        }

        return mock;


    }

    function deleteUserById(id){

        var u = findById(id);
        for(var i in mock){
            if(mock[i]._id==id){
                mock.splice(i,1);
                return mock;
            }
        }

    }

    function findUserByUsername(username) {

        for (var i in mock) {

            if(mock[i].username == username){
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(cred) {

        //console.log(cred.username);
        for (var u in mock) {
            if ((mock[u].username == cred.username) && (mock[u].password == cred.password)) {
                var user = mock[u];
                return user;
            }
        }
    }
};