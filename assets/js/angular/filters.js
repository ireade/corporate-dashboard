app.filter('moment', function() {
	return function(string) {

		var rawDate = string;
		var year = parseInt(rawDate.split('-')[0]);
		var month = parseInt(rawDate.split('-')[1]) - 1;
		var day = parseInt(rawDate.split('-')[2]);

		var m = moment().year(year).month(month).date(day);

		m = m.calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			lastDay: '[Yesterday]',
			lastWeek: 'D MMM, YYYY',
			sameElse: 'D MMM, YYYY'
		});
	  
		return m;

	};
});