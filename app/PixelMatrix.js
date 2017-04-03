define(function() {
	function PixelMatrix(params) {
		this.pixels = params.pixels;
		this.width = params.width;
		this.height = params.height;
		this.colorTable = params.colorTable;
	}
	PixelMatrix.prototype.getPixelAt = function(x, y) {
		if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
			return null;
		}
		else {
			return this.pixels[x + y * this.width];
		}
	};
	PixelMatrix.prototype.equals = function(other) {
		//TODO return false if they use different color tables...?
		if(this.width !== other.width || this.height !== other.height) {
			return false;
		}
		for(var i = 0; i < this.pixels.length; i++) {
			if(this.pixels[i] !== other.pixels[i]) {
				return false;
			}
		}
		return true;
	};
	PixelMatrix.prototype.draw = function(params) {
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
				var color = this.colorTable.lookUpIndex(this.getPixelAt(x, y));
				ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
				ctx.fillRect(scale * x + offsetX, scale * y + offsetY, scale, scale);
			}
		}
	};
	PixelMatrix.createFromImageData = function(pixelChannels, width, height, colorTable) {
		var pixels = [];
		for(var i = 0; i < pixelChannels.length; i += 4) {
			pixels.push(colorTable.lookUpOrAddColor(
				pixelChannels[i],
				pixelChannels[i + 1],
				pixelChannels[i + 2],
				pixelChannels[i + 3]));
		}
		return new PixelMatrix({
			pixels: pixels,
			width: width,
			height: height,
			colorTable: colorTable
		});
	};
	return PixelMatrix;
});