app.directive('sidebar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/sidebar/sidebar.html',
        link: function (scope) {
              scope.score=$rootScope.score;
              scope.guesses=$rootScope.guesses;
              scope.events=$rootScope.events;
              $rootScope.$watch('events', function() {
                scope.events=$rootScope.events;
              })
              scope.user=$rootScope.user;
          }
        }
  });
