app.controller('EventCtrl',function($scope,$state, theEvent) {

  $scope.event=theEvent;

  $scope.chartData = [
    { y: "2015-10-01", a: 33, b: 66 },
    { y: "2015-11-01", a: 75,  b: 25 },
    { y: "2015-12-01", a: 50,  b: 50 },
    { y: "2016-01-01", a: 75,  b: 25 },
    { y: "2016-02-01", a: 50,  b: 50 },
    { y: "2016-03-01", a: 75,  b: 25 },
    { y: "2016-04-01", a: 55, b: 45 }
	];

  $scope.orders = {};
  $scope.trades = {};
  $scope.options = ["Trump","Clinton","Cruz","Rubio","Sanders"];

  $scope.submitOrder = function() {

  }

  
})
