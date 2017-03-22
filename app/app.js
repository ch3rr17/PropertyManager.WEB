(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'toastr',
            'LocalStorageModule'
        ]);

    .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('search');

            $stateProvider.state('search', {
                url: '/search',
                templateUrl: 'app/search/search.html',
                controller: 'SearchController as vm'
            })

            $stateProvider.state('search.grid', {
                url: '/search',
                templateUrl: 'app/search/search.grid.html',
                controller: 'SearchController as vm'
            })


        })

        .value('apiUrl', 'http://localhost:50255/api/');
})();
