angular
  .module('livepoll')
  .factory('EventFactory',EventFactory)

function EventFactory($http) {

  var obj = {};

  obj.getEventById = function(id) {
    return $http.get('/api/events/' + id)
      .then(res => res.data);
  }

  obj.getEventByPath = function(path) {
    return $http.get('/api/events/search/' + path)
      .then(res => res.data);
  }

  // obj.findOrCreateEvent = function(path) {
  //   return $http.get('/api/events/search/' + path)
  //     .then(res => res.data)
  // }

  obj.createEvent = function(body) {
    return $http.post('/api/events/', body)
      .then(res => res.data);
  }

  obj.getEvents = function() {
    return $http.get('/api/events/')
      .then(res => res.data);
  }

  obj.submitGuess = function(id, body) {
    return $http.put('/api/events/guess/' + id, body)
      .then(res => res.data);
  }

  return obj;
};
