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

		toast: function(type, message) {

			console.log("toastubg")

			var toastContainerEl = document.querySelector('.toast-container');
		    var toastEl = document.querySelector('.toast');


		    toastEl.classList.remove('success', 'warning', 'danger'); 
		    toastEl.classList.add(type);
		    toastContainerEl.classList.add('open');   
		    toastEl.innerHTML = '\
		        <p>'+message+'</p>\
		        <button type="button" aria-label="Close Message" class="close-toast btn-bare"> Close </button>\
		    ';


		    document.querySelector('.close-toast').addEventListener('click', function() {
		        toastContainerEl.classList.remove('open');   
		    });

		}



	};

});