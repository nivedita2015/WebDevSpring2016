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
                    templateUrl: "views/sheets/sheets   .view.html",
                    controller: "SheetController"
                })
            .when("/sheetDetails",
                {
                    templateUrl: "views/sheets/sheets.details.view.html",
                    controller: "SheetDetailController"
                })
            .otherwise({
                    redirectTo: "/home"

            });

    }
})();

