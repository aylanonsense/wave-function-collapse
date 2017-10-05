/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = BASE_URL + (BASE_URL.endsWith('/') ? '' : '/');
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [
	__webpack_require__(0),
	__webpack_require__(8),
	__webpack_require__(5),
	__webpack_require__(4),
	__webpack_require__(2),
	__webpack_require__(1),
	__webpack_require__(3),
	__webpack_require__(7)
]; (function(
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
		var APPROX_FRAMES = 50;
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
		var prevFrameEntropy = null;
		var outputGenerateInterval = null;
		var gif = null;
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
		var $saveAsGif = $('#save-as-gif');
		var $entropyRemaining = $('#entropy-remaining');
		var $entropyBar = $('#entropy-bar');
		var $entropyBarColor = $('#entropy-bar-color');
		var $outputCanvas = $('#output-canvas');
		//helper functions
		function cloneCanvas(canvas) {
			var clone = document.createElement('canvas');
			var ctx = clone.getContext('2d');
			clone.width = canvas.width;
			clone.height = canvas.height;
			ctx.drawImage(canvas, 0, 0);
			return clone;
		}
		function doTheThing() {
			if ($inputSelect.val().length > 0) {
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
						// $samplesSection.show();
						samples = [];
						$samples.empty();
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
					})
					.catch(function(err) {
						console.error(err);
						inputCanvas = null;
						inputMatrix = null;
					});
			}
		}
		//input section
		$inputSelect.on('change', doTheThing);
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
			$saveAsGif.prop('disabled', true);
			gif = new GIF({
				workers: 10,
				quality: 1,
				debug: true
			});
			gif.addFrame(cloneCanvas($outputCanvas[0]), { delay: 1000 });
			prevFrameEntropy = maxOutputEntropy;
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
					$canvas: $outputCanvas,
					scale: SCALE,
					changesOnly: true
				});
				if (entropy + maxOutputEntropy / (APPROX_FRAMES + 1) < prevFrameEntropy || outputIsGenerated) {
					gif.addFrame(cloneCanvas($outputCanvas[0]), {
						delay: outputIsGenerated ? 2000 : 100
					});
					prevFrameEntropy = entropy;
				}
				if(outputIsGenerated) {
					stopGenerating();
					$generateOutput.prop('disabled', true);
					$stepOutput.prop('disabled', true);
					$saveAsGif.prop('disabled', false);
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
		$saveAsGif.on('click', function() {
			$saveAsGif.prop('disabled', true);
			gif.on('finished', function(blob) {
				window.open(URL.createObjectURL(blob));
			});
			gif.render();
		});
		doTheThing();
	});
}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);

/***/ })

/******/ });