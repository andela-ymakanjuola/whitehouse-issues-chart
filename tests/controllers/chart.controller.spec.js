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

  it('should have data and labels scope for plotting chart', function () {
    expect(scope.data).toEqual([])
    expect(scope.labels).toEqual([])
  })


  it('should set the scope data and labels to the result of chartService.getChartData', function() {
    var mockChartData = {data:[23, 43], labels:[]}
    mockChartService.getChartData.returns(mockChartData)
    scope.plotChat()
    expect(scope.data[0]).toEqual(mockChartService.getChartData().data)
    expect(scope.labels[0]).toEqual(mockChartData.labels)

  });
})