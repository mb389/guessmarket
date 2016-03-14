
app.controller('EventCtrl',function($scope, $state, theEvent, $rootScope, $interval, AuthService, loggedInUser, EventFactory, UserFactory, score, guesses,chartData) {

  $scope.event=theEvent;
  $scope.data=chartData;
  $scope.user=loggedInUser;
  $scope.order = {};
  $scope.order.amtChoice=100;
  $scope.openGuesses = [];
  var guessObj=$scope.event.choices;

  console.log($scope.event)

  $scope.clearVotes = function() {
    $rootScope.guesses=1000;
  }

  $scope.noMoreGuesses = function() {
    if ($rootScope.guesses <= 0 || guesses <= 0)
    return true;
  }

  $scope.userCheck = function() {
    if ($scope.user.email === "mb@mb.com") return true;
    else return false;
  }

  if (!guesses) $rootScope.guesses=1000;
  else $rootScope.guesses=guesses;

  if (!score) $rootScope.score=0;
  else $rootScope.score=score;

    $scope.options = {
              chart: {
                  type: 'lineChart',
                  interpolate: 'basis',
                  height: 450,
                  margin : {
                      top: 20,
                      right: 20,
                      bottom: 40,
                      left: 55
                  },
                  x: function(d){ return d.x; },
                  y: function(d){ return d.y; },
                  useInteractiveGuideline: true,
                  dispatch: {
                      stateChange: function(e){ console.log("stateChange"); },
                      changeState: function(e){ console.log("changeState"); },
                      tooltipShow: function(e){ console.log("tooltipShow"); },
                      tooltipHide: function(e){ console.log("tooltipHide"); }
                  },
                  xAxis: {
                      axisLabel: 'Time',
                      tickFormat: function(d) {
                        return d3.time.format('%m/%d %H:%M%p')(new Date(d));
                      }
                  },
                  yAxis: {
                      axisLabel: 'Vote Value',
                      tickFormat: function(d){
                          return d3.format('.02f')(d);
                      },
                      axisLabelDistance: -10
                  },
                  callback: function(chart){
                      console.log("!!! lineChart callback !!!");
                  }
              },
              title: {
                  enable: true,
                  text: 'Projected Winner'
              },
              subtitle: {
                  enable: false,
                  text: 'Subtitle for simple line chart.',
                  css: {
                      'text-align': 'center',
                      'margin': '10px 13px 0px 7px'
                  }
              },
              caption: {
                  enable: false,
                  html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet.',
                  css: {
                      'text-align': 'justify',
                      'margin': '10px 13px 0px 7px'
                  }
              }
          };

          $scope.guessOptions=[];
          for (var key in theEvent.choices) {
            $scope.guessOptions.push(key)
          }


//persisting chart data
if (guessObj) {
  for (var x=0; x<$scope.data.length; x++) {
    $scope.data[x].values=guessObj[$scope.data[x].key];
  }
}

  $scope.submitGuess = function(order) {

    if (order.optionChoice && order.amtChoice > 0)
      $scope.openGuesses.push({option: order.optionChoice, amt: order.amtChoice});
    $rootScope.guesses-=order.amtChoice;
    var totalGuessVal=0;
    totalGuessVal+=Number(order.amtChoice);



    $scope.data.forEach(el => {
      if (el.key===order.optionChoice) {
        el.values.push({
          x: Date.now(),
          y: (el.values[el.values.length-1].y+Number(order.amtChoice))
        })
        guessObj[el.key].push(el.values[el.values.length-1]);
      } else {
        el.values.push({
        x:Date.now(),
        y:(el.values[el.values.length-1].y)
      })
      guessObj[el.key].push(el.values[el.values.length-1]);
    }
  });

    EventFactory.submitGuess($scope.event._id,guessObj);
    console.log("guessObj for put",guessObj)
    console.log("scope data",$scope.data)
    $rootScope.score+=10;
    order={};
  }


  $rootScope.$watch('score', () => {
    UserFactory.editUser($scope.user._id, { score: $rootScope.score });
  })
  //TODO: vote points tracker
  // $rootScope.$watch('guesses', () => {
  //   var newGuessArr=$scope.user.guesses;
  //   newGuessArr.forEach(function(el) {
  //     if (el.event===$scope.event.path) el.number=$rootScope.guesses;
  //     else newGuessArr.push({ event: $scope.event.path, number: $rootScope.guesses })
  // });
  //   UserFactory.editUser($scope.user._id, { guesses: newGuessArr });
  //   $scope.noMoreGuesses();
  // })

})
