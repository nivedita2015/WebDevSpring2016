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
        console.log(formId);

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
            console.log("inside select Field");
            vm.field = {_id: vm.fields[$index]._id,
                label: vm.fields[$index].label,
                formId: vm.fields[$index].formId
            }
        }

        function addField(field){
            console.log("field controller");
            console.log(field);
            FieldService.createFieldForForm(vm.currentForm._id, field).then(function(response){
                console.log("printing data " +response.data.label);
                //FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(response){
                //    vm.fields= response.data;
                //});

                init();

            });
            vm.field = null;
        }

        function deleteField(field){
            console.log("delete Field " +field);
            FieldService.deleteFieldById(field._id,vm.currentForm._id).then(function(response){
                FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(response){
                    vm.fields= response.data;
                });
            });
        }

        function updateField(newField){
            FieldService.updateFieldById(vm.currentForm._id,vm.field._id, newField).then(function(response){
                FieldService.findAllFieldsForForm(vm.currentForm._id).then(function(resp){
                    vm.fields= resp.data;
                    vm.field = null;
                });
            });

        }
    }

})();