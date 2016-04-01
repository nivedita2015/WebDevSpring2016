(function() {
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $routeParams) {

        var vm = this;
        vm.addField = addField;
        vm.deleteField = deleteField;
        vm.editField = editField;
        vm.updateField = updateField;

        var formId = $routeParams.formId;
        var fieldTypes =
            [
                {
                    name: "singleText",
                    heading: "Single Line Text Field",
                    type: "TEXT",
                    template: {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
                },
                {
                    name: "paragraphTextField",
                    heading: "Multi Line Text Field",
                    type: "TEXTAREA",
                    template: {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
                },
                {
                    name: "date",
                    heading: "Date Field",
                    type: "DATE",
                    template: {"_id": null, "label": "New Date Field", "type": "DATE"}
                },
                {
                    name: "dropDown",
                    heading: "Dropdown Field",
                    type: "OPTIONS",
                    template: {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    }
                },
                {
                    name: "checkBoxes",
                    heading: "Checkbox Field",
                    type: "CHECKBOXES",
                    template: {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    }
                },
                {
                    name: "radioButtons",
                    heading: "Radio Button Field",
                    type: "RADIOBUTTONS",
                    template: {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOBUTTONS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    }
                }
            ];

        function init() {
            FieldService
                .findForm(formId)
                .then(function (response) {
                    vm.currentForm = response.data;
                    FieldService
                        .getFieldsForForm(vm.currentForm._id)
                        .then(function (response) {
                            vm.fields = (response.data);
                        });
                });
        }

        init();

        function addField(fieldType) {
            var newTemplate;
            for (var index in fieldTypes) {
                if (fieldTypes[index].fieldType === fieldType) {
                    newTemplate  = fieldTypes[index].template;
                }
                break;
            }
            FieldService
                .createFieldForForm(vm.currentForm._id, newTemplate)
                .then(function (response) {
                    vm.fields = response.data;
                });

        };

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(vm.currentForm._id, field._id)
                .then(function (response) {
                    vm.fields = response.data;
                });
        };

        function editField(field) {
            vm.field = field;
            for (var index in fieldTypes) {
                if (fieldTypes[index].type == field.type) {
                    vm.modalHeading =  fieldTypes[index].heading;
                }
                break;
            }
            if (vm.field.type == "OPTIONS" || vm.field.type == "CHECKBOXES" || vm.field.type == "RADIOBUTTONS") {
                var newVals = [];
                var poss = vm.field.options;
                for (var index in poss) {
                    newVals.push(poss[index].label + ":" + poss[index].value);
                }
                vm.updatedOptionValues = newVals.join("\n");
            }
        };

        function updateField(field) {
            vm.field = field;
            if (vm.field.type == "OPTIONS" || vm.field.type == "CHECKBOXES" || vm.field.type == "RADIOBUTTONS") {
                var updatedOptionValues = [];
                var enteredOptions = vm.updatedOptionValues;
                for (var index in enteredOptions) {
                    updatedOptionValues.push
                    ({
                        "label": enteredOptions[index].split(":")[0],
                        "value": enteredOptions[index].split(":")[1],
                    });
                }
                vm.field.options = updatedOptionValues;
            }
            FieldService
                .updateField(vm.currentForm._id, vm.field._id, vm.field)
                .then(function (response) {
                    vm.fields = response.data;
                });
        }
    }
})();
