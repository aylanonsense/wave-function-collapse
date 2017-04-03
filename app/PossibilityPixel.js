define(function() {
	function PossibilityPixel(params) {
		this.possibilityMatrix = params.possibilityMatrix;
		this.x = params.x;
		this.y = params.y;
		this.samples = params.samples;
		this.coefficients = this.samples.map(function(sample) {
			return 1;
		});
		this.isResolved = false;
		this.isError = false;
		this.resolvedColorIndex = null;
		this.neighbors = null;
		//some things are recalculated as things change
		this.colorCounts = null;
		this.possibleColors = null;
		this.averageColor = null;
		this.entropy = null;
		this.recalculate();
	}
	PossibilityPixel.prototype.findNeighbors = function() {
		var width = this.samples[0].pixelMatrix.width;
		var height = this.samples[0].pixelMatrix.height;
		var xStart = this.x - Math.floor(width / 2);
		var yStart = this.y - Math.floor(height / 2);
		this.neighbors = [];
		for(var y = yStart; y < yStart+ height; y++) {
			for(var x = xStart; x < xStart + width; x++) {
				this.neighbors.push(this.possibilityMatrix.getPossibilityPixelAt(x, y));
			}
		}
	};
	PossibilityPixel.prototype.resolve = function() {
		this.isResolved = true;
		var i;
		var sumCounts = 0;
		for(i = 0; i < this.colorCounts.length; i++) {
			sumCounts += this.colorCounts[i];
		}
		var r = sumCounts * Math.random();
		for(i = 0; i < this.colorCounts.length; i++) {
			if(r < this.colorCounts[i]) {
				this.resolvedColorIndex = i;
				return true;
			}
			else {
				r -= this.colorCounts[i];
			}
		}
		this.isError = true;
		console.error('Couldn\'t resolve pixel', this);
		return false;
	};
	PossibilityPixel.prototype.cullPossibleSamples = function() {
		for(var i = 0; i < this.samples.length; i++) {
			if(this.coefficients[i] > 0) {
				var sample = this.samples[i];
				for(var j = 0; j < sample.pixelMatrix.pixels.length; j++) {
					var neighbor = this.neighbors[j];
					var colorIndex = sample.pixelMatrix.pixels[j];
					if(neighbor && !neighbor.isError && neighbor.possibleColors.indexOf(colorIndex) < 0) {
						this.coefficients[i] = 0;
						break;
					}
				}
			}
		}
	};
	PossibilityPixel.prototype.recalculate = function() {
		var numPossibleColors = this.possibleColors ? this.possibleColors.length : 0;
		this.colorCounts = this.calculatePossibleColorCounts();
		this.possibleColors = this.calculatePossibleColors();
		this.averageColor = this.calculateAverageColor();
		this.entropy = this.calculateEntropy();
		return numPossibleColors !== this.possibleColors.length;
	};
	PossibilityPixel.prototype.calculatePossibleColorCounts = function() {
		var i;
		var colorTable = this.samples[0].pixelMatrix.colorTable;
		var colorCounts = [];
		for(i = 0; i < colorTable.colors.length; i++) {
			colorCounts[i] = 0;
		}
		if(this.isResolved) {
			if(!this.isError) {
				colorCounts[this.resolvedColorIndex] = 1;
			}
		}
		else {
			for(i = 0; i < this.samples.length; i++) {
				var pixelMatrix = this.samples[i].pixelMatrix;
				var colorIndex = pixelMatrix.getPixelAt(Math.floor(pixelMatrix.width / 2), Math.floor(pixelMatrix.height / 2));
				colorCounts[colorIndex] += this.coefficients[i] * this.samples[i].count;
			}
		}
		return colorCounts;
	};
	PossibilityPixel.prototype.calculatePossibleColors = function() {
		var possibleColors = [];
		for(var i = 0; i < this.colorCounts.length; i++) {
			if(this.colorCounts[i] > 0) {
				possibleColors.push(i);
			}
		}
		return possibleColors;
	};
	PossibilityPixel.prototype.calculateAverageColor = function() {
		var i;
		var colorTable = this.samples[0].pixelMatrix.colorTable;
		if(this.isResolved) {
			if(this.isError) {
				return colorTable.errorColor;
			}
			else {
				return colorTable.lookUpIndex(this.resolvedColorIndex);
			}
		}
		var avgColor = { r: 0, g: 0, b: 0, a: 0 };
		var sumCounts = 0;
		for(i = 0; i < colorTable.colors.length; i++) {
			sumCounts += this.colorCounts[i];
		}
		for(i = 0; i < this.colorCounts.length; i++) {
			avgColor.r += colorTable.colors[i].r * this.colorCounts[i] / sumCounts;
			avgColor.g += colorTable.colors[i].g * this.colorCounts[i] / sumCounts;
			avgColor.b += colorTable.colors[i].b * this.colorCounts[i] / sumCounts;
			avgColor.a += colorTable.colors[i].a * this.colorCounts[i] / sumCounts;
		}
		avgColor.r = Math.round(avgColor.r);
		avgColor.g = Math.round(avgColor.g);
		avgColor.b = Math.round(avgColor.b);
		avgColor.a = Math.round(avgColor.a);
		return avgColor;
	};
	PossibilityPixel.prototype.calculateEntropy = function() {
		if(this.isResolved) {
			return 0;
		}
		var i;
		var sumCounts = 0;
		for(i = 0; i < this.colorCounts.length; i++) {
			sumCounts += this.colorCounts[i];
		}
		var entropy = 0;
		for(i = 0; i < this.colorCounts.length; i++) {
			var probability = this.colorCounts[i] / sumCounts;
			if(probability > 0) {
				entropy -= probability * Math.log(probability) / Math.log(2);
			}
		}
		if(isNaN(entropy)) {
			debugger;
		}
		return entropy;
	};
	return PossibilityPixel;
});