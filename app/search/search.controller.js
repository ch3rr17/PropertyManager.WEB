(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['PropertyFactory', 'toastr', 'localStorageService', 'LocalStorageFactory', '$state'];

    /* @ngInject */
    function SearchController(PropertyFactory, toastr, localStorageService, LocalStorageFactory, $state) {
        var vm = this;
        vm.searchResults = [];

        //vm.showSearchForm = false;
        //vm.loadResults = true;

        //Search properties
        vm.searchHandler = function() {
            var user = localStorageService.get('localUserName');
            console.log('logged in', user);
            PropertyFactory.getProperties(vm.search)
                .then(
                    function(response) {
                        //$state.go('searchDetails');
                        vm.searchResults = response.data;
                        console.log(response.data);
                        // $state.go('searchDetails', {
                        //     searchResults: search
                        // }, {
                        //     reload: true
                        // });

                        //hide search form after search populates
                        //vm.loadResults = false;

                        //clears input
                        vm.search = {};
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
            PropertyFactory.getUser(inputUserName).then(function(response) {
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

        //add an interest to a property
        vm.addInterest = function(propertyId) {
            //console.log(propertyId);
            var interest = {
                "UserId": localStorageService.get('localUserId'),
                "PropertyId": propertyId
            };
            PropertyFactory.newInterest(interest)
                .then(
                    function(response) {
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }

        //logOut user
        vm.logOut = function() {
            $state.go('search');
            LocalStorageFactory.clear();
            toastr.success("You have logged out of your properties");
        }

    }
})();
