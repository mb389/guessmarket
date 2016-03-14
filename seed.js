/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Event = Promise.promisifyAll(mongoose.model('Event'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
          email: 'mb@mb.com',
          password: '123'
        }
    ];

    return User.createAsync(users);

};

var seedEvents = function () {
  var events = [
    {
      name: "2016 US Presidential Election",
      desc: "You have 1000 points to allocate amongst the choices. Choose those that you think have the highest chance of winning! Your score will increase as the win expectation of your choices rises.",
      path: "2016pres",
      choices: {
        Trump: [{x: 1, y:0}],
        Clinton: [{x: 1, y:0}],
        Cruz: [{x: 1, y:0}],
        Sanders: [{x: 1, y:0}],
        Rubio: [{x: 1, y:0}]
      }
    }
  ];

  return Event.createAsync(events);
}

connectToDb.then(function () {
  Event.remove({})
  .then(() => seedEvents())
  .then(() => User.remove({}))
  .then(() => seedUsers())
  .then(() => {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function (err) {
      console.error(err);
      process.kill(1);
  });
    //
    // User.findAsync({}).then(function (users) {
    //     if (users.length === 0) {
    //         return seedUsers();
    //     } else {
    //         console.log(chalk.magenta('Seems to already be user data, exiting!'));
    //         process.kill(0);
    //     }
    // }).then(function () {
    //     console.log(chalk.green('Seed successful!'));
    //     process.kill(0);
    // }).catch(function (err) {
    //     console.error(err);
    //     process.kill(1);
    // });

});
