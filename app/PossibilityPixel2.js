define(function() {
	function PossibilityPixel(params) {
		this.samples = params.samples;
		this.sampleWidth = params.sampleWidth;
		this.sampleHeight = params.sampleHeight;
		this.x = params.x;
		this.y = params.y;
		this.colorTable = params.colorTable;
		this._isResolved = false;
		//cached values
		this._color = null;
		this._entropy = null;
		this._recalculate();
	}
	PossibilityPixel.prototype.resolve = function() {
		this._isResolved = true;
		//pick a random sample
		if(this.samples.length > 1) {
			var i;
			var sumCounts = 0;
			for(i = 0; i < this.samples.length; i++) {
				sumCounts += this.samples[i].count;
			}
			var r = sumCounts * Math.random();
			for(i = 0; i < this.samples.length; i++) {
				if(r < this.samples[i].count) {
					this.samples = [ this.samples[i] ];
					break;
				}
				else {
					r -= this.samples[i].count;
				}
			}
			if(samples.length > 1) {
				debugger;
			}
		}
		this._recalculate();
	};
	PossibilityPixel.prototype.isResolved = function() {
		return this._isResolved;
	};
	PossibilityPixel.prototype.cullConflictingSamples = function(pixel) {
		var dx = pixel.x - this.x;
		var dy = pixel.y - this.y;
		var numSamples = this.samples.length;
		this.samples = this.samples.filter(function(sample) {
			for(var i = 0; i < pixel.samples.length; i++) {
				if(sample.matches(pixel.samples[i], dx, dy)) {
					return true;
				}
			}
			return false;
		});
		if(this.samples.length < numSamples) {
			this._recalculate();
			return true;
		}
		else {
			return false;
		}
	};
	PossibilityPixel.prototype._recalculate = function() {
		this._color = this._calculateColor();
		this._entropy = this._calculateEntropy();
	};
	PossibilityPixel.prototype._calculateEntropy = function() {
		if(this.isResolved()) {
			return 0;
		}
		var i;
		var sumCounts = 0;
		for(i = 0; i < this.samples.length; i++) {
			sumCounts += this.samples[i].count;
		}
		var entropy = 0;
		for(i = 0; i < this.samples.length; i++) {
			var probability = this.samples[i].count / sumCounts;
			if(probability > 0) {
				entropy -= probability * Math.log(probability) / Math.log(2);
			}
		}
		if(isNaN(entropy)) {
			debugger;
		}
		return entropy;
	};
	PossibilityPixel.prototype.getEntropy = function() {
		return this._entropy;
	};
	PossibilityPixel.prototype._calculateColor = function() {
		if(this.samples.length <= 0) {
			return this.colorTable.errorColor;
		}
		else {
			var avgColor = { r: 0, g: 0, b: 0, a: 0 };
			var i;
			var sumCounts = 0;
			for(i = 0; i < this.samples.length; i++) {
				sumCounts += this.samples[i].count;
			}
			for(i = 0; i < this.samples.length; i++) {
				var colorIndex = this.samples[i].pixelMatrix.getPixelAt(Math.floor(this.sampleWidth / 2), Math.floor(this.sampleHeight / 2));
				var color = this.colorTable.lookUpIndex(colorIndex);
				avgColor.r += color.r * this.samples[i].count / sumCounts;
				avgColor.g += color.g * this.samples[i].count / sumCounts;
				avgColor.b += color.b * this.samples[i].count / sumCounts;
				avgColor.a += color.a * this.samples[i].count / sumCounts;
			}
			avgColor.r = Math.round(avgColor.r);
			avgColor.g = Math.round(avgColor.g);
			avgColor.b = Math.round(avgColor.b);
			avgColor.a = Math.round(avgColor.a);
			return avgColor;
		}
	};
	PossibilityPixel.prototype.getColor = function() {
		return this._color;
	};
	return PossibilityPixel;
});