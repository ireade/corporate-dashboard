app.factory('CompanyDataService', ['$http', '$q', 'CSVToJSON', function($http, $q, CSVToJSON) {

	var DATA_BASE_URL = 'https://raw.githubusercontent.com/ireade/corportate-dashboard-data/master/';

	return {
		getEmployees: function() {
			return $q(function(resolve, reject) {
				$http.get(DATA_BASE_URL+'employees.json')
				.then(function(response) {
					resolve(response.data);
				})
				.catch(function(err) {
					console.log(err);
				})
			});
		},
		getCustomers: function() {
			return $q(function(resolve, reject) {
				$http.get(DATA_BASE_URL+'customers.csv')
				.then(function(response) {
					var json = CSVToJSON(response.data, 2);
					resolve(json);
				})
				.catch(function(err) {
					console.log(err);
				})
				
			});
		},
		getIssues: function() {
			return $q(function(resolve, reject) {
				$http.get(DATA_BASE_URL+'issues.json')
				.then(function(response) {
					resolve(response.data);
				})
				.catch(function(err) {
					console.log(err);
				})
			});
		}
	};
}]);