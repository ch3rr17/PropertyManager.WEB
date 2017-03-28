(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', 'toastr', 'localStorageService', '$state'];

    /* @ngInject */
    function UserController(UserFactory, toastr, localStorageService, $state) {
        var vm = this;

        //adds or registers a new user
        //if they register as a landlord, it should route to the properties propertyImage
        //if they register as a tenant, it should route them to the search page
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
                    }
                );
        }

        //login as a user
        //if they login as a landlord, it should route them to the property page
        //if they login as a tenant, it should route them to the search page to search properties
        vm.login = function() {
            var inputUserName = vm.userName;
            UserFactory.getUser(inputUserName).then(function(response) {
                    vm.userResponse = response.data[0];
                    localStorageService.set("localUserId", vm.userResponse.userId);
                    localStorageService.set("localProperties", vm.userResponse.properties);
                    localStorageService.set("localUserName", vm.userResponse.userName);
                    console.log(vm.userResponse);
                    console.log('USERNAME:', vm.userResponse.userName);
                    if (vm.userResponse.isLandlord == false) {
                        console.log(vm.userResponse);
                        $state.go('search');
                    } else {
                        $state.go('property');
                    }
                },
                function(error) {
                    if (error.data) {
                        toastr.error('Please login with your username: ' + error);
                    } else {
                        toastr.info('no data found')
                    }
                }
            )
        }
    }
})();
