(function(){
    angular
        .module("SheetEditorApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/sheet", {
                templateUrl: "views/sheet/sheet.list.view.html",
                controller: "SheetListController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId", {
                templateUrl: "views/cells/sheet.details.view.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/preview", {
                templateUrl: "views/cells/sheet.details.preview.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/cell/:cellId", {
                templateUrl: "views/cells/cell.list.view.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home",
                templateUrl : "views/home/home.html"
            });
    }
})();