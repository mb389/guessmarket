angular
  .module('livepoll')
  .config(loginState)

  function loginState($stateProvider) {
      $stateProvider.state('login', {
          url: '/login',
          templateUrl: 'js/login/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
      });
  };
