(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    PropertyController.$inject = ['PropertyFactory', 'toastr', 'localStorageService', 'LocalStorageFactory', '$state'];

    /* @ngInject */
    function PropertyController(PropertyFactory, toastr, localStorageService, LocalStorageFactory, $state) {
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
                        console.log(user);
                        if (user = null) {
                            toastr.warning("Please log in!");
                            $state.go('register');

                        } else {
                            vm.properties = response.data;
                            console.log(response.data);
                        }
                        vm.showForm = false;
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

        //update a property
        vm.editProperty = function(properties) {
            // var id = properties.propertyId;
            // console.log(id);
            PropertyFactory.updateProperty(properties)
                .then(
                    function(response) {
                        //vm.properties.push(response);
                        console.log('UPDATED PROPERTIES', response);
                        //console.log('properties update controller', response.squareFootage);
                        // vm.properties.forEach(function(element) {
                        //     if (response.propertyId == element.propertyId) {
                        //         console.log('PROP ELEMENT', element);
                        //         element.propertyName = response.propertyName;
                        //         element.address1 = response.address1;
                        //         element.address2 = response.address2;
                        //         element.city = response.city;
                        //         element.state = response.state;
                        //         element.zipCode = response.zipCode;
                        //         element.contactPhone = response.contactPhone;
                        //         element.rent = response.rent;
                        //         element.squareFootage = parseInt(response.squareFootage);
                        //         element.isPetFriendly = response.isPetFriendly;
                        //         element.leaseTerm = response.leaseTerm;
                        //         element.bedroom = response.bedroom;
                        //         element.bathroom = response.bathroom;
                        //         element.propertyImage = response.propertyImage;
                        //     }
                        // });
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }

        //delete a property
        vm.removeProperty = function(id, index) {
            PropertyFactory.deleteProperty(id)
                .then(
                    function(response) {
                        vm.properties.splice(index, 1);
                    },
                    function(error) {
                        toastr.error('failure to delete property', error);
                    }
                );
        }


        //logOut user
        vm.logOut = function() {
            $state.go('search');
            LocalStorageFactory.clear();
            toastr.success("You have logged out of your properties");
        }
    }

})();
