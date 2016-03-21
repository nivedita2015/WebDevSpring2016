(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService, $routeParams){

        var vm = this;
        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;
        vm.open = open;
        vm.cancel = cancel;

        var formId = $routeParams.formId;
        var diffFields =
            [
                {
                    FieldType: "TEXT",
                    style:
                    {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
                },
                {
                    FieldType: "TEXTAREA",
                    style:
                    {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
                },
                {
                    FieldType: "DATE",
                    style:{"_id": null, "label": "New Date Field", "type": "DATE"}
                },
                {
                    FieldType: "DROPDOWN",
                    style:
                    {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]}},
                {
                    FieldType: "CHECKBOXES",
                    style:
                    {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]}},
                {
                    FieldType: "RADIOS",
                    style:
                    {"_id": null, "label": "New Radio Buttons", "type": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]}}];

        function init(){
            FieldService
                .findMyForm(formId)
                .then(function(response){
                    vm.currentForm = response.data;
                    FieldService
                        .getFieldsForForm(vm.currentForm._id)
                        .then(function(response){
                            vm.fields=(response.data);
                        });
                });
        }
        init();

        function open(){
            console.log("showing modal");
            vm.showModal = true;
        }

        function cancel(){
            console.log("closing modal");
            vm.showModal = false;
        }

        function ok(){
            console.log("ok modal");
            vm.cancel();
        }

        function updateView(formId){
            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    vm.fields = response.data;
                });
        }
        function addField(fieldType){
            for (var index in diffFields){
                if(diffFields[index].FieldType=== fieldType){
                    var new_Field=diffFields[index].style;
                }
            }
            FieldService
                .createFieldForForm(vm.currentForm._id, new_Field)
                .then(function(response){
                    vm.fields.push(response.data);
                });

        };

        function removeField(field){
            console.log("inside removerField");
            FieldService
                .deleteFieldFromForm(vm.currentForm._id,field._id)
                .then(function(response){
                vm.fields = response.data;

            });

        }

        function editField(field){
            console.log("inside editField");
            vm.field = field;
            var newField;
            var fieldType = field.type
            if(fieldType == "TEXT" || fieldType == "TEXTAREA"){

                 newField = {
                    _id : vm.field._id,
                    label: vm.field.label,
                    placeholder: vm.field.placeholder
                }

                return newField;
            }
            else if (fieldType == "DATE"){
                 newField = {
                    _id : vm.field._id,
                    label: vm.field.label
                }

                return newField;

            }
            else if (fieldType == "OPTIONS" || fieldType == "CHECKBOXES" || fieldType == "RADIOS") {
                newField = {
                    _id: vm.field._id,
                    label: vm.field.label,
                    options: vm.field.options
                }

                return newField;
            }
        };

}})();