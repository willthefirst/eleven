var KNOB = {

	height: 0,
	mouseY: 0,
	numOfStems: 0,
	stemRanges: [],
	stemRangeLength: 0,

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
		this.stemRangeLength = 100 / this.numOfStems;
		for (var i = 0; i < this.numOfStems; i++) {
			this.stemRanges.push(this.stemRangeLength * (i+1));
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
		// Check what stem range the mouse is currently in

		// zero case match
		if (this.mouseY <= this.stemRanges[0]) {
			$('.stem-range').html(this.stemRanges[0]);
		}
		else {
			for (var i = 0; i < this.numOfStems; i++) {
				if (this.mouseY >= this.stemRanges[i] && this.mouseY <= this.stemRanges[i+1]) {
					$('.stem-range').html(this.stemRanges[i]);
				}
				else {
					i++;
				}
			}
		}

	}

};


$( document ).ready(function() {
	KNOB.init();
});
