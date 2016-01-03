'use strict';

var express = require('express');
var controller = require('./ply.controller');
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('admin'),controller.index);
router.get('/mine/:id', auth.hasRole('user'),controller.index_owner);
router.get('/join', controller.index_public);
router.get('/:id',auth.hasRole('user'),controller.show);
router.get('/join/:id', controller.show_public);
router.post('/',auth.hasRole('user'),controller.create);
router.put('/join/:id', controller.update_public);
router.put('/:id',auth.hasRole('user'), controller.update);
router.patch('/:id',auth.hasRole('user'),controller.update);
router.delete('/:id',auth.hasRole('user'),controller.destroy);

module.exports = router;
