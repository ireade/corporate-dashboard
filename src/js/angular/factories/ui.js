app.factory('UIFactory', function($state) {

	return {

		scrollTo: function(el, focusEl) {
			var s = 1000;

			$('html, body').animate({ 
				scrollTop: $(el).offset().top
			}, s);

			function focusNextElement() {
				setTimeout(function() { $(focusEl).focus(); }, s);
			}
			if ( focusEl ) { focusNextElement(); }
				
		},

		toggleNav: function() {

			$('body').toggleClass('nav-open');

			if ( $('body').hasClass('nav-open') ) {

				$('.site-main').attr('aria-hidden', true);
				$('.site-nav li:first-child a').focus();

			} else {

				$('.site-main').attr('aria-hidden', false);
				$('.page-title .toggle-nav').focus();

			}

		},



	};

});