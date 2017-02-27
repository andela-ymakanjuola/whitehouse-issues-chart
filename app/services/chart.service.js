angular.module('app').factory('chartService', function($http) {
  var issues_cache = {
    'all': {},
    'open': {},
    'closed': {}
  };

  function getIssuesDates(issues) {
    var issue_dates = [];
    issues.forEach(function(issue) {
      issue_dates.push(moment(issue['updated_at']).format('MMM YYYY'))
    })

    return issue_dates;
  }

  function getNumberOfIssuesPerMonth(issues) {
    var issues_per_date = {};
    issues.forEach(function(issue) {
      if(issue in issues_per_date) {
        issues_per_date[issue] += 1;
      } else {
        issues_per_date[issue] = 1;
      }
    })
    return issues_per_date;
  }

  function hasCachedData(params) {
    return (issues_cache[params.state][params.since] && params.labels === issues_cache[params.state][params.since].issue_label);
  }

  function cacheChartData(params, data, labels) {
    issues_cache[params.state][params.since] = {
      issue_label: params.labels,
      data: data,
      labels: labels
    }
  }

  return {
    getIssues: function(params) {
      return $http.get('https://api.github.com/repos/WhiteHouse/petitions/issues', {params: params});
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
      return issues_cache[params.state][params.since];
    },
    getChartData: function(params) {
      var data = [];
      var labels = [];

      if(hasCachedData(params)) {
        var cached_data = this.getCachedChartData(params)
        return {data: cached_data.data, labels: cached_data.labels}
      } else {
        this.getIssues(params).then(function(res) {
          var issues_per_month = getNumberOfIssuesPerMonth(getIssuesDates(res.data));

          angular.forEach(issues_per_month, function(value, key) {
            data.push(value);
            labels.push(new Date(key));
          });

          cacheChartData(params, data, labels)

        }).catch(function(error) {
          console.error('error getting data', error);
        });
        return {data: data, labels: labels}
      }
    }
  }
});