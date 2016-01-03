'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _authAuthService = require('../../auth/auth.service');

var _authAuthService2 = _interopRequireDefault(_authAuthService);

var express = require('express');
var controller = require('./ply.controller');

var router = express.Router();

router.get('/', _authAuthService2['default'].hasRole('admin'), controller.index);
router.get('/mine/:id', _authAuthService2['default'].hasRole('user'), controller.index_owner);
router.get('/join', controller.index_public);
router.get('/:id', _authAuthService2['default'].hasRole('user'), controller.show);
router.get('/join/:id', controller.show_public);
router.post('/', _authAuthService2['default'].hasRole('user'), controller.create);
router.put('/join/:id', controller.update_public);
router.put('/:id', _authAuthService2['default'].hasRole('user'), controller.update);
router.patch('/:id', _authAuthService2['default'].hasRole('user'), controller.update);
router['delete']('/:id', _authAuthService2['default'].hasRole('user'), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
