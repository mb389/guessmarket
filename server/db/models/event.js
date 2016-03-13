'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
      type: String,
      required: true
    },
    desc: {
        type: String
    },
    tags: [String],
    choices: Object
});

// schema.statics.findOrCreateEvent = function(path) {
//   var self=this;
//   return this.findOne({ path: path })
//   .then(function(event) {
//     if (event) return event;
//
//   }), function(){
//     self.create({
//       name: path,
//       path: path,
//       choices: {
//         Trump: [],
//         Clinton: [],
//         Cruz: [],
//         Rubio: [],
//         Sanders: []
//       }
//   }).then(function(newEvent) {
//       return newEvent;
//   })
//   }
// };

mongoose.model('Event', schema);
