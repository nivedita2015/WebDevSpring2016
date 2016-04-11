(function(){
    angular
        .module("WebBuilderApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html"
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
           .when("/forms",{
                templateUrl: "views/forms/form.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields",{
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/form/:formId/formPreview",{
                templateUrl: "views/forms/formPreview.view.html",
                controller: "formPreviewController",
                controllerAs: "model"
            })
            .when("/field/:fieldId/settings",{
                templateUrl: "views/forms/settings.view.html",
                controller: "SettingsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();