(function(){
    "use strict"
    angular
        .module("WebBuilderApp")
        .controller("ComponentController",ComponentController);

    function ComponentController(ComponentService, $routeParams){

        var vm = this;
        vm.addComponent = addComponent;
        vm.removeComponent = removeComponent;
        vm.editComponent = editComponent;
        vm.open = open;
        vm.cancel = cancel;

        var formId = $routeParams.formId;
        var diffComponents =
            [
                {
                    ComponentType: "TEXT",
                    style:
                    {"_id": null, "label": "New Text Component", "type": "TEXT", "placeholder": "New Component"}
                },
                {
                    ComponentType: "TEXTAREA",
                    style:
                    {"_id": null, "label": "New Text Component", "type": "TEXTAREA", "placeholder": "New Component"}
                },
                {
                    ComponentType: "DATE",
                    style:{"_id": null, "label": "New Date Component", "type": "DATE"}
                },
                {
                    ComponentType: "DROPDOWN",
                    style:
                    {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]}},
                {
                    ComponentType: "CHECKBOXES",
                    style:
                    {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]}},
                {
                    ComponentType: "RADIOS",
                    style:
                    {"_id": null, "label": "New Radio Buttons", "type": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]}}];

        function init(){
            ComponentService
                .findMyForm(formId)
                .then(function(response){
                    vm.currentForm = response.data;
                    ComponentService
                        .getComponentsForForm(vm.currentForm._id)
                        .then(function(response){
                            vm.components=(response.data);
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
            ComponentService
                .getComponentsForForm(formId)
                .then(function(response){
                    vm.components = response.data;
                });
        }
        function addComponent(componentType){
            for (var index in diffComponents){
                if(diffComponents[index].ComponentType=== componentType){
                    var new_Component=diffComponents[index].style;
                }
            }
            ComponentService
                .createComponentForForm(vm.currentForm._id, new_Component)
                .then(function(response){
                    vm.components.push(response.data);
                });

        };

        function removeComponent(component){
            console.log("inside removerComponent");
            ComponentService
                .deleteComponentFromForm(vm.currentForm._id,component._id)
                .then(function(response){
                vm.components = response.data;

            });

        }

        function editComponent(component){
            console.log("inside editComponent");
            vm.component = component;
            var newComponent;
            var componentType = component.type
            if(componentType == "TEXT" || componentType == "TEXTAREA"){

                 newComponent = {
                    _id : vm.component._id,
                    label: vm.component.label,
                    placeholder: vm.component.placeholder
                }

                return newComponent;
            }
            else if (componentType == "DATE"){
                 newComponent = {
                    _id : vm.component._id,
                    label: vm.component.label
                }

                return newComponent;

            }
            else if (componentType == "OPTIONS" || componentType == "CHECKBOXES" || componentType == "RADIOS") {
                newComponent = {
                    _id: vm.component._id,
                    label: vm.component.label,
                    options: vm.component.options
                }

                return newComponent;
            }
        };

}})();