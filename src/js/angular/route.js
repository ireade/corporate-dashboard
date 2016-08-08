app.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {


	uiGmapGoogleMapApiProvider.configure({
		v: '3.18',
		key: 'AIzaSyBWbn2woYcKBa78EGto81shmbogj-9LfF0'
    });

	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('geospatial', {
			url: '/',
			templateUrl: 'views/geospatial.html',
			controller: 'GeospatialCtrl as dashboard',
			resolve: {
				Employees: function(CompanyDataService) {
					return CompanyDataService.getEmployees();
				}
			}
		})
		.state('keyMetrics', {
			url: '/metrics',
			templateUrl: 'views/key-metrics.html',
			controller: 'KeyMetricsCtrl as dashboard',
			resolve: {
				Customers: function(CompanyDataService) {
					return CompanyDataService.getCustomers();
				},
				Issues: function(CompanyDataService) {
					return CompanyDataService.getIssues();
				}
			}
		})
		.state('data', {
			url: '/data',
			templateUrl: 'views/data.html',
			controller: 'DataCtrl as dashboard',
			resolve: {
				Issues: function(CompanyDataService) {
					return CompanyDataService.getIssues();
				}
			}
		})

	;




}]);