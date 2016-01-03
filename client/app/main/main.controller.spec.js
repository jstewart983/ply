'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('plyappApp'));
  beforeEach(module('socketMock'));

  var scope;
  var MainController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/plys')
      .respond(['yup', 'this', 'is', 'a','ply']);

    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should attach a list of plys to the controller', function() {
    $httpBackend.flush();
    expect(MainController.awesomeThings.length).toBe(4);
  });
});
