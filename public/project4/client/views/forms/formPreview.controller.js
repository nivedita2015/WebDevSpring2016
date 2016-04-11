(function() {
    "use strict";
    angular
        .module("WebBuilderApp")
        .controller("formPreviewController", formPreviewController);

    function formPreviewController(FieldService, $routeParams) {
        var vm = this;
        var formId = $routeParams.formId;
        vm.currentLocation = 'preview';
        console.log(vm.currentLocation);

        function init() {
            FieldService.findMyForm(formId).then(function (response) {
                vm.currentForm = response.data;
                console.log(vm.currentForm);
                FieldService.getFieldsForForm(vm.currentForm._id)
                    .then(function (response) {
                        vm.fields = (response.data);
                    });
            });
        }

        init();
    }
})();