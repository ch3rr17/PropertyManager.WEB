(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    Controller.$inject = ['PropertyFactory', 'toastr'];

    /* @ngInject */
    function Controller(PropertyFactory, toastr) {
        var vm = this;

    }
})();
