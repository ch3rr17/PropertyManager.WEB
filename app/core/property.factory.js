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
            addProperty: addProperty,
            getProperties: getProperties,
            newInterest: newInterest
        };

        return service;

        function grabProperties(username) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'properties' + '/GetSearchPropertiesByUser?username=' + username
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

        function getProperties(search) {
            console.log(search);
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Properties/SearchProperties',
                    params: {
                        city: search.city,
                        zipCode: search.zipCode,
                        minimumRent: search.minimumRent,
                        maximumRent: search.maximumRent,
                        bedroom: search.bedroom,
                        bathroom: search.bathroom,
                        isPetFriendly: search.isPetFriendly
                    }
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log('SEARCHED PROPERTIES', response);
                        toastr.success("Search match!");

                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error(error);
                    }
                );

            return defer.promise;
        }

        //add a new property
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

        function newInterest(propertyId) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'Properties/' + propertyId + '/Users/' + userId
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        toastr.success("You have added a new interest");
                    },
                    function(error) {
                        defer.reject(error);
                        toastr.error("Failed to add an intrest to a property");
                    }
                );

            return defer.promise;
        }
    }
})();
