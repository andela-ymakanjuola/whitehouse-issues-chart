angular.module('app').controller('chartController', function($scope, chartService) {
  $scope.data = []
  $scope.labels = []

  chartService.getIssues().then(function(res) {
    console.log(res)
  }).catch(function(error) {
    console.log(error)
  })
})