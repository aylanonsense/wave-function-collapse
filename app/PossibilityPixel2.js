define(function() {
	function PossibilityPixel(params) {
		this.parentMatrix = params.parentMatrix;
		this.samples = params.samples;
		this.coefficients = this.samples.map(function(sample) {
			return true;
		});
		this.sampleWidth = params.sampleWidth;
		this.sampleHeight = params.sampleHeight;
		this.x = params.x;
		this.y = params.y;
		this.colorTable = params.colorTable;
		this.requiresPropagation = false;
		this._isResolved = false;
		//cached values
		this._color = null;
		this._entropy = null;
	}
	PossibilityPixel.prototype.resolve = function() {
		this._isResolved = true;
		this.requiresPropagation = true;
		//pick a random sample
		var i;
		var sumCounts = 0;
		for(i = 0; i < this.samples.length; i++) {
			if(this.coefficients[i]) {
				sumCounts += this.samples[i].count;
			}
		}
		if(sumCounts > 0) {
			var r = sumCounts * Math.random();
			for(i = 0; i < this.samples.length; i++) {
				if(this.coefficients[i]) {
					if(r < this.samples[i].count) {
						for(var j = 0; j < this.coefficients.length; j++) {
							this.coefficients[j] = (j === i);
						}
						break;
					}
					else {
						r -= this.samples[i].count;
					}
				}
			}
		}
		this._color = null;
		this._entropy = null;
	};
	PossibilityPixel.prototype.propagate = function() {
		this.requiresPropagation = false;
		for(var x = this.x - this.sampleWidth + 1; x < this.x + this.sampleWidth; x++) {
			for(var y = this.y - this.sampleHeight + 1; y < this.y + this.sampleHeight; y++) {
				if(x !== this.x || y !== this.y) {
					var pixel2 = this.parentMatrix.getPixelAt(x, y);
					if(pixel2 && !pixel2.isResolved()) {
						pixel2.cullConflictingSamples(this);
					}
				}
			}
		}
	};
	PossibilityPixel.prototype.isResolved = function() {
		return this._isResolved;
	};
	PossibilityPixel.prototype.cullConflictingSamples = function(pixel) {
		var i;
		var hasASample = false;
		for(i = 0; i < pixel.coefficients.length; i++) {
			if(pixel.coefficients[i]) {
				hasASample = true;
				break;
			}
		}
		if(!hasASample) {
			return false;
		}
		var dx = this.x - pixel.x;
		var dy = this.y - pixel.y;
		var numSamples = 0;
		var numRemainingSamples = 0;
		for(i = 0; i < this.samples.length; i++) {
			if(this.coefficients[i]) {
				numSamples++;
				var hasMatch = false;
				for(var j = 0; j < pixel.samples.length; j++) {
					if(pixel.coefficients[j]) {
						if(this.samples[i].matches(pixel.samples[j], dx, dy)) {
							hasMatch = true;
							break;
						}
					}
				}
				if(!hasMatch) {
					this.coefficients[i] = false;
				}
				else {
					numRemainingSamples += 1;
				}
			}
		}
		if(numRemainingSamples < numSamples) {
			this._color = null;
			this._entropy = null;
			this.requiresPropagation = true;
			if(this.numRemainingSamples <= 1) {
				this.resolve();
			}
			return true;
		}
		else {
			return false;
		}
	};
	PossibilityPixel.prototype._calculateEntropy = function() {
		if(this.isResolved()) {
			return 0;
		}
		var i;
		var sumCounts = 0;
		for(i = 0; i < this.samples.length; i++) {
			if(this.coefficients[i]) {
				sumCounts += this.samples[i].count;
			}
		}
		var entropy = 0;
		for(i = 0; i < this.samples.length; i++) {
			if(this.coefficients[i]) {
				var probability = this.samples[i].count / sumCounts;
				if(probability > 0) {
					entropy -= probability * Math.log(probability) / Math.log(2);
				}
			}
		}
		return entropy;
	};
	PossibilityPixel.prototype.getEntropy = function() {
		if(this._entropy === null) {
			this._entropy = this._calculateEntropy();
		}
		return this._entropy;
	};
	PossibilityPixel.prototype._calculateColor = function() {
		var i;
		var sumCounts = 0;
		for(i = 0; i < this.samples.length; i++) {
			if(this.coefficients[i]) {
				sumCounts += this.samples[i].count;
			}
		}
		if(sumCounts > 0) {
			var avgColor = { r: 0, g: 0, b: 0, a: 0 };
			for(i = 0; i < this.samples.length; i++) {
				if(this.coefficients[i]) {
					var colorIndex = this.samples[i].pixelMatrix.getPixelAt(Math.floor(this.sampleWidth / 2), Math.floor(this.sampleHeight / 2));
					var color = this.colorTable.lookUpIndex(colorIndex);
					avgColor.r += color.r * this.samples[i].count / sumCounts;
					avgColor.g += color.g * this.samples[i].count / sumCounts;
					avgColor.b += color.b * this.samples[i].count / sumCounts;
					avgColor.a += color.a * this.samples[i].count / sumCounts;
				}
			}
			avgColor.r = Math.round(avgColor.r);
			avgColor.g = Math.round(avgColor.g);
			avgColor.b = Math.round(avgColor.b);
			avgColor.a = Math.round(avgColor.a);
			return avgColor;
		}
		else {
			return this.colorTable.errorColor;
		}
	};
	PossibilityPixel.prototype.getColor = function() {
		if(this._color === null) {
			this._color = this._calculateColor();
		}
		return this._color;
	};
	return PossibilityPixel;
});