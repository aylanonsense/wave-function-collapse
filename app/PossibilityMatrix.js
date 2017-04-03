define([
	'./PossibilityPixel'
], function(
	PossibilityPixel
) {
	function PossibilityMatrix(params) {
		this.samples = params.samples;
		this.width = params.width;
		this.height = params.height;
		this.possibilityPixels = [];
		for(var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				this.possibilityPixels.push(new PossibilityPixel({
					possibilityMatrix: this,
					samples: this.samples,
					x: x,
					y: y
				}));
			}
		}
		for(var i = 0; i < this.possibilityPixels.length; i++) {
			this.possibilityPixels[i].findNeighbors();
		}
	}
	PossibilityMatrix.prototype.getPossibilityPixelAt = function(x, y) {
		if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
			return null;
		}
		return this.possibilityPixels[x + y * this.width];
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
		var colorTable = this.samples[0].pixelMatrix.colorTable;
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				var color = this.getPossibilityPixelAt(x, y).averageColor;
				ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
				ctx.fillRect(scale * x + offsetX, scale * y + offsetY, scale, scale);
			}
		}
	};
	PossibilityMatrix.prototype.getLowestEntropyPixel = function() {
		var lowestEntropyPixel = null;
		for(var i = 0; i < this.possibilityPixels.length; i++) {
			var pixel = this.possibilityPixels[i];
			if(!pixel.isResolved && (lowestEntropyPixel === null || pixel.entropy < lowestEntropyPixel.entropy)) {
				lowestEntropyPixel = pixel;
			}
		}
		return lowestEntropyPixel;
	};
	PossibilityMatrix.prototype.resolvePixel = function(pixel) {
		pixel.resolve();
		pixel.recalculate();
		for(var i = 0; i < this.possibilityPixels.length; i++) {
			this.possibilityPixels[i].cullPossibleSamples();
			this.possibilityPixels[i].recalculate();
			if(this.possibilityPixels[i].possibleColors.length <= 1) {
				this.possibilityPixels[i].resolve();
				this.possibilityPixels[i].recalculate();
			}
		}
		/*var recalculateStack = [ pixel ];
		while(recalculateStack.length > 0) {
			var currPixel = recalculateStack.pop();
			for(var i = 0; i < currPixel.neighbors.length; i++) {
				var neighbor = currPixel.neighbors[i];
				if(neighbor && !neighbor.isResolved) {
					neighbor.cullPossibleSamples();
					if(neighbor.recalculate()) {
						if(neighbor.possibleColors.length <= 1) {
							neighbor.resolve();
							neighbor.recalculate();
						}
						recalculateStack.push(neighbor);
					}
				}
			}
		}*/
	};
	return PossibilityMatrix;
});