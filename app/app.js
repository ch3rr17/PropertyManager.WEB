(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'xeditable',
            'toastr',
            'LocalStorageModule'
        ])

        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('search');

            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'app/user/register.html',
                controller: 'UserController as vm'
            })

            $stateProvider.state('search', {
                url: '/search',
                templateUrl: 'app/search/search.html',
                controller: 'SearchController as vm'
            })

            $stateProvider.state('searchdetails', {
                url: '/searchdetails',
                templateUrl: 'app/search/search.grid.html',
                controller: 'SearchDetailController as vm'
            })

            $stateProvider.state('property', {
                url: '/property',
                templateUrl: 'app/property/property.grid.html',
                controller: 'PropertyController as vm'
            })

            $stateProvider.state('property.detail', {
                url: '/property-detail',
                templateUrl: 'app/property/property.detail.html',
                controller: 'PropertyDetailController as vm'
            })

            $stateProvider.state('interests', {
                url: '/interests',
                templateUrl: 'app/interest/interest.html',
                controller: 'InterestController as vm'
            })

        })

        .run(function(editableOptions) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        })

        .value('apiUrl', 'http://localhost:50255/api/');
})();
