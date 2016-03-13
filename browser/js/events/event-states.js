app.config(function ($stateProvider) {

    $stateProvider.state('event', {
        url: '/event/:path',
        templateUrl: '/js/events/event.html',
        controller: 'EventCtrl',
        resolve: {
          theEvent: function(EventFactory,$stateParams) {
            return EventFactory.getEventByPath($stateParams.path);
          },
          loggedInUser: function(AuthService) {
            return AuthService.getLoggedInUser();
          }
        }
    });

});
