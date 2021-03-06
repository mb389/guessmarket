angular
  .module('fsaPreBuilt')
  .factory('AuthInterceptor', AuthInterceptor)

function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
    var statusDict = {
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
    };
    return {
        responseError: function (response) {
            $rootScope.$broadcast(statusDict[response.status], response);
            return $q.reject(response)
        }
    };
};
