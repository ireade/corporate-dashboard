app.controller('GeospatialCtrl', ['UIFactory', 'Employees', 'CompanyDataService', '$scope', function(UI, Employees, CompanyDataService, $scope) {

	/* Setup key variables */
	this.employees = Employees;
	var vm = this;
	this.toggleNav = UI.toggleNav;





	/* ********************************

	    Chart - Employees by Location

	******************************** */

	this.geospatialChart = {
		data: chartData,
		options: {
	        legend: {
	        	position: 'bottom'
	        }
		}
	}

	function buildChart() {

		var locations = [];
		var locationColours = ["#FF6384", "#4BC0C0", "#FFCE56", "#f39c12", "#36A2EB", "#8e44ad", "#1abc9c", "#34495e", "#e67e22", "#c0392b"];
		var employees = [];

		angular.forEach(vm.employees, function(value) {
			locations.push(value.location);
			employees.push(value.employees);
		})
		
		var chartData = {
			datasets: [{
				label: 'Employees by Location',
		        data: employees,
		        backgroundColor: locationColours
		    }],
		    labels: locations
		};

		var ctx = $("#geospatialChart");

		var geospatialChart = new Chart(ctx, {
			data: chartData,
		    type: 'bar',
		    options: {
		        legend: {
		        	position: 'bottom'
		        },
		        responsive: false
		    }
		});

		// ctx.css('width', '100%');
		// ctx.css('height', 'auto');

	};

	//buildChart();




	/* Check data periodically and update */
	setInterval(function() {
		CompanyDataService.getEmployees().then(function(employees, isNewData) {
			if (isNewData) {
				vm.employees = employees;
				buildChart();
				$scope.$apply;
			} 
		})
	}, 5000);



	

}]);

