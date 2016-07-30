app.controller('GeospatialCtrl', ['UIFactory', 'Employees', 'CompanyDataService', '$scope', function(UI, Employees, CompanyDataService, $scope) {

	/* Setup key variables */
	this.employees = Employees;
	var vm = this;
	this.toggleNav = UI.toggleNav;

	/* Check data periodically and update */
	setInterval(function() {
		CompanyDataService.getEmployees().then(function(employees) {
			vm.employees = employees;
			$scope.$apply;
		})
	}, 15000);

	

	/* ********************************

	    Chart - Employees by Location

	******************************** */

	var locations = [];
	var locationColours = ["#FF6384", "#4BC0C0", "#FFCE56", "#f39c12", "#36A2EB", "#8e44ad", "#1abc9c", "#34495e", "#e67e22", "#c0392b"];
	var employees = [];

	angular.forEach(this.employees, function(value) {
		locations.push(value.location);
		employees.push(value.employees);
	})
	
	var chartData = {
		datasets: [{
	        data: employees,
	        backgroundColor: locationColours
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
	        },
	        responsive: false
	    }
	});

	ctx.css('width', '100%');
	ctx.css('height', 'auto');

}]);

