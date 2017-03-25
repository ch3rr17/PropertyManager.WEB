(function() {
    'use strict';

    angular
        .module('app')
        .factory('PropertyFactory', PropertyFactory);

    PropertyFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function PropertyFactory($http, $q, toastr, apiUrl) {
        var service = {
            grabProperties: grabProperties,
            addProperty: addProperty
        };

        return service;

        function grabProperties() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'properties'
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        toastr.success("We've got properties");
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error(error);
                    }
                );

            return defer.promise;

        }

        function addProperty(newProp) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'properties',
                    data: newProp
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        toastr.success("You've added a new property");
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error(error);
                    }
                );

            return defer.promise;

        }
    }
})();
