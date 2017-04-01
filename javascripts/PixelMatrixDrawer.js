define(function() {
	function PixelMatrixDrawer(params) {
		this.pixelMatrix = params.pixelMatrix;
		this.$canvas = params.$canvas;
		this.ctx = this.$canvas[0].getContext('2d');
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.scale = params.scale || 1;
	}
	PixelMatrixDrawer.prototype.draw = function() {
		for(var x = 0; x < this.pixelMatrix.width; x++) {
			for(var y = 0; y < this.pixelMatrix.height; y++) {
				var color = this.pixelMatrix.colorTable.lookUpIndex(this.pixelMatrix.getPixelAt(x, y));
				this.ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
				this.ctx.fillRect(this.x + this.scale * x, this.y + this.scale * y, this.scale, this.scale);
			}
		}
		return this;
	};
	PixelMatrixDrawer.prototype.fitCanvas = function() {
		this.$canvas.attr({
			width: this.scale * this.pixelMatrix.width,
			height: this.scale * this.pixelMatrix.height
		});
		return this;
	};
	return PixelMatrixDrawer;
});