define([
	'jquery',
	'./drawPixelMatrix',
	'./pixelSample.html'
],
function(
	$,
	drawPixelmatrix,
	formatPixelSample
) {
	function PixelMatrix(params) {
		this.pixelMatrix = params.pixelMatrix;
		this._count = params.count;
		this.$ele = null;
		this.$input = null;
	}
	PixelMatrix.prototype.addToDOM = function($parent) {
		var self = this;
		this.$ele = $(formatPixelSample({
			count: this._count
		})).appendTo($parent);
		this.$input = this.$ele.find('input');
		this.$input.on('change', function() {
			var count = +self.$input.val();
			self.count = isNaN(count) ? self._count : count;
		});
		drawPixelmatrix({
			pixelMatrix: this.pixelMatrix,
			$canvas: this.$ele.find('canvas'),
			scale: 5,
			fitCanvas: true
		});
	};
	Object.defineProperty(PixelMatrix.prototype, 'count', {
		get: function() {
			if(this.$ele) {
				var count = +self.$input.val();
				return isNaN(count) ? this._count : count;
			}
			else {
				return this._count;
			}
		},
		set: function(count) {
			this._count = count;
			if(this.$input) {
				this.$input.val(count);
			}
		}
	});
	return PixelMatrix;
});