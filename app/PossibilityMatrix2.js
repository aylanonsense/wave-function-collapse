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
	PossibilityMatrix.prototype.step = function() {
		var pixel = this.findLowestEntropyPixel();
		if(!pixel) {
			return true;
		}
		else {
			pixel.resolve();
			var propagationStack = [ pixel ];
			while(propagationStack.length > 0) {
				var pixel1 = propagationStack.pop();
				for(var x = pixel1.x - this.sampleWidth + 1; x < pixel1.x + this.sampleWidth; x++) {
					for(var y = pixel1.y - this.sampleHeight + 1; y < pixel1.y + this.sampleHeight; y++) {
						var pixel2 = this.getPixelAt(x, y);
						if(pixel2 && !pixel2.isResolved()) {
							if(pixel2.cullConflictingSamples(pixel1)) {
								propagationStack.push(pixel2);
							}
						}
					}
				}
			}
			return false;
		}
	};
	PossibilityMatrix.prototype.findLowestEntropyPixel = function() {
		var minEntropyPixel = null;
		var minEntropy = null;
		for(var i = 0; i < this.pixels.length; i++) {
			var pixel = this.pixels[i];
			var entropy = pixel.getEntropy() + Math.random() / 10000;
			if(!pixel.isResolved() && (!minEntropyPixel || entropy < minEntropy)) {
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
				var color = this.getPixelAt(x, y).getColor();
				ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
				ctx.fillRect(scale * x + offsetX, scale * y + offsetY, scale, scale);
			}
		}
	};
	return PossibilityMatrix;
});