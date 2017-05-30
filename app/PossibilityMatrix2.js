define([
	'./PossibilityPixel2'
], function(
	PossibilityPixel
) {
	function PossibilityMatrix(params) {
		this.samples = params.samples;
		this.sampleWidth = params.sampleWidth;
		this.sampleHeight = params.sampleHeight;
		this.width = params.width;
		this.height = params.height;
		this.colorTable = params.colorTable;
		this.pixels = [];
		for(var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				this.pixels.push(new PossibilityPixel({
					parentMatrix: this,
					samples: this.samples,
					sampleWidth: this.sampleWidth,
					sampleHeight: this.sampleHeight,
					x: x,
					y: y,
					colorTable: this.colorTable
				}));
			}
		}
	}
	PossibilityMatrix.prototype.getPixelAt = function(x, y) {
		if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
			return null;
		}
		else {
			return this.pixels[x + y * this.width];
		}
	};
	PossibilityMatrix.prototype.getSumEntropy = function() {
		var sumEntropy = 0;
		for(var i = 0; i < this.pixels.length; i++) {
			sumEntropy += this.pixels[i].getEntropy();
		}
		return sumEntropy;
	};
	PossibilityMatrix.prototype.step = function() {
		var pixel = this.findLowestEntropyPixel();
		if(!pixel) {
			return true;
		}
		else {
			pixel.resolve();
			var hasPropagated;
			var reverse = false;
			var i;
			do {
				hasPropagated = false;
				if(reverse) {
					for(i = this.pixels.length - 1; i >= 0; i--) {
						if(this.pixels[i].requiresPropagation) {
							this.pixels[i].propagate();
							hasPropagated = true;
						}
					}
				}
				else {
					for(i = 0; i < this.pixels.length; i++) {
						if(this.pixels[i].requiresPropagation) {
							this.pixels[i].propagate();
							hasPropagated = true;
						}
					}
				}
				reverse = !reverse;
			} while(hasPropagated);
			return false;
		}
	};
	PossibilityMatrix.prototype.findLowestEntropyPixel = function() {
		var minEntropyPixel = null;
		var minEntropy = null;
		for(var i = 0; i < this.pixels.length; i++) {
			var pixel = this.pixels[i];
			var entropy = pixel.getEntropy() + Math.random() / 10000;
			if(!pixel.isResolved() /*&& entropy > 0*/ && (!minEntropyPixel || entropy < minEntropy)) {
				minEntropyPixel = pixel;
				minEntropy = entropy;
			}
		}
		return minEntropyPixel;
	};
	PossibilityMatrix.prototype.draw = function(params) {
		//collect params
		var $canvas = params.$canvas;
		var ctx = $canvas[0].getContext('2d');
		var offsetX = params.x || 0;
		var offsetY = params.y || 0;
		var scale = params.scale || 1;
		var fitCanvas = params.fitCanvas || false;
		//fit canvas
		if(fitCanvas) {
			$canvas.attr({
				width: scale * this.width,
				height: scale * this.height
			});
		}
		//draw pixels
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				var pixel = this.getPixelAt(x, y);
				if(!params.changesOnly || pixel._color === null) {
					var color = pixel.getColor();
					ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
					ctx.fillRect(scale * x + offsetX, scale * y + offsetY, scale, scale);
				}
			}
		}
	};
	return PossibilityMatrix;
});