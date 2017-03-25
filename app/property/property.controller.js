(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    PropertyController.$inject = ['PropertyFactory', 'toastr', 'localStorageService'];

    /* @ngInject */
    function PropertyController(PropertyFactory, toastr, localStorageService) {
        var vm = this;



        //get properties for landlord
        vm.getProperties = function() {
            var user = localStorageService.get('localUserId');
            console.log(localStorageService);

            PropertyFactory.grabProperties()
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
            // var user = LocalStorageFactory.getKey('savedUser');
            // console.log(user);
            // var user = localStorageService.get('localUserId');
            // console.log(user);

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
                        //console.log('new property', vm.newProperty);
                        //vm.property.push(response.data);
                        //vm.newProp = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        toastr.error("can't add new property");
                    }
                );
        }
    }

})();
