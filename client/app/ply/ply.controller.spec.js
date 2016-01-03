'use strict';

describe('Controller: PlyCtrl', function () {

  // load the controller's module
  beforeEach(module('plyappApp'));

  var PlyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlyCtrl = $controller('PlyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
