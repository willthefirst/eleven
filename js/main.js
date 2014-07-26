var KNOB = {

	config: {

	},

	height: 0,
	mouseY: 0,

	init: function() {
		this.getWindowHeight();
		this.trackMouse();
		this.layoutStems();
	},

	getWindowHeight: function() {
		this.height = $(window).height();
	},

	trackMouse: function() {
		var self = this;
		$('.wrapper').on('mousemove', function(e) {
			self.mouseY = 1 - (e.pageY / self.height);
			$('.mouse-y').html(self.mouseY);
		});
	},

	layoutStems: function() {

	}

};


$( document ).ready(function() {
	KNOB.init();
});
