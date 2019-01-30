describe('AppController', function () {

	var controller,
		apiMock,
		localStorageMock,
		$scope,
		$rootScope;


	// load the module for our app
	beforeEach(module('yp', 'yp.controllers'));

	// disable template caching
	beforeEach(module(function ($provide, $urlRouterProvider) {
		$provide.value('$ionicTemplateCache', function () { });
		$urlRouterProvider.deferIntercept();
	}));

	// instantiate the controller and mocks for every test
	beforeEach(inject(function ($controller, _$rootScope_, $q) {
		deferredService = $q.defer();

		// mock Api service
		apiMock = {
			getAllMessages: jasmine.createSpy('api spy')
						  .and.returnValue(deferredService.promise)			
		};

		// mock $state
		localStorageMock = jasmine.createSpyObj('$localStorage spy', ['hasMessage']);

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		controller = $controller('MessagesController', {
			'$scope': $scope,
			'Api': apiMock,
			'$localStorage': localStorageMock
		});

	}));

	it('should be defined', function () {
		expect(controller).toBeDefined();

		// controller.goToMessages();
		// expect(stateMock.go).toHaveBeenCalledWith('app.messages');
	});

	it('should invoke messages serviec', function() {
		expect(apiMock.getAllMessages).toHaveBeenCalled();
		expect(localStorageMock.hasMessage).toBeDefined();
		expect(localStorageMock.hasMessage).toBeFalsy();

		deferredService.resolve([{ title: 'foo', body: 'bar'}]);
		$rootScope.$digest();

		expect(controller.messages.length).toEqual(1);
	});

});