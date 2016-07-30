app.controller('GeospatialCtrl', ['UIFactory', 'Employees', 'CompanyDataService', '$scope', function(UI, Employees, CompanyDataService, $scope) {

	this.toggleNav = UI.toggleNav;
	this.Employees = Employees;
	var vm = this;

	/* Check data periodically and update */
	setInterval(function() {
		CompanyDataService.getEmployees().then(function(employees) {
			vm.Employees = employees;
			$scope.$apply;
		})
	}, 15000);

	

	/* Setup Data for chart */

	var locations = [];
	var employees = [];

	angular.forEach(Employees, function(value) {
		locations.push(value.location);
		employees.push(value.employees);
	})
	
	var chartData = {
		datasets: [{
	        data: employees,
	        backgroundColor: [
	            "#FF6384", "#4BC0C0", "#FFCE56", "#f39c12", "#36A2EB", "#8e44ad", "#1abc9c", "#34495e", "#e67e22", "#c0392b"
	        ]
	    }],
	    labels: locations
	};

	var ctx = $("#geospatialChart");

	var geospatialChart = new Chart(ctx, {
		data: chartData,
	    type: 'polarArea',
	    options: {
	        legend: {
	        	position: 'bottom'
	        }
	    }
	});

}]);

