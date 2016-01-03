'use strict';

angular.module('plyappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/join', {
        templateUrl: 'app/join/join.html',
        controller: 'JoinCtrl',
        controllerAs: 'join'
      });
  });
