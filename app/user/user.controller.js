(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', 'toastr', 'localStorageService', '$state'];

    /* @ngInject */
    function UserController(UserFactory, toastr, localStorageService, $state) {
        var vm = this;

        vm.getUsers = function() {
            UserFactory.grabUsers()
                .then(
                    function(response) {
                        vm.users = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }
        vm.getUsers();

        vm.addUser = function(user) {
            UserFactory.newUser(user)
                .then(
                    function(response) {
                        if (user.isLandlord == true) {
                            $state.go('property');
                        } else {
                            $state.go('search');
                        }
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error(error);
                        $state.go('search');
                    }
                );
        }
    }
})();
