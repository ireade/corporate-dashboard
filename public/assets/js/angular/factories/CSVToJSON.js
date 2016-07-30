app.factory('CSVToJSON', function() {

	return function(string, columns) {

		var splitString = string.split(',');

		var response = [];

		// Get Keys (Headers)
		var keys = [];
		
		for (var i = 0; i < columns; i++) {
			var key = splitString.shift();
			key = key.toLowerCase().replace(/ /g, '_');
			keys.push(key);
		}

		// Convert the rest of the 
		var keyIndexPlaceholder = 0;
		var objPlaceholder = {};

		for (var i = 0; i < splitString.length; i++) {

			objPlaceholder[ keys[keyIndexPlaceholder] ] = splitString[i];

			keyIndexPlaceholder++;

			if ( keyIndexPlaceholder == columns ) {
				response.push(objPlaceholder)
				keyIndexPlaceholder = 0;
				objPlaceholder = {};
			}
		}
		return response;
	};

});