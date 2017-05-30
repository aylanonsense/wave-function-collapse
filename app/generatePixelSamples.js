define([
	'./PixelMatrix',
	'./PixelSample'
],function(
	PixelMatrix,
	PixelSample
) {
	function generateTransformations(pixelMatrix, canFlipHorizontal, canFlipVertical, canRotate90, canRotate180) {
		var transforms = [ pixelMatrix ];
		if(canFlipHorizontal || (canFlipVertical && canRotate90)) {
			transforms.push(pixelMatrix.flipHorizontal());
		}
		if(canFlipVertical || (canFlipHorizontal && canRotate90)) {
			transforms.push(pixelMatrix.flipVertical());
		}
		if(canRotate90) {
			transforms.push(pixelMatrix.rotate90Clockwise());
			transforms.push(pixelMatrix.rotate270Clockwise());
		}
		if(canRotate180 || canRotate90 || (canFlipHorizontal && canFlipVertical)) {
			transforms.push(pixelMatrix.rotate180Clockwise());
		}
		if(canRotate90 && (canFlipHorizontal || canFlipVertical)) {
			transforms.push(pixelMatrix.rotate90Clockwise().flipVertical());
			transforms.push(pixelMatrix.rotate270Clockwise().flipVertical());
		}
		return transforms;
	}
	return function generatePixelSamples(params) {
		var pixelMatrix = params.pixelMatrix;
		var sampleWidth = params.sampleWidth;
		var sampleHeight = params.sampleHeight;
		var canFlipHorizontal = params.canFlipHorizontal;
		var canFlipVertical = params.canFlipVertical;
		var canRotate90 = params.canRotate90;
		var canRotate180 = params.canRotate180;
		var pixelSamples = [];
		for(var x = 0; x < pixelMatrix.width + 1 - sampleWidth; x++) {
			for(var y = 0; y < pixelMatrix.height + 1 - sampleHeight; y++) {
				var pixels = [];
				for(var dy = 0; dy < sampleHeight; dy++) {
					for(var dx = 0; dx < sampleWidth; dx++) {
						pixels.push(pixelMatrix.getPixelAt(x + dx, y + dy));
					}
				}
				var pixelSampleMatrix = new PixelMatrix({
					pixels: pixels,
					width: sampleWidth,
					height: sampleHeight,
					colorTable: pixelMatrix.colorTable
				});
				var transforms = generateTransformations(pixelSampleMatrix, canFlipHorizontal, canFlipVertical, canRotate90, canRotate180);
				for(var i = 0; i < transforms.length; i++) {
					var alreadyExists = false;
					for(var j = 0; j < pixelSamples.length; j++) {
						if(transforms[i].equals(pixelSamples[j].pixelMatrix)) {
							alreadyExists = true;
							pixelSamples[j].count += 1;
							break;
						}
					}
					if(!alreadyExists) {
						pixelSamples.push(new PixelSample({
							pixelMatrix: transforms[i],
							count: 1
						}));
					}
				}
			}
		}
		return pixelSamples.sort(function(a, b) {
			return b.count - a.count;
		});
	};
});