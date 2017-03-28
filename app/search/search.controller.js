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

                        //clears input
                        vm.search = {};
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
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

    }
})();
