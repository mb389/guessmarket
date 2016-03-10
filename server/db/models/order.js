'use strict';
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var schema = new mongoose.Schema({
    // event: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Event',
    //     required: true
    // },
    // type: {
    //     type: String,
    //     enum: ["buy","sell"],
    //     required: true
    // },
    // shares: {
    //   type: Number,
    //   required: true
    // },
    // price: {
    //   type: Number,
    //   required: true
    // },
    // status: {
    //   enum: ["open","closed"],
    //   required: true
    // },
    // creationDate: {
    //   type: Date, default: Date.now
    // }
});

mongoose.model('Order', schema);
