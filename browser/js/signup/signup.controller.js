angular
  .module('livepoll')
  .controller('SignupCtrl',SignupCtrl)

  function SignupCtrl(AuthService, $state) {
    var vm=this;
    vm.login = {};
    vm.error = null;
    vm.regex = '/\S\w*/';

    vm.sendSignup = function (signupInfo) {
      vm.error = null;

      AuthService
      .signup(signupInfo)
      .then(() => $state.go('home'))
      .catch(() => $scope.error = 'Invalid signup credentials.');
    };

  };
