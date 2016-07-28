

app.filter('nameForURL', function() {
	return function(string) {
		var s = string.replace(/ /g, '-');
		return s;
	};
});



app.filter('moment', function() {
	return function(string) {



		var rawDate = string;
		var year = parseInt(rawDate.split('-')[0]);
		var month = parseInt(rawDate.split('-')[1]) - 1;
		var day = parseInt(rawDate.split('-')[2]);

		// var rawTime = string.split('T')[1];
		// var hours = parseInt(rawTime.split(':')[0]);
		// var minutes = parseInt(rawTime.split(':')[1]);
		// var seconds = parseInt(rawTime.split(':')[2]);

		var m = moment().year(year).month(month).date(day);

		//var m = moment().year(year).month(month).date(day).hours(hours).minutes(minutes);

		m = m.calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			lastDay: '[Yesterday]',
			lastWeek: 'D MMMM, YYYY',
			sameElse: 'D MMMM, YYYY'
		});
	  
		return m;


	};
});