app.controller('DataCtrl', ['UIFactory', 'Issues', 'CompanyDataService', '$scope', function(UI, Issues, CompanyDataService, $scope) {

	/* Setup key variables */
	var vm = this;
	this.issues = Issues;
	this.toggleNav = UI.toggleNav;

	/* Check data periodically and update */
	setInterval(function() {
		CompanyDataService.getIssues().then(function(issues, isNewData) {
			if (isNewData) {
				vm.issues = issues;
				$scope.$apply;
			}
		})
	}, 15000);
	


	
	/* ********************************

	    Setup options for filtering

	******************************** */

	/* Get array of employees and customers to filter */
	var employeeNames = [];
	var customerNames = [];

	angular.forEach(Issues, function(value) {
		if ( !employeeNames.includes(value.employee_name) ) {
			employeeNames.push(value.employee_name);
		}
		if ( !customerNames.includes(value.customer_name) ) {
			customerNames.push(value.customer_name);
		}
	})

	this.issuesFilter = {
		status: '',
		employee_name: '',
		customer_name: ''
	}

	function filterResults(value, filter) {
		vm.issuesFilter[filter] = value;
	}


	// FILTER BY STATUS
	this.filterByStatusOptions = [
		{
			name: 'All',
			value: ''
		},
		{
			name: 'Open',
			value: 'open'
		},
		{
			name: 'Closed',
			value: 'closed'
		}
	];



	// FILTER BY EMPLOYEE NAME
	this.filterByEmployeeOptions = [
		{
			name: 'All',
			value: ''
		}
	];
	angular.forEach(employeeNames, function(value) {
		vm.filterByEmployeeOptions.push({
			name: value,
			value: value
		})
	})


	// FILTER BY CUSTOMER NAME
	this.filterByCustomerOptions = [
		{
			name: 'All',
			value: ''
		}
	];
	angular.forEach(customerNames, function(value) {
		vm.filterByCustomerOptions.push({
			name: value,
			value: value
		})
	})


	// SORT BY SUBMISSION DATE
	this.issuesSortOrderOptions = [
		{
			name: 'Recent First',
			value: '-submission_timestamp'
		},
		{
			name: 'Recent Last',
			value: 'submission_timestamp'
		}
	];
	this.issuesSortOrder = this.issuesSortOrderOptions[0];



}]);
