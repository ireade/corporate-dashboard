app.controller('KeyMetricsCtrl', ['UIFactory', 'Customers', 'Issues', 'CompanyDataService', '$scope', '$interval', '$timeout', function(UI, Customers, Issues, CompanyDataService, $scope, $interval, $timeout) {

	/* Setup key variables */
	var vm = this;
	this.issues = Issues.data;
	this.customers = Customers.data;
	this.toggleNav = UI.toggleNav;




	/* ********************************

	    Chart - Customers by Week

	******************************** */

	var customersChartEl = $('#customers');

	function buildCustomersChart() {

		var weeks = [];
		var numberOfCustomers = [];

		angular.forEach(vm.customers, function(value) {
			weeks.push(value.week_of_the_year);
			numberOfCustomers.push(value.number_of_customers);
		})

		vm.customersChart = {
			data: [numberOfCustomers],
			labels: weeks,
			series: ['Customers'],
			options: {
		        legend: {
		        	position: 'bottom'
		        },
		        responsive: false
			}
		}

		$timeout(function() {
			customersChartEl.css('width', '100%');
			customersChartEl.css('height', 'auto');
		}, 500)

	};
	buildCustomersChart();


	/* ********************************

	    Chart - Issues by Month

	******************************** */
	var issuesChartEl = $('#issues');

	function buildIssuesChart() {

		var totalIssues = 0;
		var openIssues = 0;
		var closedIssues = 0;

		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
		var numberOfIssues = [0, 0, 0, 0, 0, 0, 0]

		angular.forEach(vm.issues, function(value) {
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

		vm.openIssues = openIssues;
		vm.totalIssues = totalIssues;

		vm.issuesChart = {
			data: [numberOfIssues],
			labels: months,
			series: ['Issues'],
			options: {
		        legend: {
		        	position: 'bottom'
		        },
		        responsive: false
			}
		}

		$timeout(function() {
			issuesChartEl.css('width', '100%');
			issuesChartEl.css('height', 'auto');
		}, 500)

	};
	buildIssuesChart();






	/* Check data periodically and update */
	function checkForUpdates() {
		CompanyDataService.getIssues().then(function(issues) {
			if (issues.isNewData) {
				vm.issues = issues.data;
				buildIssuesChart();
				$scope.$apply;
			}
		});
		CompanyDataService.getCustomers().then(function(customers) {
			if (customers.isNewData) {
				vm.customers = customers.data;
				buildCustomersChart();
				$scope.$apply;
			}
		});
	}
	var pollingInterval = $interval(checkForUpdates, 10000);
	$scope.$on('$destroy', function() {
		$interval.cancel(pollingInterval);
    });







}]);
