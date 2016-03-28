(function(){
    angular
        .module("WebBuilderApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
               })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
               })

            .when("/forms",{
                templateUrl: "views/forms/form.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields",{
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            } )
            .otherwise({
                redirectTo:"/home"
            })
    }
})();