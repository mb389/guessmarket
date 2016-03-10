'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    },
    tags: [String],
    closedTrades: [Number]
});

mongoose.model('Event', schema);
