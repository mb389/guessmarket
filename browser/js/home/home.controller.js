angular
  .module('livepoll')
  .controller('homeCtrl',homeCtrl)


  function homeCtrl(allEvents, $rootScope, setUser, UserFactory,EventFactory, $state) {
    var vm = this;
    vm.user=setUser;
    $rootScope.user=setUser;
    $rootScope.events=allEvents;

    vm.choices =  [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];

    vm.showChoiceLabel = function (choice) {
        return choice.id === vm.choices[0].id;
      }

    vm.addNewChoice = function() {
      vm.choices.push({id: 'choice'+vm.choices.length+1});
    };

    vm.reset = function() {
      vm.newEvent={};
      vm.choices =  [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];
    }

    vm.save = function(event,choices) {
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
      .then(() => $state.go($state.current,null,{reload: true}))
    }
  }
