"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService)
    {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.addUser    = addUser;
        vm.selectUser = selectUser;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function deleteUser(user)
        {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function updateUser(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function addUser(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function selectUser(user)
        {
            vm.user = angular.copy(user);
        }

        function handleSuccess(response) {
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();