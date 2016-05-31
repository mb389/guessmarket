angular
  .module('livepoll')
  .controller('SignupCtrl',SignupCtrl)

  function SignupCtrl($scope, AuthService, $state) {

      $scope.login = {};
      $scope.error = null;
      $scope.regex = '/\S\w*/';

      $scope.sendSignup = function (signupInfo) {
        console.log('runs signup');

          $scope.error = null;

          AuthService.signup(signupInfo).then(function () {
              $state.go('home');
          }).catch(function () {
              $scope.error = 'Invalid signup credentials.';
          });

      };

  };
