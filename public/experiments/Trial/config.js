(function(){
    angular
        .module("SheetEditorApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/sheet", {
                templateUrl: "view/sheet.list.view.html",
                controller: "SheetListController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId", {
                templateUrl: "view/sheet.details.view.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/preview", {
                templateUrl: "view/sheet.details.preview.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/cell/:cellId", {
                templateUrl: "view/cell.list.view.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/sheet"
            });
    }
})();