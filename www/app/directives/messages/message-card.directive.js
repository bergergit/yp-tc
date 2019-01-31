angular.module('yp.directives')

    // Directive that displays the messages. Can be reused in other components if needed
    .directive('ypMessageCard', function () {
        return {
            restrict: 'E',
            scope: {
                message: '='
            },
            controller: ['$scope', 'moment', '$localStorage',
            function MessagesController($scope, moment, $localStorage) {

                $scope.expanded = false;

                // returns string like '5 minutes agora' using moment
                $scope.fromMomentMessage = function(fromMoment) {
                    return moment(fromMoment).fromNow();
                }

                // expands the message and mark it as read
                $scope.toggleMessage = function(message) {
                    // decrease number of unread messages
                    if (!message.read) $localStorage.newMessages = Math.max($localStorage.newMessages - 1, 0);
                    message.read = true;
                    $scope.expanded = !$scope.expanded;
                }

            }],
            templateUrl: 'app/directives/messages/message-card.html'
        };
    });