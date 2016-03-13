'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  User.find()
  .then(users => {
    res.json(users);
  })
  .then(null, next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.json(user);
  })
  .then(null, next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .then(null, next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    Object.assign(user, req.body);
    return user.save();
  })
  .then(savedUser => res.json(savedUser))
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    user.remove();
    res.sendStatus(204);
  })
  .then(null, next);
});

module.exports = router;
