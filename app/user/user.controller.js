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

        vm.login = function() {
            var inputUserName = vm.userName;
            UserFactory.getUser(inputUserName).then(function(response) {
                    vm.userResponse = response.data[0];
                    localStorageService.set("localUserId", vm.userResponse.userId);
                    localStorageService.set("localProperties", vm.userResponse.properties);
                    localStorageService.set("localUserName", vm.userResponse.userName);
                    if (vm.userResponse.isPropertyManager == false) {
                        $state.go('search');
                    } else {
                        $state.go('property');
                    }
                    console.log(vm.userResponse);


                },
                function(error) {
                    if (error.data) {
                        toastr.error('There was a problem: ' + error.data);
                    } else {
                        toastr.info('no data found')
                    }
                }
            )
        }
    }
})();
