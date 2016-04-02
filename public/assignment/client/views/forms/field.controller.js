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
        vm.updateField = updateField;
        vm.fields = [];
        vm.fieldType = null;
        var formId = $routeParams.formId;
        var fieldTypes =
            [
                {
                    option: "singleText",
                    heading: "Single Line Text Field",
                    type: "TEXT",
                    template:
                    {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
                },
                {
                    option: "paragraphTextField",
                    heading: "Multi Line Text Field",
                    type: "TEXTAREA",
                    template:
                    {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
                },
                {
                    option: "date",
                    heading: "Date Field",
                    type: "DATE",
                    template:{"label": "New Date Field", "type": "DATE"}
                },
                {
                    option: "dropDown",
                    heading: "Dropdown Field",
                    type: "OPTIONS",
                    template:
                    { "label": "New Dropdown", "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    }
                },
                {
                    option: "checkBoxes",
                    heading: "Checkbox Field",
                    type: "CHECKBOXES",
                    template:
                    {"label": "New Checkboxes", "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    }
                },
                {
                    option: "radioButtons",
                    heading: "Radio Button Field",
                    type: "RADIOS",
                    template:
                    {"label": "New Radio Buttons", "type": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    }
                }
            ];

        function init(){
            FieldService
                .getMyForm(formId)
                .then(function(response){
                    vm.currentForm = response.data;
                    FieldService
                        .getFieldsForForm(vm.currentForm._id)
                        .then(function(response){
                            vm.fields= response.data;
                        });
                });
        }
        init();

        function addField(fieldType){
            vm.fieldType = fieldType;
            for (var index in fieldTypes){
                if(fieldTypes[index].option== fieldType){
                    var newFieldTemplate = fieldTypes[index].template;
                }
            }
            FieldService
                .createFieldForForm(vm.currentForm._id, newFieldTemplate)
                .then(FieldService
                    .findForm(formId)
                    .then(function(response){
                        vm.currentForm = response.data;
                        FieldService
                            .getFieldsForForm(vm.currentForm._id)
                            .then(function(response){
                                vm.fields= response.data;
                            });
                    })
        );
            vm.fieldType = null;
        };

        function editField(field){
            vm.field = field;
            for(var index in fieldTypes){
                if(fieldTypes[index].type == vm.field.type){
                    vm.modalHeading = fieldTypes[index].heading;
                }
            }
            if(vm.field.type == "OPTIONS" || vm.field.type == "CHECKBOXES" || vm.field.type == "RADIOS"){
                var editedOptions = [];
                var opts= vm.field.options;
                for (var index in opts) {
                    editedOptions.push(opts[index].label + ":" + opts[index].value);
                }
                vm.newOpt = editedOptions.join("\n");
            }
        };

        function updateField(field){
            vm.field = field;
            if (vm.field.type == "OPTIONS" || vm.field.type == "CHECKBOXES" || vm.field.type == "RADIOS") {
                var newOpt=[];
                var enteredOptions = vm.newOpt;
                for(var index in enteredOptions){
                    newOpt.push
                    ({
                        "label": enteredOptions[index].split(":")[0],
                        "value": enteredOptions[index].split(":")[1],
                    });
                }
                vm.field.options = newOpt;
            }
            FieldService
                .updateField(vm.currentForm._id, vm.field._id, vm.field)
                .then(function(response){
                    vm.fields = response.data;
                });
        }

        function removeField(field){
            FieldService
                .deleteFieldFromForm(vm.currentForm._id, field._id)
                .then(FieldService
                    .getMyForm(formId)
                    .then(function(response){
                        vm.currentForm = response.data;
                        FieldService
                            .getFieldsForForm(vm.currentForm._id)
                            .then(function(response){
                                vm.fields= response.data;
                            });
                    }));

        };

    }

})();
