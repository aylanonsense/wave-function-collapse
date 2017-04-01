define([
	'Promise'
],function(
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
			};
			img.src = src;
		});
	};
});