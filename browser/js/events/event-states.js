app.config(function ($stateProvider) {

    $stateProvider.state('event', {
        url: '/event/:path',
        templateUrl: '/js/events/event.html',
        controller: 'EventCtrl',
        resolve: {
          theEvent: function(EventFactory,$stateParams) {
            return EventFactory.getEventByPath($stateParams.path);
          },
          chartData: function(EventFactory,$stateParams) {
            function getRandomColor() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            return EventFactory.getEventByPath($stateParams.path)
            .then(function(event) {
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
          loggedInUser: function(AuthService) {
            return AuthService.getLoggedInUser();
          },
          score: function(UserFactory,AuthService) {
            return AuthService.getLoggedInUser()
            .then(function(user) {
              return UserFactory.getUserById(user._id)
            })
            .then(user => user.score)
          }
      }

      })
});
