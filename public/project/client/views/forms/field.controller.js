(function(){
    "use strict";
    angular
        .module("WebBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,FormService,$routeParams){
        var vm = this;

        vm.addField = addField;
        vm.deleteField = deleteField;
        vm.updateField = updateField;
        vm.selectField = selectField;

        var formId = $routeParams.formId;
        //function init(){
        //    console.log("inside init for fields");
        //    FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(response){
        //        vm.fields= response.data;
        //    });}
        //init();

        function init(){
            FieldService.findMyForm(formId).then(function(response){
                    vm.currentForm = response.data;
                    console.log(vm.currentForm);
                    FieldService.getFieldsForForm(vm.currentForm._id)
                        .then(function(response){
                            vm.fields=(response.data);
                        });
                });
        }
        init();

        function selectField($index){
            vm.field = {_id: vm.fields[$index]._id,
                title: vm.fields[$index].title,
                formId: vm.fields[$index].formId
            }
        }

        function addField(field){
            FieldService.createFieldForForm(vm.currentForm._id, field).then(function(response){
                FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(response){
                    vm.fields= response.data;
                });
            });
            vm.field = null;
        }

        function deleteField(field){
            FieldService.deleteFieldById(field._id).then(function(response){
                FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(response){
                    vm.fields= response.data;
                });
            });
        }

        function updateField(newField){
            FieldService.updateFieldById(vm.field._id, newField).then(function(response){
                FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(resp){
                    vm.fields= resp.data;
                    vm.field = null;
                });
            });

        }
    }

})();