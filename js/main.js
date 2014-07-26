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
		this.playAllTracks();
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
			self.findCurrentRange(e);
		});
	},

	playAllTracks: function() {
		for (var i = 0; i < this.numOfStems; i++) {
			$('.stems').children()[i].play();
		}
	},

	updateDOM: function(e) {
		this.mouseY = Math.round(100 * (1 - (e.pageY / this.height)));
		$('.mouse-y').html(this.mouseY);
	},

	findCurrentRange: function(e) {
		// Check what stem range the mouse is currently in
		// zero case match
		if (this.mouseY <= this.stemRanges[0]) {
			this.updateAudio(0);
		}
		// all other matches
		else {
			for (var i = 0; i < this.numOfStems; i++) {
				if (this.mouseY >= this.stemRanges[i] && this.mouseY <= this.stemRanges[i+1]) {
					this.updateAudio(i);
				}
				else {
					i++;
				}
			}
		}
	},

	updateAudio: function( current_range ) {
		$('.stem-range').html(this.stemRanges[current_range]);

	}

};


$( document ).ready(function() {
	KNOB.init();
});
