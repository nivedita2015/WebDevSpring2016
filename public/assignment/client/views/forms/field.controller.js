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
        vm.sortFields = sortFields;
        vm.fields = [];
        vm.fieldType = null;
        
        var formId = $routeParams.formId;
        var fieldTypes =
            [
                {
                    fieldOption: "singleText",
                    heading: "Single Line Text Field",
                    type: "TEXT",
                    template:
                    {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
                },
                {
                    fieldOption: "paragraphTextField",
                    heading: "Multi Line Text Field",
                    type: "TEXT AREA",
                    template:
                    {"label": "New Text Field", "type": "TEXT AREA", "placeholder": "New Field"}
                },
                {
                    fieldOption: "date",
                    heading: "Date Field",
                    type: "DATE",
                    template:{"label": "New Date Field", "type": "DATE"}
                },
                {
                    fieldOption: "dropDown",
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
                    fieldOption: "checkBoxes",
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
                    fieldOption: "radioButtons",
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
            var newFieldTemplate = findFieldType(vm.fieldType);
            FieldService
                .createFieldForForm(vm.currentForm._id, newFieldTemplate)
                .then(init);
            vm.fieldType = null;
        };

        function removeField(field){
            FieldService
                .deleteFieldFromForm(vm.currentForm._id, field._id)
                .then(init);
        };

        function editField(field){
            vm.field = field;
            vm.modalHeading = findHeading(vm.field);
            if(vm.field.type == "OPTIONS"
                || vm.field.type == "CHECKBOXES"
                || vm.field.type == "RADIOS"){
                var editedOptions = [];
                var poss=[];
                poss = vm.field.options;
                for (var index in poss) {
                    editedOptions.push(poss[index].label + ":" + poss[index].value);
                }
                vm.newOptions = editedOptions;
            }
        };

        function updateField(field){
            vm.field = field;
            if (vm.field.type == "OPTIONS"
                || vm.field.type == "CHECKBOXES"
                || vm.field.type == "RADIOS") {
                var newOptions=[];
                var enteredOptions = vm.newOptions;
                for(var index in enteredOptions){
                    newOptions.push
                    ({
                        "label": enteredOptions[index].split(":")[0],
                        "value": enteredOptions[index].split(":")[1],
                    });
                }
                vm.field.options = newOptions;
            }
            FieldService
                .updateField(vm.currentForm._id, vm.field._id, vm.field)
                .then(init);
        }

        function findFieldType(fieldType){
            for (var index in fieldTypes){
                if(fieldTypes[index].fieldOption== fieldType){
                    return fieldTypes[index].template;
                }}};

        function findHeading(field){
            for(var index in fieldTypes){
                if(fieldTypes[index].type == field.type){
                    return fieldTypes[index].heading;
                }
            }
        };

        function sortFields(start, end) {
            FieldService.sortFields(formId, start, end)
                .then(function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }

})();