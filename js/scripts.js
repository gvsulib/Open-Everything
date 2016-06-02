$(document).ready(function() {
	
	// Date now shim
	if (!Date.now) {
	    Date.now = function() { return new Date().getTime(); };
	}
	
	// The old Kindle Fire browser is bad at showing position: fixed.
	// I don't want to run the lightbox on Kindle Fire
	var match = /\bSilk\/(.*\bMobile Safari\b)?/.exec(navigator.userAgent), isKindle = 0;
	if (match) {
		isKindle = 1;
	} 
	
	console.log(isKindle);

	// Set up navigation on small screens
	if($('#nav ul li').css('float') == 'none') { // small screen

		$('#nav ul').hide(); // Hide Nav
		$('body').css('padding-top','2.5em');
		$('#nav h2').css('cursor','pointer').click(function() {
			$('#nav ul').slideToggle(400);
		});


	}

	// Show answers when clicked
	$(".span2 .choice").click(function(e) {
		e.preventDefault();
		if($(this).hasClass('oe-purple')) {
			$(".choice").removeClass('oe-purple');
			$(".answer").removeClass('visible');
		} else {
			$(".choice").removeClass('oe-purple');
			$(".answer").removeClass('visible');
			$(this).addClass('oe-purple');
			$(this).next('.answer').addClass('visible');
			// Hide answers if you click on an open answer
			$(".answer").click(function() {
				$(".answer").removeClass('visible');
				$(".choice").removeClass('oe-purple');
			});
		}
	});
	
	
	
	// If JS is available, make the interaction stuff better
	
	$('form').find('input[type="submit"]').hide();
	$('form').find('input[type="checkbox"]').hide();
	$('form').find('div.textarea').hide();
	
	$("#whatdoyouthink").find('li').each(function() {
		$(this).removeClass('list-block').addClass('span4 unit right');
		
		// Choose a random color
		var newClass = randomFrom(['oe-orange', 'oe-fuschia', 'oe-blue', 'oe-green']);
		
		// Add the classes to the anchor links
		$(this).find('label').addClass('choice interaction ' + newClass);
	});
	
	// Record interaction feedback from What Do You Think section
	$("#whatdoyouthink label").click(function(e) {
		e.preventDefault();
		var rightNow = Date.now();

		if($(this).hasClass('textinput')) {
			// Needs to get a text box
			var textBox = $(this).parent('li').find('div.textarea'), questionText = $(this).text();
			textBox.prepend('<p><i>' + questionText + '</i></p>');
			textBox.append('<span class="cancel">Cancel</span>&nbsp;<span class="submit oe-purple">Tell Us</span>');
			textBox.addClass('modal').show();
			$('#whatdoyouthink').find(".fade").css('display','block');
			$("#whatdoyouthink").css('position','relative');
			
			// Add a close button handler
			$("#whatdoyouthink").find('.modal').find('.cancel').click(function() {
				$(this).closest('div.textarea').hide();
				$('#whatdoyouthink').find('.fade').hide();
			});
			
			// Set click handler for recording
			// Capture problem with text feedback
			$("#whatdoyouthink").find('.modal').find('.submit').click(function() {
				var answerChoice = questionText + $(this).parent('div.textarea').find('textarea').val();
				$(this).parent('div').parent('li').find('label').removeClass('choice').addClass('oe-ia-selected').text(answerChoice);
				$(this).closest('div.textarea').hide();
				$('#whatdoyouthink').find('.fade').hide();
				$.ajax({ url: 'record.php',
				         data: {time: rightNow, answer: answerChoice},
				         type: 'post',
				         success: function(output) {
				                     console.log(output);
				                  }
				});
			});
			
			
		} else {
			// Change colors, send to CSV file with timestamp
			var answerChoice = $(this).text();
			$(this).addClass('oe-ia-selected');
			$.ajax({ url: 'record.php',
			         data: {time: rightNow, answer: answerChoice},
			         type: 'post',
			         success: function(output) {
			                     console.log(output);
			                  }
			});
		}
	});
	
	
	// Lightbox effect on final images for all browsers except for Kindle Fire 1st gen
	if(isKindle == 0) {
		$(".js").find(".more-images").find("a").click(function(e) {
			e.preventDefault();
			var path = $(this).attr("href"), altText = $(this).attr("alt");
			$('body').append('<div class="lightbox"></div><div class="lightbox-close">[Close]</div><img src="' + path + '" alt="' + altText + '" class="lightbox-img" />');
			$('.lightbox').show();
		
			$('.lightbox-close').click(function() {
				$('.lightbox').remove();
				$('.lightbox-img').remove();
				$('.lightbox-close').remove();
			});
		});
	}
	
	// Setup for slow scroll
	var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
	var transform = "transform" in root.style ? "transform" : "webkitTransform";
	  var easeInOutCubic = function(t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t*t + b;
	    return c/2*((t-=2)*t*t + 2) + b;
	  };
	
	// Apply slow scrolling function
	slowScroll('#access a.nextpanel', 'code');
	slowScroll('#code a.nextpanel', 'books');
	slowScroll('#books a.nextpanel', 'data');
	slowScroll('#data a.nextpanel', 'whatdoyouthink');
	slowScroll('#intro a.nextpanel', 'access');
	slowScroll('#moreresources a.nextpanel', 'exhibit');
	slowScroll('#whatdoyouthink a.nextpanel', 'moreresources');
	slowScroll('#nav #access-nav a', 'access');
	slowScroll('#nav #books-nav a', 'books');
	slowScroll('#nav #code-nav a', 'code');
	slowScroll('#nav #data-nav a', 'data');
	slowScroll('#nav .secondary-links a#aboutlink', 'exhibit');
	
	
	
	function slowScroll(trigger, destination) {
		document.querySelector(trigger).addEventListener("click", function(e) {
		    var startTime
		    var startPos = root.scrollTop
		    var endPos = document.getElementById(destination).getBoundingClientRect().top
		    var duration = 2000
		    var scrollToExamples = function(timestamp) {
		      startTime = startTime || timestamp
		      var elapsed = timestamp - startTime
		      var progress = easeInOutCubic(elapsed, startPos, endPos, duration)
		      root.scrollTop = progress
		      if (elapsed < duration) requestAnimationFrame(scrollToExamples)
		    }
		    requestAnimationFrame(scrollToExamples)
		    e.preventDefault()
		  });
	}
	
	function randomFrom(array) {
	  return array[Math.floor(Math.random() * array.length)];
	}
		
});