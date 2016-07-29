app.factory('CompanyDataService', ['$http', '$q', function($http, $q) {



	function convertCSVtoJSON(string, columns) {

		var response = [];

		var keys = [];

		var splitString = string.split(',');

		for (var i = 0; i < columns; i++) {
			var foo = splitString.shift();

			foo = foo.toLowerCase().replace(/ /g, '_');

			foo = foo.split('↵')[0];

			keys.push(foo);
		}

		console.log(keys);


		// for (var i = 0; i < splitString.length, i++) {

		// 	var foo = splitString[i];

			

		// 	for (var j = 0; j < keys.length; j++) {

		// 	}
		// }




	}





	// 
	return {

		getEmployeesByLocation: function() {
			return $q(function(resolve, reject) {
				$http.get('/tempData/employeesByLocation.json')
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
				$http.get('/tempData/customersByWeek.json')
				.then(function(response) {
					// convertCSVtoJSON(response.data, 2)
					resolve(response.data);
				})
				.catch(function(err) {
					console.log(err);
				})
			});
		},

		getIssues: function() {
			return $q(function(resolve, reject) {
				$http.get('/tempData/issues.json')
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