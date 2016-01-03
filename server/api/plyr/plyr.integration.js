'use strict';

var app = require('../..');
var request = require('supertest');

var newPlyr;

describe('Plyr API:', function() {

  describe('GET /api/plyrs', function() {
    var plyrs;

    beforeEach(function(done) {
      request(app)
        .get('/api/plyrs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          plyrs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      plyrs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/plyrs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/plyrs')
        .send({
          name: 'New Plyr',
          info: 'This is the brand new plyr!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPlyr = res.body;
          done();
        });
    });

    it('should respond with the newly created plyr', function() {
      newPlyr.name.should.equal('New Plyr');
      newPlyr.info.should.equal('This is the brand new plyr!!!');
    });

  });

  describe('GET /api/plyrs/:id', function() {
    var plyr;

    beforeEach(function(done) {
      request(app)
        .get('/api/plyrs/' + newPlyr._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          plyr = res.body;
          done();
        });
    });

    afterEach(function() {
      plyr = {};
    });

    it('should respond with the requested plyr', function() {
      plyr.name.should.equal('New Plyr');
      plyr.info.should.equal('This is the brand new plyr!!!');
    });

  });

  describe('PUT /api/plyrs/:id', function() {
    var updatedPlyr

    beforeEach(function(done) {
      request(app)
        .put('/api/plyrs/' + newPlyr._id)
        .send({
          name: 'Updated Plyr',
          info: 'This is the updated plyr!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPlyr = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPlyr = {};
    });

    it('should respond with the updated plyr', function() {
      updatedPlyr.name.should.equal('Updated Plyr');
      updatedPlyr.info.should.equal('This is the updated plyr!!!');
    });

  });

  describe('DELETE /api/plyrs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/plyrs/' + newPlyr._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when plyr does not exist', function(done) {
      request(app)
        .delete('/api/plyrs/' + newPlyr._id)
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
