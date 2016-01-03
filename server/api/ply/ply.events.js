/**
 * Ply model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Ply = require('./ply.model');
var PlyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ply.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PlyEvents.emit(event + ':' + doc._id, doc);
    PlyEvents.emit(event, doc);
  };
}

module.exports = PlyEvents;
//# sourceMappingURL=ply.events.js.map
