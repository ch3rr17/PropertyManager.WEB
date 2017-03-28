(function() {
    'use strict';

    angular
        .module('app')
        .factory('InterestFactory', InterestFactory);

    InterestFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function InterestFactory($http, $q, toastr, apiUrl) {
        var service = {
            getInterest: getInterest,
            deleteInterest: deleteInterest
        };

        return service;

        //Get interest for user
        function getInterest(user) {
          console.log(user);
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Properties' + '/SearchInterests/' + user
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        toastr.success("Your interest list.");
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error("Failed to list interests!");
                    }
                );

            return defer.promise;
        }

        //DELETE interest
        function deleteInterest(propertyId, user) {
            var defer = $q.defer();
            $http({
                    method: 'DELETE',
                    url: apiUrl + 'Interests/' + propertyId + '/Interests/' + user
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log('You deleted an Interest!', response);
                        toastr.success('DELETED INTEREST');
                    },
                    function(error) {
                        $log.error(error);
                        toastr.error('FAILURE TO DELETE AN INTEREST!');
                    }
                );

            return defer.promise;
        }
    }
})();
