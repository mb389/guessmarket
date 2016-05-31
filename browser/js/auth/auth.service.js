angular
  .module('fsaPreBuilt')
  .service('AuthService', AuthService)

function AuthService($http, Session, $rootScope, AUTH_EVENTS, $q) {

    function onSuccessfulLogin(response) {
        var data = response.data;
        Session.create(data.id, data.user);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        return data.user;
    }

    this.isAuthenticated = function () {
        return !!Session.user;
    };

    this.getLoggedInUser = function (fromServer) {

        if (this.isAuthenticated() && fromServer !== true) {
            return $q.when(Session.user);
        }

        return $http.get('/session')
        .then(onSuccessfulLogin)
        .catch(() => null)
    };

    this.login = function (credentials) {
        return $http.post('/login', credentials)
            .then(onSuccessfulLogin)
            .catch(function () {
                return $q.reject({ message: 'Invalid login credentials.' });
            });
    };

    this.signup = function (credentials) {
        return $http.post('/signup', credentials)
            .then(onSuccessfulLogin)
            .catch(() => $q.reject({ message: 'Invalid signup credentials.' }));
    };

    this.logout = function () {
        return $http.get('/logout').then(function () {
            Session.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
    };

};
