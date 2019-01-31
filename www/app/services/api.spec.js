describe('ApiService', function () {

	var $httpBackend,
		$rootScope,
		mockApiService;

	// load the module for our app
	beforeEach(module('yp', 'yp.services'));

	// instantiate the controller and mocks for every test
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		mockApiService = $injector.get('Api');
		$rootScope = $injector.get('$rootScope');
		$httpBackend.whenGET(/app.*/).respond('');

		spyOn(mockApiService, '_mergeMessages').and.callFake(function(messages) { return messages } );

	}));

	it('should be defined', function () {
		expect(mockApiService).toBeDefined();
	});

	it('should invoke messages endpoint', function(done) {
		$httpBackend.expectGET(/\/api\/messages/).respond([{
			title: 'Message title',
			body: 'Message body'
		}]);

		var resultPromise = mockApiService.getAllMessages();

		$httpBackend.flush();
		resultPromise.then(function(result) {
			expect(result[0].title).toEqual('Message title');
			expect(result[0].body).toEqual('Message body');
			done();
		});

		$rootScope.$digest();



	});

});