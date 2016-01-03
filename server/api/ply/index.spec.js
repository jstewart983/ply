'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var plyCtrlStub = {
  index: 'plyCtrl.index',
  show: 'plyCtrl.show',
  create: 'plyCtrl.create',
  update: 'plyCtrl.update',
  destroy: 'plyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var plyIndex = proxyquire('./index.js', {
  'express': {
    Router: function(){
      return routerStub;
    }
  },
  './ply.controller': plyCtrlStub
});

describe('Ply API Router:', function() {

  it('should return an express router instance', function() {
    plyIndex.should.equal(routerStub);
  });

  describe('GET /api/plys', function() {

    it('should route to ply.controller.index', function() {
      routerStub.get
        .withArgs('/', 'plyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/plys/:id', function() {

    it('should route to ply.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'plyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/plys', function() {

    it('should route to ply.controller.create', function() {
      routerStub.post
        .withArgs('/', 'plyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/plys/:id', function() {

    it('should route to ply.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'plyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/plys/:id', function() {

    it('should route to ply.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'plyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/plys/:id', function() {

    it('should route to ply.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'plyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
