angular
  .module('livepoll')
  .config(appConfig)


  function appConfig($urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
  }
