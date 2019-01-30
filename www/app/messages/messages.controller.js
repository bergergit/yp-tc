angular.module('yp.controllers').controller('MessagesController', ['$scope', 'Api',
function($scope, Api) {

    var vm = this;

    vm.messages = [];

    // retrieve all the messages from  server, merged with messages from local storage
    vm.loadMessages = function() {
        Api.getAllMessages().then(function(result) {
            vm.messages = result;
        });
    }

    vm.loadMessages();

}]);