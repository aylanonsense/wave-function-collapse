require([
	'jquery',
	'Mustache',
	'./loadImageData',
	'./generatePixelSamples',
	'./ColorTable',
	'./PixelMatrix',
	'./PossibilityMatrix2',
	'GIF'
], function(
	$,
	Mustache,
	loadImageData,
	generatePixelSamples,
	ColorTable,
	PixelMatrix,
	PossibilityMatrix,
	GIF
) {
	$(function() {
		//vars
		var SCALE = 8;
		var inputColorTable = null;
		var inputMatrix = null;
		var sampleColorTable = null;
		var samples = [];
		var sampleWidth = 3;
		var sampleHeight = 3;
		var outputColorTable = null;
		var outputMatrix = null;
		var outputIsGenerated = false;
		var maxOutputEntropy = null;
		var outputGenerateInterval = null;
		//input section selectors
		var $inputSelect = $('#select-input-image');
		var $loadInput = $('#load-input-image');
		var $inputCanvas = $('#input-canvas');
		//samples section selectors
		var $samplesSection = $('#samples-section');
		var $samples = $('#samples');
		var $sampleWidth = $('#sample-width');
		var $sampleHeight = $('#sample-height');
		var $flipHorizontal = $('#flip-horizontal');
		var $flipVertical = $('#flip-vertical');
		var $rotate90 = $('#rotate-90');
		var $rotate180 = $('#rotate-180');
		//var $replaceSamples = $('#replace-samples');
		var $generateSamples = $('#generate-samples');
		//output section selectors
		var $outputSection = $('#output-section');
		var $resetOutput = $('#reset-output');
		var $stepOutput = $('#step-output');
		var $generateOutput = $('#generate-output');
		var $entropyRemaining = $('#entropy-remaining');
		var $entropyBar = $('#entropy-bar');
		var $entropyBarColor = $('#entropy-bar-color');
		var $outputCanvas = $('#output-canvas');
		//input section
		$loadInput.on('click', function() {
			loadImageData($inputSelect.val())
				.then(function(data) {
					//turn the raw image data into a matrix of pixel indices
					inputColorTable = new ColorTable({
						errorColor: { r: 0, g: 255, b: 0, a: 255}
					});
					inputMatrix = PixelMatrix.createFromImageData(data.pixelChannels, data.width, data.height, inputColorTable);
					inputMatrix.draw({
						$canvas: $inputCanvas,
						scale: SCALE,
						fitCanvas: true
					});
					$samplesSection.show();
				})
				.catch(function(err) {
					console.error(err);
					inputCanvas = null;
					inputMatrix = null;
				});
		});
		//samples section
		$generateSamples.on('click', function() {
			//if($replaceSamples.prop('checked')) {
				samples = [];
				$samples.empty();
			//}
			//then generate nxn matrices
			sampleColorTable = inputColorTable;
			var generatedSamples = generatePixelSamples({
				pixelMatrix: inputMatrix,
				sampleWidth: sampleWidth,
				sampleHeight: sampleHeight,
				canFlipHorizontal: $flipHorizontal.prop('checked'),
				canFlipVertical: $flipVertical.prop('checked'),
				canRotate90: $rotate90.prop('checked'),
				canRotate180: $rotate180.prop('checked')
			});
			for(var i = 0; i < generatedSamples.length; i++) {
				samples.push(generatedSamples[i]);
				generatedSamples[i].addToDOM($samples, SCALE);
			}
			$outputSection.show();
			initializeOutput();
		});
		//output section
		function initializeOutput() {
			stopGenerating();
			outputIsGenerated = false;
			outputColorTable = sampleColorTable;
			outputMatrix = new PossibilityMatrix({
				samples: samples,
				sampleWidth: sampleWidth,
				sampleHeight: sampleHeight,
				width: +$sampleWidth.val(),
				height: +$sampleHeight.val(),
				colorTable: outputColorTable
			});
			maxOutputEntropy = outputMatrix.getSumEntropy();
			$entropyRemaining.text(Math.ceil(maxOutputEntropy));
			$entropyBarColor.css({ width: '100%' });
			outputMatrix.draw({
				$canvas: $outputCanvas,
				scale: SCALE,
				fitCanvas: true
			});
			$generateOutput.prop('disabled', false);
			$stepOutput.prop('disabled', false);
		}
		function startGenerating() {
			if(!outputIsGenerated) {
				stopGenerating();
				$generateOutput.text('Pause');
				outputGenerateInterval = setInterval(function() {
					if(step()) {
						stopGenerating();
					}
				}, 5);
			}
		}
		function stopGenerating() {
			$generateOutput.text('Start Generating');
			if(outputGenerateInterval) {
				clearInterval(outputGenerateInterval);
			}
			outputGenerateInterval = null;
		}
		function step() {
			if(!outputIsGenerated) {
				outputIsGenerated = outputMatrix.step();
				var entropy = outputMatrix.getSumEntropy();
				$entropyRemaining.text(Math.ceil(entropy));
				$entropyBarColor.css({ width: Math.ceil(100 * entropy / maxOutputEntropy) + '%' });
				outputMatrix.draw({
					$canvas: $('#output-canvas'),
					scale: SCALE,
					changesOnly: true
				});
				if(outputIsGenerated) {
					stopGenerating();
					$generateOutput.prop('disabled', true);
					$stepOutput.prop('disabled', true);
				}
			}
			return outputIsGenerated;
		}
		$resetOutput.on('click', function() {
			initializeOutput();
		});
		$generateOutput.on('click', function() {
			if(outputGenerateInterval) {
				stopGenerating();
			}
			else {
				startGenerating();
			}
		});
		$stepOutput.on('click', function() {
			if(!outputIsGenerated) {
				stopGenerating();
				step();
			}
		});
	});
});