angular
  .module('livepoll')
  .controller('LoginCtrl',LoginCtrl)

  function LoginCtrl(AuthService, $state) {
    var vm=this;
    vm.login = {};
    vm.error = null;

    vm.sendLogin = function (loginInfo) {
      vm.error = null;
      AuthService
        .login(loginInfo)
        .then(() => $state.go('home'))
        .catch(() => vm.error = 'Invalid login credentials.');
    };

  };
