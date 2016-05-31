angular
  .module('livepoll')
  .config(EventState)

function EventState($stateProvider) {

    $stateProvider.state('event', {
        url: '/event/:path',
        templateUrl: '/js/events/event.html',
        controller: 'EventCtrl',
        controllerAs: 'vm',
        resolve: {
          theEvent: (EventFactory,$stateParams) => EventFactory.getEventByPath($stateParams.path),
          chartData: (EventFactory,$stateParams) => {
            return EventFactory.getEventByPath($stateParams.path)
            .then(event => {
              var data=[];
              for (var key in event.choices) {
                data.push({
                  values: [{x: Date.now(),y: 0}],
                  key: key,
                  color: getRandomColor()
                })
              }
              return data;
            })
          },
          loggedInUser: (AuthService) => AuthService.getLoggedInUser(),
          score: (UserFactory,AuthService) => AuthService.getLoggedInUser()
            .then(user => UserFactory.getUserById(user._id))
            .then(user => user.score)
      }


      })
};

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
