app.controller('GeospatialCtrl', ['UIFactory', 'EmployeesByLocation', function(UI, EmployeesByLocation) {

	this.toggleNav = UI.toggleNav;
	this.EmployeesByLocation = EmployeesByLocation;

	/* Setup Data for chart */

	var locations = [];
	var employees = [];

	angular.forEach(EmployeesByLocation, function(value) {
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
	        elements: {
	            arc: {
	                borderColor: "#000000"
	            }
	        },
	        legend: {
	        	position: 'bottom'
	        }
	    }
	});

}]);

