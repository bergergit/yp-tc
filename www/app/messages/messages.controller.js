angular.module('yp.controllers').controller('MessagesController', ['$scope',
function($scope) {

    var vm = this;

    vm.messages = ['message1', 'message2', 'message3'];

}]);