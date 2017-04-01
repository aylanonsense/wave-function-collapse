require([
	'jquery',
	'Mustache',
	'./loadImageData',
	'./generatePixelSamples',
	'./drawPixelMatrix',
	'./ColorTable',
	'./PixelMatrix',
	'./PixelMatrixDrawer'
], function(
	$,
	Mustache,
	loadImageData,
	generatePixelSamples,
	drawPixelMatrix,
	ColorTable,
	PixelMatrix,
	PixelMatrixDrawer
) {
	$(function() {
		loadImageData('/img/pipes.png')
			.then(function(data) {
				//turn the raw image data into something consumable
				var colorTable = new ColorTable();
				var input = PixelMatrix.createFromImageData(data.pixelChannels, data.width, data.height, colorTable);
				drawPixelMatrix({
					pixelMatrix: input,
					$canvas: $('#input-canvas'),
					scale: 5,
					fitCanvas: true
				});
				//then generate 3x3 matrices
				var $samples = $('#samples');
				var sampleWidth = 3;
				var sampleHeight = 3;
				var samples = generatePixelSamples(input, sampleWidth, sampleHeight);
				for(var i = 0; i < samples.length; i++) {
					var $canvas = $('<canvas></canvas');
					var $sample = $('<div>' + samples[i].count + 'x</div>').append($canvas).appendTo($samples);
					drawPixelMatrix({
						pixelMatrix: samples[i].pixelMatrix,
						$canvas: $canvas,
						scale: 5,
						fitCanvas: true
					});
				}
			});
	});
});