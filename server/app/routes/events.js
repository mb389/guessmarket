'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  Event.find()
  .then(events => res.json(events))
  .then(null,next);
});

router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id)
  .then(event => res.json(event))
  .then(null,next);
});

router.get('/search/:path', (req, res, next) => {
  Event.findOne({path: req.params.path})
  .then(event => res.json(event))
  .then(null,next)
});

router.post('/', (req, res, next) => {
  Event.create(req.body)
  .then(event => res.json(event))
  .then(null,next);
});

router.put('/:id', (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedEvent => res.json(updatedEvent))
  .then(null,next)
});

router.put('/guess/:id', (req, res, next) => {
  Event.findById(req.params.id)
  .then(event => {
    event.choices=req.body;
    return event.save();
})
  .then(saved => {
  console.log(saved)
    res.json(saved);
  })
  .then(null,next)
});

router.delete('/:id', (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
  .then(event => res.json(event))
  .then(null,next)
});


module.exports=router;
