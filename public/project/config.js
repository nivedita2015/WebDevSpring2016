(function() {
    angular
        .module("WebPageBuilderApp")
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
                    controller: "SheetsController"
                });

    }
})();

