
var mock = require ("./form.mock.json");

module.exports = function() {

    var api = {

        findFormByTitle: findFormByTitle,
        findAllFormsForUser:findAllFormsForUser,
        createFormForUser: createFormForUser,
        updateForm: updateForm,
        findAll: findAll,
        findById: findById,
        deleteForm: deleteForm


    };
    return api;

    function createFormForUser(userId,form) {
        var new_form = {
            _id: (new Date).getTime(),
            title: form.title,
            userId: userId
        };

        mock.push(new_form);
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

    function updateForm(id,form){

        var idx = mock.indexOf(id);
        mock[idx].title = form.title;
        return mock;
    }

    function deleteForm(id){

        var u = findById(id);
        var idx = mock.indexOf(u);
        mock.splice(idx,1);
        return mock;
    }

    function findFormByTitle(title) {

        for (var i in mock) {

            if(mock[i].title == title){
                return mock[i];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var a = [];
        for (var f in mock) {
            var i = 0;
            if (mock[f].userId == userId) {
                a[i] = mock[f];
                i++;
            }
        }
        return a;
    }

};