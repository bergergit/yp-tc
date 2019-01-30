describe('AppController', function () {

	var controller,
		stateMock,
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
	beforeEach(inject(function ($controller, _$rootScope_) {
		// deferredService = $q.defer();

		// mock service
		// sericeMock = {
		// 	login: jasmine.createSpy('login spy')
		// 				  .and.returnValue(deferredService.promise)			
		// };

		// mock $state
		stateMock = jasmine.createSpyObj('$state spy', ['go']);

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		controller = $controller('MessagesController', {
			'$scope': $scope,
		});

	}));

	it('should be defined', function () {
		expect(controller).toBeDefined();

		// controller.goToMessages();
		// expect(stateMock.go).toHaveBeenCalledWith('app.messages');
	});

});