'use strict';

(function () {

  angular.module('plyappApp.auth').run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      var query = typeof next.authenticate === 'string' ? Auth.hasRole : Auth.isLoggedIn;

      query(1, 2).then(function (good) {
        if (!good) {
          event.preventDefault();
          Auth.isLoggedIn().then(function (is) {
            $location.path(is ? '/' : '/login');
          });
        }
      });
    });
  });
})();
//# sourceMappingURL=router.decorator.js.map
