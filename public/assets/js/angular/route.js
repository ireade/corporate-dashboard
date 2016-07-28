app.config(function($stateProvider, $urlRouterProvider) {


	$urlRouterProvider.otherwise('/');


	$stateProvider

		.state('geospatial', {
			url: '/',
			templateUrl: 'views/geospatial.html',
			controller: 'GeospatialCtrl as dashboard',
			resolve: {
			}
		})
		.state('keyMetrics', {
			url: '/metrics',
			templateUrl: 'views/key-metrics.html',
			controller: 'KeyMetricsCtrl as dashboard',
			resolve: {
			}
		})
		.state('data', {
			url: '/data',
			templateUrl: 'views/data.html',
			controller: 'DataCtrl as dashboard',
			resolve: {
			}
		})

	;




});