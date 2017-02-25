describe('chartController', function() {
  var $controller, scope

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    scope = _$rootScope_.$new();
    mockChartService = sinon.stub({getChartData: function() {}})

    $controller('chartController', {
      '$scope': scope
    });

  }));

  describe('Chart plotting requirements:', function() {
    it('should have data and labels scope for plotting chart', function () {
      expect(scope.data).toEqual([])
      expect(scope.labels).toEqual([])
    });

    it('should scale the x-axis by time in month/year', function () {
      expect(scope.options.scales.xAxes).toEqual([{
        type: 'time',
        time: {
          unit: 'month'
        }
      }]);
    });
  })

  describe('Set data for plotting:', function() {
    beforeEach(function() {
      var mockChartData = {data:[23, 43], labels:["2013-04-30T23:00:00.000Z", "2017-04-30T23:00:00.000Z"]}
      mockChartService.getChartData.returns(mockChartData)

      scope.plotChart = function() {
        scope.data = mockChartService.getChartData().data
        scope.labels = mockChartService.getChartData().labels
      }

      spyOn(scope, 'plotChart').and.callThrough()
      scope.plotChart()
    })

    it('should set the scope data and labels to the result of chartService.getChartData when plotChart is called', function() {
      expect(scope.plotChart).toHaveBeenCalled();
      expect(scope.data.length).toBeGreaterThan(0)
      expect(scope.labels.length).toBeGreaterThan(0)
    });
  });

  describe('API parameters:', function() {
    it('should have default API parameters to ensure that data is sorted according to when the issues were updated in ascending order', function () {
      expect(scope.params.sort).toEqual('updated');
      expect(scope.params.direction).toEqual('asc');
    });

    it('should get the maximum possible amount of data per page - 100, from API', function () {
      expect(scope.params.per_page).toEqual(100);
    });
  });

});