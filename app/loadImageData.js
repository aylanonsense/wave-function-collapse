define([
	'jquery',
	'wavefunctioncollapse',
	'Promise'
],function(
	$,
	wfc,
	Promise
) {
	return function loadImageData(src) {
		return new Promise(function(resolve, reject) {
			var img = new Image();
			img.onload = function() {
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				resolve({
					pixelChannels: ctx.getImageData(0, 0, img.width, img.height).data,
					width: img.width,
					height: img.height
				});
				/*var imgData = ctx.getImageData(0, 0, img.width, img.height);
				var canvas2 = document.createElement('canvas');
				$(canvas2).attr({ width: 200, height: 200 }).appendTo('body');
				var ctx2 = canvas2.getContext('2d');
				var imgData2 = ctx2.createImageData(48, 48);
				var model = new wfc.OverlappingModel(imgData.data, imgData.width, imgData.height, 3, 48, 48, false, false, 1);
				model.generate(Math.random);
				model.graphics(imgData2.data);
				ctx2.putImageData(imgData2, 0, 0);*/
			};
			img.src = BASE_URL + src;
		});
	};
});