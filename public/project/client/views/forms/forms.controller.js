(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService,UserService){
        var vm = this;

        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;

        vm.currentUser = UserService.getCurrentUser();

        function init(){
            FormService.findAllFormsForUser(vm.currentUser._id).then(function(response){
                    vm.forms= response.data;
            });}
        init();

        function selectForm($index){
            vm.form = {_id: vm.forms[$index]._id,
                title: vm.forms[$index].title,
                userId: vm.forms[$index].userId
            }
        }

        function addForm(form){
            FormService.createFormForUser(vm.currentUser._id, form).then(function(response){
                    FormService.findAllFormsForUser(vm.currentUser._id).then(function(response){
                            vm.forms= response.data;
                    });
            });
            vm.form = null;
        }

        function deleteForm(form){
            FormService.deleteFormById(form._id).then(function(response){
                    FormService.findAllFormsForUser(vm.currentUser._id).then(function(response){
                            vm.forms= response.data;
                        });
                });
        }

        function updateForm(newForm){
            FormService.updateFormById(vm.form._id, newForm).then(function(response){
                    FormService.findAllFormsForUser(vm.currentUser._id).then(function(resp){
                            vm.forms= resp.data;
                            vm.form = null;
                        });
                });

        }
    }

})();