(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['PropertyFactory', 'toastr', 'localStorageService', '$state'];

    /* @ngInject */
    function SearchController(PropertyFactory, toastr, localStorageService, $state) {
        var vm = this;
        vm.searchResults = [];


        vm.searchHandler = function() {
            // var searchString = "city=" + vm.city + "&zipCode=" + vm.zipCode + "&minRent=" + vm.minimumRent + "&maxRent=" + vm.maximumRent + "&bedroom=" + vm.bedroom + "&bathroom=" + vm.bathrooms;
            // console.log(searchString);
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

                        //clears input
                        vm.search = {};
                    },
                    function(error) {
                        toastr.error(error);

                    }
                );
        }

        vm.addInterest = function(propertyId) {
            console.log(propertyId);
            PropertyFactory.newInterest(searchResults.propertyId)
                .then(
                    function(response) {
                        //vm.interest.push(response.data);
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }

    }
})();
