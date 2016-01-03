/**
 * Liveply model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Liveply = require('./liveply.model');
var LiveplyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LiveplyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Liveply.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LiveplyEvents.emit(event + ':' + doc._id, doc);
    LiveplyEvents.emit(event, doc);
  }
}

module.exports = LiveplyEvents;
