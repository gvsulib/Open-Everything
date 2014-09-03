$(document).ready(function() {

	// Show answers when clicked
	$(".choice").click(function(e) {
		e.preventDefault();
		$(".choice").removeClass('oe-purple');
		$(".answer").removeClass('visible');
		$(this).addClass('oe-purple');
		$(this).next('.answer').addClass('visible');
	});
	
	var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
	var transform = "transform" in root.style ? "transform" : "webkitTransform";
	  var easeInOutCubic = function(t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t*t + b;
	    return c/2*((t-=2)*t*t + 2) + b;
	  };
	
	slowScroll('#access a.nextpanel', 'code');
	slowScroll('#code a.nextpanel', 'books');
	slowScroll('#books a.nextpanel', 'data');
	slowScroll('#data a.nextpanel', 'moreresources');
	slowScroll('#intro a.nextpanel', 'access');
	
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
	
	
});