
angular
  .module('livepoll')
  .run(runFn)

  function runFn($rootScope, AuthService, $state) {

    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

      if (!destinationStateRequiresAuth(toState)) return;
      if (AuthService.isAuthenticated()) return;
      event.preventDefault();

      AuthService.getLoggedInUser()
      .then((user) => user ? $state.go(toState.name, toParams) : $state.go('login'))
  });

};
