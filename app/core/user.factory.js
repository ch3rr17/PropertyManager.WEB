(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function UserFactory($http, $q, toastr, apiUrl) {
        var service = {
            // grabUsers: grabUsers,
            newUser: newUser,
            getUser: getUser
        };

        return service;

        // function grabUsers() {
        //     var defer = $q.defer();
        //     $http({
        //             method: 'GET',
        //             url: apiUrl + 'users',
        //
        //         })
        //         .then(
        //             function(response) {
        //                 defer.resolve(response);
        //                 console.log(response);
        //                 toastr.success('You got users!');
        //             },
        //             function(error) {
        //                 defer.reject(error);
        //                 toastr.error(error);
        //             }
        //         );
        //     return defer.promise;
        // }

        //get properties by landlord filtering by username
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


        //register a new user
        function newUser(user) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'users',
                    data: user
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                        toastr.success('You added a new user!');
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
