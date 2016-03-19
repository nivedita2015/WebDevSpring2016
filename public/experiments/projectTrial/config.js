(function() {
    angular
        .module("SheetBuilderApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            .when("/sheets",
                {
                    templateUrl: "views/sheets/sheets.view.html",
                    controller: "SheetController"
                })
            .when("/sheetDetails",
                {
                    templateUrl: "views/sheetsDetails/sheets.details.view.html",
                    controller: "SheetDetailController"
                })
            .when("/fields",
                {
                    templateUrl: "views/sheets/fields1.view.html",
                    controller: "FieldController"
                })
            .when("/sheetPreview",
                {
                    templateUrl: "views/sheets/preview.view.html",

                })
            .otherwise({
                    redirectTo: "/home"

            });

    }
})();

