(function () {

  'use strict';

  angular.module('fsaPreBuilt', []);

  angular
    .module('fsaPreBuilt')
    .config(config)

  function config($httpProvider) {
      $httpProvider.interceptors.push([
          '$injector',
          function ($injector) {
              return $injector.get('AuthInterceptor');
          }
      ]);
  };

})();
