(function(){
    angular
        .module("WebBuilderApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
               })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/sheets",{
                templateUrl: "views/sheets/sheets.view.html",
                controller: "SheetController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/components",{
                templateUrl: "views/sheets/components.view.html",
                controller: "ComponentController",
                controllerAs: "model"
            } )
            .otherwise({
                redirectTo:"/home"
            })
    }
})();