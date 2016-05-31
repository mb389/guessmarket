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


mongoose.model('Event', schema);
