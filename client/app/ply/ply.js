'use strict';

angular.module('plyappApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ply', {
        templateUrl: 'app/ply/ply.html',
        controller: 'PlyCtrl'
      });
  });
