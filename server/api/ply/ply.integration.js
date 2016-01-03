'use strict';

var app = require('../..');
var request = require('supertest');

var newPly;

describe('Ply API:', function() {

  describe('GET /api/plys', function() {
    var plys;

    beforeEach(function(done) {
      request(app)
        .get('/api/plys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          plys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      plys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/plys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/plys')
        .send({
          name: 'New Ply',
          info: 'This is the brand new ply!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPly = res.body;
          done();
        });
    });

    it('should respond with the newly created ply', function() {
      newPly.name.should.equal('New Ply');
      newPly.info.should.equal('This is the brand new ply!!!');
    });

  });

  describe('GET /api/plys/:id', function() {
    var ply;

    beforeEach(function(done) {
      request(app)
        .get('/api/plys/' + newPly._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          ply = res.body;
          done();
        });
    });

    afterEach(function() {
      ply = {};
    });

    it('should respond with the requested ply', function() {
      ply.name.should.equal('New Ply');
      ply.info.should.equal('This is the brand new ply!!!');
    });

  });

  describe('PUT /api/plys/:id', function() {
    var updatedPly

    beforeEach(function(done) {
      request(app)
        .put('/api/plys/' + newPly._id)
        .send({
          name: 'Updated Ply',
          info: 'This is the updated ply!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPly = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPly = {};
    });

    it('should respond with the updated ply', function() {
      updatedPly.name.should.equal('Updated Ply');
      updatedPly.info.should.equal('This is the updated ply!!!');
    });

  });

  describe('DELETE /api/plys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/plys/' + newPly._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ply does not exist', function(done) {
      request(app)
        .delete('/api/plys/' + newPly._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
