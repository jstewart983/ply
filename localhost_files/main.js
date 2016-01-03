'use strict';

angular.module('plyappApp').config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  });
});
//# sourceMappingURL=main.js.map
