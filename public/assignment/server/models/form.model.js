
var mock = require ("./form.mock.json");

module.exports = function() {

    var api = {

        findFormByTitle: findFormByTitle,
        createForm: createForm,
        updateForm: updateForm,
        findAll: findAll,
        findById: findById,
        deleteForm: deleteForm


    };
    return api;

    function createForm(form) {
        var new_form = {
            _id: (new Date).getTime(),
            title: form.title,
            userId: form.userId
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

};