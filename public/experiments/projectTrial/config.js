(function() {
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            //.when("/register",
            //    {
            //        templateUrl: "views/users/register1.view.html",
            //        controller: "RegisterController"
            //    })
            //.when("/login",
            //    {
            //        templateUrl: "views/users/login1.view.html",
            //        controller: "LoginController"
            //    })
            //.when("/profile",
            //    {
            //        templateUrl: "views/users/profile1.view.html",
            //        controller: "ProfileController"
            //    })
            .when("/sheets",
                {
                    templateUrl: "views/sheets/sheets.view.html",
                    controller: "SheetController"
                })
            .when("/forms",
                {
                    templateUrl: "views/sheets/sheets.view.html",
                    controller: "FormController"
                })
            //.when("/fields",
            //    {
            //        templateUrl: "views/forms/fields.view.html",
            //
            //    })
            .otherwise({
                    redirectTo: "/home"

            });

    }
})();

