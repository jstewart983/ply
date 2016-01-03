'use strict';

var app = require('../..');
var request = require('supertest');

var newLiveply;

describe('Liveply API:', function () {

  describe('GET /api/liveplys', function () {
    var liveplys;

    beforeEach(function (done) {
      request(app).get('/api/liveplys').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        liveplys = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      liveplys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/liveplys', function () {
    beforeEach(function (done) {
      request(app).post('/api/liveplys').send({
        name: 'New Liveply',
        info: 'This is the brand new liveply!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newLiveply = res.body;
        done();
      });
    });

    it('should respond with the newly created liveply', function () {
      newLiveply.name.should.equal('New Liveply');
      newLiveply.info.should.equal('This is the brand new liveply!!!');
    });
  });

  describe('GET /api/liveplys/:id', function () {
    var liveply;

    beforeEach(function (done) {
      request(app).get('/api/liveplys/' + newLiveply._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        liveply = res.body;
        done();
      });
    });

    afterEach(function () {
      liveply = {};
    });

    it('should respond with the requested liveply', function () {
      liveply.name.should.equal('New Liveply');
      liveply.info.should.equal('This is the brand new liveply!!!');
    });
  });

  describe('PUT /api/liveplys/:id', function () {
    var updatedLiveply;

    beforeEach(function (done) {
      request(app).put('/api/liveplys/' + newLiveply._id).send({
        name: 'Updated Liveply',
        info: 'This is the updated liveply!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedLiveply = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedLiveply = {};
    });

    it('should respond with the updated liveply', function () {
      updatedLiveply.name.should.equal('Updated Liveply');
      updatedLiveply.info.should.equal('This is the updated liveply!!!');
    });
  });

  describe('DELETE /api/liveplys/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      request(app)['delete']('/api/liveplys/' + newLiveply._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when liveply does not exist', function (done) {
      request(app)['delete']('/api/liveplys/' + newLiveply._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=liveply.integration.js.map
