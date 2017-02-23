angular.module('app').controller('chartController', function($scope, chartService) {
  $scope.data = [];
  $scope.labels = [];
  $scope.params = {};
  $scope.state_options = ['all', 'open', 'closed'];



  $scope.plotChart = function() {
    var chart_data = chartService.getChartData($scope.params)
    $scope.data = chart_data.data
    $scope.labels = chart_data.labels
  }

  $scope.options ={
    scales: {
      xAxes: [{
        type: 'time',
        round: 'month',
        time: {
          unit: 'month'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Number of Issues'
        }
      }]
    }
  }
})