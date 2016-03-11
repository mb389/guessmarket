app.controller('EventCtrl',function($scope,$state, theEvent, $rootScope, $interval) {

  $scope.event=theEvent;
  $rootScope.score=0;
  $rootScope.guesses=100;
  $scope.order = {};
  $scope.order.amtChoice=100;
  $scope.openGuesses = [];

    $scope.options = {
              chart: {
                  type: 'lineChart',
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
                      axisLabel: 'Date',
                      tickFormat: function(d) {
                        return d3.time.format('%c')(new Date(d));
                      }
                  },
                  yAxis: {
                      axisLabel: 'Probability (%)',
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
                  text: 'Winner of 2016 US Presidential Election'
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

          var seedValues = [{x: Date.now()-(60*60*24*2),y: 20}];

          $scope.data = [
              {
                  values: seedValues,
                  key: 'Trump',
                  color: '#ff7f0e'
              },
              {
                  values: seedValues,
                  key: 'Cruz',
                  color: '#2ca02c'
              },
              {
                  values: seedValues,
                  key: 'Rubio',
                  color: 'blue'
              },
              {
                  values: seedValues,
                  key: 'Clinton',
                  color: 'red'
              },
              {
                  values: seedValues,
                  key: 'Sanders',
                  color: 'purple'
              }
          ];

  $scope.guessOptions = $scope.data.map(el => el.key);
  var totalGuessVal=100;

  $scope.submitGuess = function(order) {
    $scope.openGuesses.push({option: order.optionChoice, amt: order.amtChoice});
    $rootScope.guesses-=order.amtChoice;
    totalGuessVal+=order.amtChoice;

    $scope.data.forEach(el => {
      console.log("prev y:", el.values[el.values.length-1].y, "total:", totalGuessVal)
      if (el.key == order.optionChoice) {
        console.log(el.key)
        el.values.push({
          x: Date.now(),
          y: (el.values[el.values.length-1].y+order.amtChoice)/totalGuessVal*100
        });
      } else {
        console.log(el.key)
        el.values.push({
          x: Date.now(),
          y: (el.values[el.values.length-1].y)/totalGuessVal*100
        })
      }
  });

    console.log($scope.data[0].values)
    order={};
  }



})
