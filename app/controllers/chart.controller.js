angular.module('app').controller('chartController', function($scope, chartService) {
  $scope.data = [];
  $scope.labels = [];
  //set default chart options
  $scope.options ={
    legend: {
      display: true,
      labelString: 'all'
    },
    elements: {
      line: {
        fill: false,
        tension: 0
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
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
  //set default parameters for API query
  $scope.params = {
    filter: 'all',
    direction: 'asc',
    sort: 'updated',
    per_page: 100,
    state: 'all'
  };

  $scope.state_options = ['all', 'open', 'closed'];

  $scope.plotChart = function() {
    var chart_data = chartService.getChartData($scope.params)

    //set data to be plotted on the chart
    $scope.data = chart_data.data
    $scope.labels = chart_data.labels
  }

})