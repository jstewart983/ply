/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiThingThingModel = require('../api/thing/thing.model');

var _apiThingThingModel2 = _interopRequireDefault(_apiThingThingModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

var _apiPlyPlyModel = require('../api/ply/ply.model');

var _apiPlyPlyModel2 = _interopRequireDefault(_apiPlyPlyModel);

_apiThingThingModel2['default'].find({}).removeAsync().then(function () {
  _apiThingThingModel2['default'].create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' + 'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

_apiUserUserModel2['default'].find({}).removeAsync().then(function () {
  _apiUserUserModel2['default'].createAsync({
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    console.log('finished populating users');
  });
});

_apiPlyPlyModel2['default'].find({}).removeAsync().then(function () {
  _apiPlyPlyModel2['default'].createAsync({
    name: 'speed ply',
    admin: 'admin@example.com',
    activeFlag: true,
    inactiveFlag: false,
    lockedFlag: true,
    team: [{ name: 'tiger', members: [{ username: 'jstewart983' }] }, { name: 'lion', members: [{ username: 'sarah.stewart813' }] }, { name: 'bear' }],
    info: 'this is a ply that is text as fast as you can',
    plyrs: [{ username: 'jstewart983' }, { username: 'sarah.stewart813' }],
    responses: [{ team: 'tiger', response: 'yo', username: 'jstewart983' }, { team: 'lion', response: 'yo', username: 'sarah.stewart813' }]
  }, {
    name: 'Tic Tac Toe',
    admin: 'admin@example.com',
    activeFlag: true,
    inactiveFlag: false,
    lockedFlag: true,
    team: [{ name: 'tiger', members: [{ username: 'jstewart983' }] }, { name: 'lion', members: [{ username: 'sarah.stewart813' }] }, { name: 'bear' }],
    info: 'this is a ply that is text as fast as you can',
    plyrs: [{ username: 'jstewart983' }, { username: 'sarah.stewart813' }, { username: 'dude' }],
    responses: [{ team: 'tiger', response: 'yo', username: 'jstewart983' }, { team: 'lion', response: 'yo', username: 'sarah.stewart813' }]
  }, {
    name: 'Three in a row',
    admin: 'jstewart983',
    activeFlag: true,
    inactiveFlag: false,
    lockedFlag: true,
    team: [{ name: 'tiger', members: [{ username: 'jstewart983' }] }, { name: 'lion', members: [{ username: 'sarah.stewart813' }] }, { name: 'bear' }],
    info: 'this is a ply that is text as fast as you can',
    plyrs: [{ username: 'jstewart983' }, { username: 'sarah.stewart813' }],
    responses: [{ team: 'tiger', response: 'yo', username: 'jstewart983' }, { team: 'lion', response: 'yo', username: 'sarah.stewart813' }]
  }, {
    name: 'Dude',
    admin: 'jstewart983',
    activeFlag: false,
    inactiveFlag: false,
    lockedFlag: true,
    team: [{ name: 'tiger', members: [{ username: 'jstewart983' }] }, { name: 'lion', members: [{ username: 'sarah.stewart813' }] }, { name: 'bear' }],
    info: 'this is a ply that is text as fast as you can',
    plyrs: [{ username: 'jstewart983' }, { username: 'sarah.stewart813' }],
    responses: [{ team: 'tiger', response: 'yo', username: 'jstewart983' }, { team: 'lion', response: 'yo', username: 'sarah.stewart813' }]
  }).then(function () {
    console.log('finished populating plys');
  });
});
//# sourceMappingURL=seed.js.map
