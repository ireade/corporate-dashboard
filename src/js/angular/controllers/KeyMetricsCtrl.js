app.controller('KeyMetricsCtrl', ['Customers', 'Issues', 'CompanyDataService', function(Customers, Issues, CompanyDataService) {

	var vm = this;

	this.issues = Issues;
	this.customers = Customers;

	setInterval(function() {
		CompanyDataService.getIssues().then(function(issues) {
			vm.issues = issues;
			$scope.$apply;
		})
		CompanyDataService.getCustomers().then(function(customers) {
			vm.customers = customers;
			$scope.$apply;
		})
	}, 15000);


	/* Customers by Week Chart */

	var weeks = [];
	var numberOfCustomers = [];

	angular.forEach(this.customers, function(value) {
		weeks.push(value.week_of_the_year);
		numberOfCustomers.push(value.number_of_customers);
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
	        legend: {
	        	position: 'bottom'
	        }
	    }
	});



	/* Issues Chart */

	var totalIssues = 0;
	var openIssues = 0;
	var closedIssues = 0;

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
	var numberOfIssues = [0, 0, 0, 0, 0, 0, 0]

	angular.forEach(this.issues, function(value) {
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
		numberOfIssues[month]++;
	})

	this.openIssues = openIssues;
	this.totalIssues = totalIssues;

	var issuesChartData = {
		datasets: [{
	        data: numberOfIssues,
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
