'use strict';

angular.module('plyappApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/logout', {
        name: 'logout',
        referrer: '/',
        template: 'app/account/login/login.html',
        controller: function($location, $route, Auth) {
          var referrer = $route.current.params.referrer ||
                          $route.current.referrer ||
                          '/login';
          Auth.logout();
          $location.path(referrer);
        }
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: 'user'
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
        next.referrer = current.originalPath;
      }
    });
  });
