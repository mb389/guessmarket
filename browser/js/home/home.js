angular
  .module('livepoll')
  .config(homeConfig)

function homeConfig($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'js/home/home.html',
      controller: 'homeCtrl',
      controllerAs: 'vm',
      resolve: {
         allEvents: EventFactory => EventFactory.getEvents(),
         setUser: (UserFactory, AuthService, $rootScope) => {
           return AuthService.getLoggedInUser()
           .then((user) => user ? UserFactory.getUserById(user._id) : null)
           .then(foundUser => {
             if (foundUser) {
             $rootScope.score=foundUser.score;
             return foundUser;
           } else return null;
          })
       }
    }
  });
};
