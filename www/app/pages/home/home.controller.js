angular.module('yp.controllers').controller('HomeController', ['$state', '$localStorage',
    function ($state, $localStorage) {

        var vm = this;

        vm.$storage = $localStorage;
        vm.goToMessages = function () {
            $state.go('app.messages');
        }

    }]);