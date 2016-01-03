'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PlySchema = new Schema({
  name: String,
  info: String,
  activeFlag: { type: Boolean, 'default': true },
  inactiveFlag: { type: Boolean, 'default': false },
  lockedFlag: { type: Boolean, 'default': true },
  admin: String,
  timeStart: { type: Date },
  timeEnd: { type: Date },
  team: [{ name: String }, { members: [{ username: String }] }],
  plyrs: [{ username: String }],
  responses: [{ response: String, team: String, username: String }]
});

module.exports = mongoose.model('Ply', PlySchema);
//# sourceMappingURL=ply.model.js.map
