angular.module('yp.directives')

    // Directive that displays the messages. Can be reused in other components if needed
    .directive('ypMessages', function () {
        return {
            restrict: 'E',
            scope: {
                messages: '=messages'
            },
            controller: function () {
                // console.log('Messages Directive');

            },
            templateUrl: 'app/messages/messagesDirective.html'
        };
    });