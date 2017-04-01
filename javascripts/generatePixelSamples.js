define([
	'./PixelMatrix'
],function(
	PixelMatrix
) {
	return function generatePixelSamples(pixelMatrix, sampleWidth, sampleHeight) {
		var pixelSamples = [];
		for(var x = 0; x < pixelMatrix.width + 1 - sampleWidth; x++) {
			for(var y = 0; y < pixelMatrix.height + 1 - sampleHeight; y++) {
				var pixels = [];
				for(var dx = 0; dx < sampleWidth; dx++) {
					for(var dy = 0; dy < sampleHeight; dy++) {
						pixels.push(pixelMatrix.getPixelAt(x + dx, y + dy));
					}
				}
				var alreadyExists = false;
				var pixelSample = new PixelMatrix({
					pixels: pixels,
					width: sampleWidth,
					height: sampleHeight,
					colorTable: pixelMatrix.colorTable
				});
				for(var i = 0; i < pixelSamples.length; i++) {
					if(pixelSample.equals(pixelSamples[i].pixelMatrix)) {
						alreadyExists = true;
						pixelSamples[i].count += 1;
						break;
					}
				}
				if(!alreadyExists) {
					pixelSamples.push({
						pixelMatrix: pixelSample,
						count: 1
					});
				}
			}
		}
		return pixelSamples;
	};
});