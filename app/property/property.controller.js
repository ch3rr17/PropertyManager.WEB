(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    PropertyController.$inject = ['PropertyFactory', 'toastr', 'localStorageService'];

    /* @ngInject */
    function PropertyController(PropertyFactory, toastr, localStorageService) {
        var vm = this;

        vm.showForm = false;

        //get properties for landlord
        vm.getProperties = function() {
            //console.log(username);
            //console.log(localStorageService);
            var user = localStorageService.get('localUserName');
            console.log(user);
            PropertyFactory.grabProperties(user)
                .then(
                    function(response) {
                        vm.properties = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }

        vm.getProperties();


        //add a new property
        vm.newProperty = function() {
            var newProp = {
                userId: localStorageService.get('localUserId'),
                propertyName: vm.properties.propertyName,
                address1: vm.properties.address1,
                address2: vm.properties.address2,
                city: vm.properties.city,
                state: vm.properties.state,
                zipCode: vm.properties.zipCode,
                contactPhone: vm.properties.contactPhone,
                rent: vm.properties.rent,
                squareFootage: vm.properties.squareFootage,
                leaseTerm: vm.properties.leaseTerm,
                bedroom: vm.properties.bedroom,
                bathroom: vm.properties.bathroom,
                propertyImage: vm.properties.propertyImage,
                isPetFriendly: vm.properties.isPetFriendly
            }
            console.log(newProp);
            //console.log('localUserId')
            PropertyFactory.addProperty(newProp)
                .then(
                    function(response) {
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error("can't add new property");
                    }
                );
        }
    }

})();
