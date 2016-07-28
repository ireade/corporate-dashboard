app.factory('API', ['$http', '$q', 'API_BASE_URL', function($http, $q, API_BASE_URL) {

	var companies = [
		{
			name: 'Paystack',
			logo_url: '/assets/img/paystack-logo.png',
			logo_colour: '#10273D', /* Needed in API */
			date_founded: '2016-07-27',
			company_size: '', /* What is this? */
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			featured: true,
			funding_information: 0, /* Help */
			twitter: '',
			facebook: '',
			linkedin: '',
			googleplus: '',
			website: '',
			phone_number: '',
			email: '',
			location: 'Lagos',
			category: 'Payment' /* This isn't in the API */
		},
		{
			name: 'Andela',
			logo_url: '/assets/img/paystack-logo.png',
			logo_colour: '#10273D',
			date_founded: '',
			company_size: '',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			funding_information: 0,
			twitter: '',
			facebook: '',
			linkedin: '',
			googleplus: '',
			website: '',
			phone_number: '',
			email: '',
			location: 'Lagos',
			category: 'Education'
		},
		{
			name: 'Go My Way',
			logo_url: '/assets/img/paystack-logo.png',
			logo_colour: '#10273D',
			date_founded: '',
			company_size: '',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			funding_information: 0,
			twitter: 'gomyway',
			facebook: 'gomyway',
			linkedin: '',
			googleplus: 'gomyway',
			website: 'gomyway.com',
			phone_number: '238420340',
			email: 'hello@gomyway.com',
			location: 'Lagos',
			category: 'Transportation'
		},
		{
			name: 'Iroko TV',
			logo_url: '/assets/img/paystack-logo.png',
			logo_colour: '#10273D',
			date_founded: '',
			company_size: '',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			funding_information: 0,
			twitter: '',
			facebook: '',
			linkedin: '',
			googleplus: '',
			website: '',
			phone_number: '',
			email: '',
			location: 'Lagos',
			category: 'Entertainment'
		}
	];


	var people = [
		{
			name: 'Mark Essien',
			image_url: '/assets/img/mark.png',
			gender: 'Male',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			featured: true,
			funding_information: 0,
			twitter: '',
			facebook: '',
			linkedin: '',
			googleplus: '',
			website: '',
			phone_number: '',
			email: '',
			company: 'company'
		},
		{
			name: 'Jared Mensah',
			image_url: '/assets/img/mark.png',
			gender: 'Male',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			funding_information: 0,
			twitter: '',
			facebook: '',
			linkedin: '',
			googleplus: '',
			website: '',
			phone_number: '',
			email: '',
			company: 'company'
		},
		{
			name: 'Tosin Akinfaminu',
			image_url: '/assets/img/mark.png',
			gender: 'Female',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			funding_information: 0,
			twitter: 'jmensah',
			facebook: '',
			linkedin: 'john-mensah',
			googleplus: '',
			website: 'mensah.com.gh',
			phone_number: '+2348037685943',
			email: 'hello@mensah.com.gh',
			company: 'company'
		},
		{
			name: 'Ofochi Akinwale',
			image_url: '/assets/img/mark.png',
			gender: 'Male',
			description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
			funding_information: 0,
			twitter: '',
			facebook: '',
			linkedin: '',
			googleplus: '',
			website: '',
			phone_number: '',
			email: '',
			company: 'company'
		},
		
	];





	// 

	return {

		people: {

			getPeople: function() {
				return $q(function(resolve, reject) {
					resolve(people);
				});
			},
			getFeaturedPeople: function() {
				return $q(function(resolve, reject) {
					resolve(people);
				});
			},
			getPerson: function(name) {
				return $q(function(resolve, reject) {

					console.log(name);

					var person;
					for (var i = 0; i < people.length; i++) {
						if ( people[i].name === name ) {
							person = people[i];
							break;
						}
					}
					resolve(person);
				});
			}

		},

		companies: {

			getCompanies: function() {
				return $q(function(resolve, reject) {
					resolve(companies);
				});
			},
			getFeaturedCompanies: function() {
				return $q(function(resolve, reject) {
					resolve(companies);
				});
			},
			getCompany: function(name) {
				return $q(function(resolve, reject) {

					var company;

					for (var i = 0; i < companies.length; i++) {
						if ( companies[i].name === name ) {
							company = companies[i];
							break;
						}
					}

					resolve(company);
				});
			}
		}

	};

}]);