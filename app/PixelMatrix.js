define(function() {
	function PixelMatrix(params) {
		this.pixels = params.pixels;
		this.width = params.width;
		this.height = params.height;
		this.colorTable = params.colorTable;
	}
	PixelMatrix.prototype.getPixelAt = function(x, y) {
		return this.pixels[x + y * this.width];
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