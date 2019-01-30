angular.module('yp.controllers').controller('MessagesController', ['$scope', 'Api', '$localStorage',
function($scope, Api, $localStorage) {

    var vm = this;

    vm.messages = [];

    // clear bell badge icon on entering this screen
    $localStorage.hasMessage = false;

    // retrieve all the messages from  server, merged with messages from local storage
    vm.loadMessages = function() {
        Api.getAllMessages().then(function(result) {
            vm.messages = result;
        });
    }

    vm.loadMessages();

}]);