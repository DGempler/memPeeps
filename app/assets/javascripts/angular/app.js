var app = angular.module('memPeeps', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  // $locationProvider.html5Mode(true);

  // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/index.html',
      controller: 'indexController'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);