app.controller('GeospatialCtrl', ['UIFactory', 'Employees', 'CompanyDataService', '$scope', 'uiGmapGoogleMapApi', 'uiGmapGmapUtil', '$interval', '$timeout', function(UI, Employees, CompanyDataService, $scope, uiGmapGoogleMapApi, uiGmapGmapUtil, $interval, $timeout) {

	/* Setup key variables */
	this.employees = Employees;
	var vm = this;
	this.toggleNav = UI.toggleNav;

	////



	this.map = {
        center: {
            latitude: 9.155746,
            longitude: 7.727321
        },
        zoom: 5,
        control: {}
    };
	
	uiGmapGoogleMapApi.then(function(maps) {
        console.log('Google Maps loaded');


        $timeout(function () {
			var map = vm.map.control.getGMap();
			var maps = google.maps;


		}, 1000);

    });



	/* ********************************

	    Chart - Employees by Location

	******************************** */

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

	};

	//buildChart();




	/* Check data periodically and update */
	// setInterval(function() {
	// 	CompanyDataService.getEmployees().then(function(employees, isNewData) {
	// 		if (isNewData) {
	// 			console.log("isNewData")
	// 			vm.employees = employees;
	// 			buildChart();
	// 			$scope.$apply;
	// 		} else {
	// 			console.log("is not new data")
	// 		}
	// 	})
	// }, 5000);

	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
	}

	

}]);

