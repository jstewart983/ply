'use strict';

angular.module('plyappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeContrl',
        controllerAs: 'home',
        authenticate: 'user'
      });
  });
