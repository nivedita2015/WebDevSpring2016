(function() {
    "use strict";
    angular
        .module("WebBuilderApp")
        .controller("formPreviewController", formPreviewController);

    function formPreviewController(FieldService, $routeParams) {
        var vm = this;
        var formId = $routeParams.formId;
        console.log(formId);

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