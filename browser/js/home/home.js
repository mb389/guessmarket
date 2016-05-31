angular
  .module('livepoll')
  .config(homeConfig)


function homeConfig($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, allEvents, $rootScope, setUser, UserFactory,EventFactory, $state) {
          $scope.user=setUser;
          $rootScope.user=setUser;
          $rootScope.events=allEvents;

          console.log($scope.user)
          $scope.choices =  [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];

          $scope.showChoiceLabel = function (choice) {
              return choice.id === $scope.choices[0].id;
            }

          $scope.addNewChoice = function() {

            $scope.choices.push({id: 'choice'+$scope.choices.length+1});
          };

          $scope.reset = function() {
            $scope.newEvent={};
            $scope.choices =  [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];
          }



          $scope.save = function(event,choices) {
            var newChoices = {};
            choices.forEach(function(el) {
              newChoices[el.name]=[{x:Date.now(),y:0}];
            })
            var pathName = event.name.split(' ').join('').toLowerCase();
            EventFactory.createEvent({
              name: event.name,
              desc: event.desc,
              choices: newChoices,
              path: pathName
            })
            .then(function() {
              $state.go($state.current,null,{reload: true});
            })

          }
     },
     resolve: {
       allEvents: function(EventFactory) {
         return EventFactory.getEvents();
       },
       setUser: function(UserFactory, AuthService, $rootScope) {
         return AuthService.getLoggedInUser()
         .then(function(user) {
           if (user)
            return UserFactory.getUserById(user._id)
            else return null;
         })
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
