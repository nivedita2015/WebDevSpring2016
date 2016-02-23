(function()
{
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("#/home",
                    {
                        templateUrl: "home/home.view.html",
                        controller: "home.controller"
                    })
                .when("#/register",
                    {
                        templateUrl: "views/users/register.view.html",
                        controller: "register.controller"
                    })
                .when("#/login",
                    {
                        templateUrl: "views/users/login.view.html",
                        controller: "login.controller"
                    })
                .when("#/profile",
                    {
                        templateUrl: "views/users/profile.view.html",
                        controller: "profile.controller"
                    })
                .when("#/register",
                    {
                        templateUrl: "views/admin/admin.view.html",
                        controller: "admin.controller"
                    })

        });
})();