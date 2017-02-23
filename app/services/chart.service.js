angular.module('app').factory('chartService', function($http) {

  function getIssuesDates(issues) {
    var issue_dates = [];
    issues.forEach(function(issue) {
      issue_dates.push(moment(issue['updated_at']).format('MMM YYYY'))
    })

    return issue_dates
  }

  function getNumberOfIssuesPerMonth(issues) {
    var issues_per_date = {}
    issues.forEach(function(issue) {
      if(issue in issues_per_date) {
        issues_per_date[issue] += 1;
      } else {
        issues_per_date[issue] = 1;
      }
    })

    return issues_per_date
  }

  return {
    getIssues: function(params) {
      return $http.get('https://api.github.com/repos/WhiteHouse/petitions/issues?per_page=100', {params: params})
    },
    getChartData: function(params) {
      var data = [];
      var labels = [];

      this.getIssues(params).then(function(res) {
        var issues = getIssuesDates(res.data)
        var issues_per_month = getNumberOfIssuesPerMonth(issues)

        angular.forEach(issues_per_month, function(value, key) {
          data.push(value);
          labels.push(new Date(key));
        })
        console.log(data)
      }).catch(function(error) {
        console.throw('error getting data', error);
      })
      return {data: data, labels: labels}
    }
  }

})