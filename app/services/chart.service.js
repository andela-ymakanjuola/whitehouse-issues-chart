angular.module('app').factory('chartService', function($http) {
  var issues_cache = {};

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

  function hasCachedData(params) {
    if(params.since in issues_cache){
      if (issues_cache[params.since].params.label == params.label && issues_cache[params.since].params.state == params.state) {
        return true
      }
    } else {
      return false
    }
  }

  return {
    getIssues: function(params) {
      return $http.get('https://api.github.com/repos/WhiteHouse/petitions/issues', {params: params})
    },
    getIssueLabels: function(params) {
      var labels = [];
      $http.get('https://api.github.com/repos/WhiteHouse/petitions/labels').then(function(res) {
        res.data.forEach(function(label) {
          labels.push(label.name);
        });
      }).catch(function(error) {
        console.error('error getting issue labels', error);
      });

      return labels;
    },
    getCachedChartData: function(params) {
      return issues_cache[params.since]
    },
    getChartData: function(params) {
      var data = [];
      var labels = [];

      if(hasCachedData(params)) {
        var cachedData = this.getCachedChartData(params)
        console.log('getting cached data', cachedData);
        return {data: cachedData.data, labels: cachedData.labels}
      } else {
        console.log('fetching from api..')
        this.getIssues(params).then(function(res) {
          var issues = getIssuesDates(res.data)
          var issues_per_month = getNumberOfIssuesPerMonth(issues)

          angular.forEach(issues_per_month, function(value, key) {
            data.push(value);
            labels.push(new Date(key));
          })
          issues_cache[params.since] = {
            params: params,
            data: data,
            labels: labels
          }
        }).catch(function(error) {
          console.error('error getting data', error);
        })
      
        return {data: data, labels: labels}
      }

    }
  }

})