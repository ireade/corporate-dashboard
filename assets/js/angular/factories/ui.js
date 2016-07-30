app.factory('UIFactory', function() {

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

			var self = this;

			$('body').toggleClass('nav-open');

			if ( $('body').hasClass('nav-open') ) {
				$('.site-main').attr('aria-hidden', true);
				$('.site-sidebar').attr('aria-hidden', false);
				$('.site-nav li:first-child a').focus();

				$('.site-nav li a').on('click', function() {
					self.toggleNav();
				})

			} else {
				$('.site-main').attr('aria-hidden', false);
				$('.site-sidebar').attr('aria-hidden', true);
				$('.page-title .toggle-nav').focus();
			}

		},



	};

});