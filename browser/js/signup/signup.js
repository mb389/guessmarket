angular
  .module('livepoll')
  .config(signupState)

  function signupState($stateProvider) {
      $stateProvider.state('signup', {
          url:'/signup',
          templateUrl: 'js/signup/signup.html',
          controller: 'SignupCtrl',
          controllerAs: 'vm'
        });
  }
