(function() {
    'use strict';

    angular
        .module('app')
        .controller('InterestController', InterestController);

    InterestController.$inject = ['InterestFactory', 'toastr', 'localStorageService', '$state'];

    /* @ngInject */
    function InterestController(InterestFactory, toastr, localStorageService, $state) {
        var vm = this;

        vm.getInterest = function() {
            //console.log(propertyId);
            var user = localStorageService.get('localUserId');
            console.log('logged in', user);
            InterestFactory.getInterest(user)
                .then(
                    function(response) {
                        vm.interestResult = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }
        vm.getInterest();

        //DELETE interest
        vm.removeInterest = function(propertyId, user) {
            var user = localStorageService.get('localUserId');
            InterestFactory.deleteInterest(propertyId, user)
                .then(
                    function(response) {
                    },
                    function(error) {
                      toastr.error('Failure to delete interest!', error);
                    }
                );
        }

    }
})();
