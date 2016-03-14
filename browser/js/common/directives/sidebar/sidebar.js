app.directive('sidebar', function ($rootScope, AuthService, AUTH_EVENTS, $state,EventFactory,UserFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/sidebar/sidebar.html',
        link: function (scope) {
              EventFactory.getEvents()
              .then(events => scope.events=events)
              AuthService.getLoggedInUser()
              .then(user => {
                scope.user=user;
              })
          }
        }
  });
