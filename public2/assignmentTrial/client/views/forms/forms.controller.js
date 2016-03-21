(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService,UserService){

        var vm = this;
        vm.error= null;
        
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        
        vm.currentUser = UserService.getCurrentUser();

        function init(){
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                    vm.forms= response.data;
                });
        }
        init();

        function addForm(form){
            FormService
                .createFormForUser(vm.currentUser._id, form)
                .then(function(response){
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            vm.forms= resp.data;
                        });
                });
            vm.form = null;
        }

        function deleteForm(form){
           
            var finalForms=[];
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            console.log(resp.data);
                            vm.forms= resp.data;
                        });});}

        function updateForm(newForm){
            FormService
                .updateFormById(vm.form._id, newForm)
                .then(function(response){
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            vm.forms= resp.data;
                            });
                });
            vm.form=null;

        }

        function selectForm($index){
            vm.form = {
                _id: vm.forms[$index]._id,
                title: vm.forms[$index].title,
                userId: vm.forms[$index].userId
            };
            FormService.setCurrentForm(vm.form);
        }
    }

})();
