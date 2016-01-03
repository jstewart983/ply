'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var liveplyCtrlStub = {
  index: 'liveplyCtrl.index',
  show: 'liveplyCtrl.show',
  create: 'liveplyCtrl.create',
  update: 'liveplyCtrl.update',
  destroy: 'liveplyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var liveplyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './liveply.controller': liveplyCtrlStub
});

describe('Liveply API Router:', function() {

  it('should return an express router instance', function() {
    liveplyIndex.should.equal(routerStub);
  });

  describe('GET /api/liveplys', function() {

    it('should route to liveply.controller.index', function() {
      routerStub.get
        .withArgs('/', 'liveplyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/liveplys/:id', function() {

    it('should route to liveply.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'liveplyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/liveplys', function() {

    it('should route to liveply.controller.create', function() {
      routerStub.post
        .withArgs('/', 'liveplyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/liveplys/:id', function() {

    it('should route to liveply.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'liveplyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/liveplys/:id', function() {

    it('should route to liveply.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'liveplyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/liveplys/:id', function() {

    it('should route to liveply.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'liveplyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
