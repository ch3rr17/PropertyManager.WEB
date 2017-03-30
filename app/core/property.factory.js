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
            getUser: getUser,
            addProperty: addProperty,
            getProperties: getProperties,
            updateProperty: updateProperty,
            deleteProperty: deleteProperty,
            newInterest: newInterest
        };

        return service;

        //Grabs landlord's properties
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

        //get props by landlord
        function getUser(username) {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: apiUrl + 'Properties/GetSearchPropertiesByUser',
                    params: {
                        userName: username
                    }
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                    },
                    function(error) {
                        defer.reject(error);
                    }
                );

            return defer.promise;
        }

        //Search properties, passing custom params
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

        //add an interest to a property
        function newInterest(interest) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'interests',
                    data: interest
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

        //update a property
        function updateProperty(properties) {
            console.log('updateProperty', properties);
            var defer = $q.defer();
            $http({
                    method: 'PUT',
                    url: apiUrl + 'properties/' + properties.propertyId,
                    data: properties
                })
                .then(
                    function(response) {
                        defer.resolve(response.config.data);
                        console.log(response.config.data);
                        toastr.success("You have update a property");
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );

            return defer.promise;
        }

        //Delete property
        function deleteProperty(id) {
            var defer = $q.defer();
            $http({
                    method: 'DELETE',
                    url: apiUrl + 'properties/' + id
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log('you deleted a property', response);
                        toastr.success('DELETED PROPERTY');
                    },
                    function(error) {
                        toastr.error(error);
                        toastr.error('FAILURE TO DELETE PROPERTY!!');
                    }
                );

            return defer.promise;
        }
    }
})();
