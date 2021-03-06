(function() {
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
            .when("/sheets",
                {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    controllerAs: "model"
                })
            //.when("/fields",
            //    {
            //        templateUrl: "views/sheets/components.view.html",
            //        controller: "FieldController",
            //        controllerAs: "model"
            //
            //    })

            //.otherwise({
            //        redirectTo: "/home"
            //
            //});

    }
})();

