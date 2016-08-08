app.factory('CompanyDataService', ['$http', '$q', 'CSVToJSON', 'UIFactory', function($http, $q, CSVToJSON, UI) {

	var DATA_BASE_URL = './data/'; // Changed to locally stored

	// Holding
	var employees = [];
	var customers = [];
	var issues = [];

	function isEqual(array1, array2) {
		if ( array1.length !== array2.length ) { return false; }
  		if ( array1.toString() === array2.toString() ) { return true; }
    	return false;
	}


	return {
		getEmployees: function() {
			return $q(function(resolve, reject) {
				$http.get(DATA_BASE_URL+'employees.json')
				.then(function(response) {
					var isNewData = !isEqual(response.data, employees);
					employees = response.data;
					resolve(employees, isNewData);
				})
				.catch(function(err) {
					UI.toast('danger', 'Unable to get the company employees')
					console.log(err);
				})
			});
		},
		getCustomers: function() {
			return $q(function(resolve, reject) {
				$http.get(DATA_BASE_URL+'customers.csv')
				.then(function(response) {
					var json = CSVToJSON(response.data, 2);
					var isNewData = !isEqual(json, customers);
					customers = json;
					resolve(customers, isNewData);
				})
				.catch(function(err) {
					UI.toast('danger', 'Unable to get the company customers')
					console.log(err);
				})
				
			});
		},
		getIssues: function() {
			return $q(function(resolve, reject) {
				$http.get(DATA_BASE_URL+'issues.json')
				.then(function(response) {
					var isNewData = !isEqual(response.data, issues);
					issues = response.data;
					resolve(issues, isNewData);
				})
				.catch(function(err) {
					UI.toast('danger', 'Unable to get the company issues')
					console.log(err);
					
				})
			});
		}
	};
}]);