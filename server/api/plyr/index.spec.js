'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var plyrCtrlStub = {
  index: 'plyrCtrl.index',
  show: 'plyrCtrl.show',
  create: 'plyrCtrl.create',
  update: 'plyrCtrl.update',
  destroy: 'plyrCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var plyrIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './plyr.controller': plyrCtrlStub
});

describe('Plyr API Router:', function() {

  it('should return an express router instance', function() {
    plyrIndex.should.equal(routerStub);
  });

  describe('GET /api/plyrs', function() {

    it('should route to plyr.controller.index', function() {
      routerStub.get
        .withArgs('/', 'plyrCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/plyrs/:id', function() {

    it('should route to plyr.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'plyrCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/plyrs', function() {

    it('should route to plyr.controller.create', function() {
      routerStub.post
        .withArgs('/', 'plyrCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/plyrs/:id', function() {

    it('should route to plyr.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'plyrCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/plyrs/:id', function() {

    it('should route to plyr.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'plyrCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/plyrs/:id', function() {

    it('should route to plyr.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'plyrCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
