/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/plys              ->  index
 * POST    /api/plys              ->  create
 * GET     /api/plys/:id          ->  show
 * PUT     /api/plys/:id          ->  update
 * DELETE  /api/plys/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Ply = require('./ply.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

// Gets a list of Plys
exports.index = function (req, res) {
  Ply.findAsync().then(responseWithResult(res))['catch'](handleError(res));
};

exports.index_owner = function (req, res) {
  console.log(req.params.id);
  Ply.findAsync({ admin: req.params.id }).then(responseWithResult(res))['catch'](handleError(res));
};

// Gets a list of Plys
exports.index_public = function (req, res) {
  Ply.findAsync({ activeFlag: true }).then(responseWithResult(res))['catch'](handleError(res));
};

// Gets a single Ply from the DB
exports.show = function (req, res) {
  Ply.findByIdAsync(req.params.id).execAsync() // no 'Async' suffix for model statics except for execAsync()
  .then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));
};
// Gets a single Ply from the DB
exports.show_public = function (req, res) {
  Ply.findByIdAsync(req.params.id).execAsync() // no 'Async' suffix for model statics except for execAsync()
  .then(handleEntityNotFound(res)).then(responseWithResult(res))['catch'](handleError(res));
};

// Creates a new Ply in the DB
exports.create = function (req, res) {
  Ply.createAsync(req.body).then(responseWithResult(res, 201))['catch'](handleError(res));
};

// Updates an existing Ply in the DB
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Ply.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(responseWithResult(res))['catch'](handleError(res));
};

// Updates an existing Ply in the DB
exports.update_public = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Ply.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(function (ply) {
    ply.plyrs.push({ username: req.body.username });
    ply.save(function (err) {
      if (err) return res.sendStatus(500);
      res.sendStatus(200);
    });
  }).then(responseWithResult(res))['catch'](handleError(res));
};

// Deletes a Ply from the DB
exports.destroy = function (req, res) {
  Ply.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
};
//# sourceMappingURL=ply.controller.js.map
