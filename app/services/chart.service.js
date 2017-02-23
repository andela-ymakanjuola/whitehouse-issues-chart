angular.module('app').factory('chartService', function($http) {

  function getIssuesDates(issues) {
    issues.forEach(function(issue) {
      
    }) 
  }

  function getNumberOfIssuesPerMonth(issues) {

  }

  return {
    getIssues: function() {
      return $http.get('issues.json')
    }
  }

})