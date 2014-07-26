var KNOB = {

	height: 0,
	mouseY: 0,
	numOfStems: 0,
	stemRanges: [],

	init: function() {
		this.getWindowHeight();
		this.countStems();
		this.trackMouse();
	},

	getWindowHeight: function() {
		this.height = $(window).height();
	},

	countStems: function() {
		this.numOfStems = $('.stems').children().length;
		for (var i = 0; i < this.numOfStems; i++) {
			this.stemRanges.push(100/this.numOfStems * (i+1));
		}
	},

	trackMouse: function() {
		var self = this;
		$('.wrapper').on('mousemove', function(e) {
			self.updateDOM(e);
			self.updateAudio(e);
		});
	},

	updateDOM: function(e) {
		this.mouseY = Math.round(100 * (1 - (e.pageY / this.height)));
		$('.mouse-y').html(this.mouseY);
	},

	updateAudio: function(e) {
		// Current mouse percentage tells us
		// console.log(e);
	}


};


$( document ).ready(function() {
	KNOB.init();
});
