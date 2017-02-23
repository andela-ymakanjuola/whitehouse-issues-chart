describe('chartService', function() {
  var $httpBackend, chartService

  beforeEach(module('app'));

  beforeEach(inject(function( _$httpBackend_, _chartService_) {
    $httpBackend = _$httpBackend_; 
    chartService = _chartService_; 
    $httpBackend.when('GET', 'https://api.github.com/repos/WhiteHouse/petitions/issues').responds({
      data: [{}]
    })
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get an array of issues', function () {
    $httpBackend.expectGET('https://api.github.com/repos/WhiteHouse/petitions/issues').responds({data: []})
    
    chartService.getIssues()
    $httpBackend.flush();
  })


})