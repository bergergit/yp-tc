angular.module('yp.controllers').controller('MessagesController', ['Api',
function(Api) {

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