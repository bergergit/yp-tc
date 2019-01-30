angular.module('yp.directives')

    // Directive that displays the messages. Can be reused in other components if needed
    .directive('ypMessageCard', function () {
        return {
            restrict: 'E',
            scope: {
                message: '='
            },
            controller: ['$scope', 'moment', function MessagesController($scope, moment) {

                $scope.expanded = false;

                // returns string like '5 minutes agora' using moment
                $scope.fromMomentMessage = function(fromMoment) {
                    return moment(fromMoment).fromNow();
                }

                // expands the message and mark it as read
                $scope.toggleMessage = function(message) {
                    message.read = true;
                    $scope.expanded = !$scope.expanded;
                }

            }],
            templateUrl: 'app/directives/messages/message-card.html'
        };
    });