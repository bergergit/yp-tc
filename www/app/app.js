// Global app configuration
angular.module('yp', [
  'ionic',
  'ngCachedResource',
  'ngStorage',
  'angularMoment',
  'yp.controllers',
  'yp.directives',
  'yp.api'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/app.html',
        controller: 'AppCtrl',
        controllerAs: 'vm'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'navContent': {
            templateUrl: 'app/home/home.html'
          }
        }
      })

      .state('app.messages', {
        url: '/messages',
        views: {
          'navContent': {
            controller: 'MessagesController',
            controllerAs: 'vm',
            templateUrl: 'app/messages/messages.html'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  })

  // stores environment config variables
  .constant('env', {
    apiURL: ionic.Platform.isWebView() ? 'http://myremoteserver.com/api' : 'http://localhost:3000/api'
  });
