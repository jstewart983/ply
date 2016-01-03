/**
 * Plyr model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Plyr = require('./plyr.model');
var PlyrEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlyrEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Plyr.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PlyrEvents.emit(event + ':' + doc._id, doc);
    PlyrEvents.emit(event, doc);
  };
}

module.exports = PlyrEvents;
//# sourceMappingURL=plyr.events.js.map
