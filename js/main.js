var KNOB = {

	height: 0,
	mouseY: 0,
	numOfStems: 0,
	stemRanges: [],
	stemRangeLength: 0,
	stemAudio : [],
	context: {},

	init: function() {
		this.getWindowHeight();
		this.countStems();
		this.trackMouse();
		this.createAudioContext();
	},

	createAudioContext : function() {

		var context;
		var bufferLoader;
		var stems = this.getAllTracks();
		var self = this;

		// Fix up prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();

		bufferLoader = new BufferLoader(
			context,
			stems,
			finishedLoading
		);

		bufferLoader.load();

		function finishedLoading(bufferList) {
			console.log('loaded baby');
			var source;
			for (var i = 0; i < self.numOfStems; i++) {
				source = context.createBufferSource();
				source.buffer = bufferList[i];
				source.connect(context.destination);
				self.stemAudio.push(source);
			}
			for (var i = 0; i < self.stemAudio.length; i++) {
				self.stemAudio[i].start(0);
			}
		}
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

	getAllTracks: function() {
		var array = [];
		for (var i = 0; i < this.numOfStems; i++) {
			var child = $('.stems').children("audio")[i];
			array.push(child.src);
		}
		return array;
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


// Make the Buffer Loader
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}