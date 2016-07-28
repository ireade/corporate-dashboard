app.controller('GeospatialCtrl', ['UIFactory', '$http', function(UI, $http) {


	this.toggleNav = UI.toggleNav;


	console.log("geospatial")

	$http.get('/tempData/employeesByLocation.json').then(function(response) {
		console.log(response);

		var locations = [];
		var employees = [];

		for ( var i = 0; i < response.data.length; i++ ) {
			locations.push(response.data[i].location);
			employees.push(response.data[i].employees);
		}


		var data = {
			datasets: [{
		        data: employees
		    }],
		    labels: locations
		}


		var ctx = $("#geospatialChart");

		var geospatialChart = new Chart(ctx, {
			data: data,
		    type: 'polarArea',
		    options: {
		        elements: {
		            arc: {
		                borderColor: "#000000"
		            }
		        }
		    }
		});

	
	})


}]);

