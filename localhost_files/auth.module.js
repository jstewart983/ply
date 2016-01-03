'use strict';

angular.module('plyappApp.auth', ['plyappApp.constants', 'plyappApp.util', 'ngCookies', 'ngRoute']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
