
app.controller('EventCtrl',function($scope, $state, theEvent, $rootScope, $interval, AuthService, loggedInUser, EventFactory, UserFactory, chartData) {

  $scope.event=theEvent;
  $scope.data=chartData;
  $scope.user=loggedInUser;
  $scope.guesses=1000;
  $scope.order = {};
  $scope.order.amtChoice=100;
  $scope.openGuesses = [];
  var guessObj=$scope.event.choices;

  console.log($scope.event)

  console.log("guesses:",$scope.guesses);
  if (!$scope.guesses) {
    updateGuessCount(1000);
  }

  $scope.clearVotes = function() {
    updateGuessCount(1000);
  }

  $scope.noMoreGuesses = function() {
    if ($scope.guesses <= 0)
    return true;
  }

  $scope.userCheck = function() {
    if ($scope.user.email === "mb@mb.com") return true;
    else return false;
  }

  if (!$scope.user.score) $scope.user.score=0;

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
    $scope.guesses-=order.amtChoice;
    updateGuessCount($scope.guesses);
    var totalGuessVal=Number(order.amtChoice);

    chartData.forEach(function(el) {
      totalGuessVal+=el.values[el.values.length-1].y;
    });

    $scope.data.forEach(el => {
      if (el.key===order.optionChoice) {
        el.values.push({
          x: Date.now(),
          y: (el.values[el.values.length-1].y+Number(order.amtChoice))
        })
        //guessObj[el.key].push(el.values[el.values.length-1]);
      } else {
        el.values.push({
        x:Date.now(),
        y:(el.values[el.values.length-1].y)
      })
    }
    guessObj[el.key].push(el.values[el.values.length-1]);
  });

    EventFactory.submitGuess($scope.event._id,guessObj);
    $scope.user.score+=10;
    order={};
  }

//TODO: score tracker
  $scope.$watch('user.score', () => {
    UserFactory.editUser($scope.user._id, { score: $scope.user.score });
  })
  //TODO: vote points tracker

  function updateGuessCount(num) {
      var newObj={}
      var key=$scope.event.path;
      newObj[key]=num;
      UserFactory.editUser($scope.user._id, {guesses: newObj});
      $scope.guesses=num;
    };

})
