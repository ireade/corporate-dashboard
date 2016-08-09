app.controller('GeospatialCtrl', ['UIFactory', 'Employees', 'CompanyDataService', '$scope', '$interval', '$timeout', function(UI, Employees, CompanyDataService, $scope, $interval, $timeout) {

	/* Setup key variables */
	this.employees = Employees.data;
	var vm = this;
	this.toggleNav = UI.toggleNav;





	/* ********************************

	    Chart - Employees by Location

	******************************** */

	

	var geospatialChartEl = $("#geospatialChart");
	

	function setGeospatialChartData() {

		var locations = [];
		var locationColours = ["#FF6384", "#4BC0C0", "#FFCE56", "#f39c12", "#36A2EB", "#8e44ad", "#1abc9c", "#34495e", "#e67e22", "#c0392b"];
		var employees = [];

		angular.forEach(vm.employees, function(value) {
			locations.push(value.location);
			employees.push(value.employees);
		})
		
		vm.geospatialChart = {
			data: [employees],
			labels: locations,
			series: ['Employees by Location'],
			options: {
		        legend: {
		        	position: 'bottom'
		        },
		        responsive: false
			}
		}

		$timeout(function() {
			geospatialChartEl.css('width', '100%');
			geospatialChartEl.css('height', 'auto');
		}, 500)

	};

	setGeospatialChartData();





	/* Check data periodically and update */
	function checkForUpdates() {
		CompanyDataService.getEmployees().then(function(employees) {
			if (employees.isNewData) {
				vm.employees = employees.data;
				setGeospatialChartData();
				$scope.$apply;
			}
		});
	}
	var pollingInterval = $interval(checkForUpdates, 10000);
	$scope.$on('$destroy', function() {
		$interval.cancel(pollingInterval);
    });



	

}]);

