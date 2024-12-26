/*
    Strata by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$footer = $('#footer'),
			$main = $('#main'),
			settings = {
					// Parallax background effect?
					parallax: true,
					// Parallax factor (lower = more intense, higher = less intense).
					parallaxFactor: 20
			};

// Breakpoints.
breakpoints({
    xlarge: ['1281px', '1800px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
});

// Play initial animations on page load.
$window.on('load', function() {
    window.setTimeout(function() {
        $body.removeClass('is-preload');
        if (!browser.mobile) {
            // Scroll to the intro section on page load for non-mobile devices
            document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
});

// Touch?
if (browser.mobile) {
    // Turn on touch mode.
    $body.addClass('is-touch');
    // Height fix (mostly for iOS).
    window.setTimeout(function() {
        $window.scrollTop($window.scrollTop() + 1);
    }, 0);
}

// Footer.
breakpoints.on('<=medium', function() {
    $footer.insertAfter($main);
});

breakpoints.on('>medium', function() {
    $footer.appendTo($header);
});

// Header.
// Parallax background.
// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
if (browser.name == 'ie' || browser.mobile) settings.parallax = false;

if (settings.parallax) {
    breakpoints.on('<=medium', function() {
        $window.off('scroll.strata_parallax');
        $header.css('background-position', '');
    });

    breakpoints.on('>medium', function() {
        $header.css('background-position', 'left 0px');

        $window.on('scroll.strata_parallax', function() {
            $header.css(
                'background-position',
                'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px'
            );
        });
    });

    $window.on('load', function() {
        $window.triggerHandler('scroll');
    });
}

	$(document).ready(function() {
    const $nav = $('#nav');
    const $navToggle = $('#nav-toggle');
    const $navBackdrop = $('<div id="nav-backdrop"></div>');
    $('body').append($navBackdrop);

    // Toggle the navigation and backdrop on button click
    $navToggle.on('click', function(event) {
        event.stopPropagation();
        $nav.toggleClass('show'); // Slide down the menu
        $navBackdrop.toggleClass('show');
    });

    // Close the navigation if clicking outside of it
    $(document).on('click', function(event) {
        if ($nav.hasClass('show') && !$(event.target).closest('#nav, #nav-toggle').length) {
            $nav.removeClass('show');
            $navBackdrop.removeClass('show');
        }
    });

    // Close the navigation when clicking the backdrop
    $navBackdrop.on('click', function() {
        $nav.removeClass('show');
        $navBackdrop.removeClass('show');
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate(
                {
                    scrollTop: target.offset().top,
                },
                1000
            );
            // Close the menu after clicking a link
            $nav.removeClass('show');
            $navBackdrop.removeClass('show');
        }
    });

    // Initialize Poptrox for project images
    $('#projects .row').poptrox({
        caption: function($a) {
            return $a.closest('.work-item').find('h3').text();
        },
        overlayColor: '#000000',
        overlayOpacity: 0.7,
        usePopupCaption: true,
				usePopupDefaultStyling: false,
        usePopupEasyClose: false,
        usePopupNav: true,
        usePopupCloser: true,
        selector: 'a.image',
        popupSpeed: 300,
				windowMargin: (breakpoints.active('<=small') ? 0 : 50)
    });

    // Prevent Poptrox from activating on external links
    $('.external-link').on('click', function(event) {
        event.stopPropagation();
    });
});

	// Start webpage at top
	$(document).ready(function() {
			$('a[href^="#"]').on('click', function(event) {
					var target = $(this.getAttribute('href'));
					if (target.length) {
							event.preventDefault();
							$('html, body')
									.stop()
									.animate(
											{
													scrollTop: target.offset().top,
											},
											1000
									);
					}
			});
	});
})(jQuery);
