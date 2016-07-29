app.controller('KeyMetricsCtrl', ['Customers', 'Issues', function(Customers, Issues) {





	/* Customers by Week Chart */

	var weeks = [];
	var numberOfCustomers = [];

	angular.forEach(Customers, function(value) {
		weeks.push(value.week);
		numberOfCustomers.push(value.customers);
	})

	var customersChartData = {
		datasets: [{
	        data: numberOfCustomers,
	        label: 'Customers'
	    }],
	    labels: weeks
	};

	var customersChartCtx = $("#customers");

	var customersChart = new Chart(customersChartCtx, {
		data: customersChartData,
	    type: 'line',
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



	/* Issues Chart */

	console.log(Issues);

	var totalIssues = 0;
	var openIssues = 0;
	var closedIssues = 0;




	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

	var stuff = [0, 0, 0, 0, 0, 0, 0]

	angular.forEach(Issues, function(value) {
		totalIssues ++;
		switch(value.status) {
			case 'closed':
				closedIssues++;
				break;
			case 'open':
				openIssues++;
				break;
		}


		var month = parseInt(value.submission_timestamp.split('-')[1]) - 1;

		console.log(month);

		stuff[month]++;

	})


	this.openIssues = openIssues;
	this.totalIssues = totalIssues;

	console.log(stuff);



	

	

	var issuesChartData = {
		datasets: [{
	        data: stuff,
	        label: 'Issues'
	    }],
	    labels: months
	};
	var issuesChartCtx = $("#issues");

	var issuesChart = new Chart(issuesChartCtx, {
		data: issuesChartData,
	    type: 'bar',
	    options: {
	        legend: {
	        	position: 'bottom'
	        }
	    }
	});


}]);
