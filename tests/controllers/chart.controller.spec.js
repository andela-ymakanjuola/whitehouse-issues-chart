describe('chartController', function() {
  var $controller, scope

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    scope = _$rootScope_.$new();

    $controller('chartController', {
      '$scope': scope
    });

    it('should have data and labels scope for plotting chart', function() {
      expect(scope.data).toEqual([])
      expect(scope.labels).toEqual([])
    })
  }));
})