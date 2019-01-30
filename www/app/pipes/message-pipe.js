// filters the message until a <br> is found. If no <br> is found, returns the entire message
angular.module('yp').filter('summary', function () {
    return function (input) {
        var brIndex = input ? input.indexOf('<br') : -1;
        if (brIndex !== -1) {
            return input.substring(0, brIndex) + '...';
        }
        return input;
    }
})