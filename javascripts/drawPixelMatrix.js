define([
	'PixelMatrixDrawer'
],function(
	PixelMatrixDrawer
) {
	return function drawPixelmatrix(params) {
		var drawer = new PixelMatrixDrawer(params);
		if(params.fitCanvas) {
			drawer.fitCanvas();
		}
		drawer.draw();
	};
});