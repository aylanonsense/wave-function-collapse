define([
	'jquery',
	'./pixelSample.html'
],
function(
	$,
	formatPixelSample
) {
	function PixelSample(params) {
		this.pixelMatrix = params.pixelMatrix;
		this._count = params.count;
		this.$ele = null;
		this.$input = null;
	}
	PixelSample.prototype.matches = function(sample, dx, dy) {
		for(var x = 0; x < this.pixelMatrix.width; x++) {
			for(var y = 0; y < this.pixelMatrix.height; y++) {
				var colorIndex = this.pixelMatrix.getPixelAt(x, y);
				var otherColorIndex = sample.pixelMatrix.getPixelAt(x + dx, y + dy);
				if(otherColorIndex !== null && otherColorIndex !== colorIndex) {
					return false;
				}
			}
		}
		return true;
	};
	PixelSample.prototype.addToDOM = function($parent, scale) {
		var self = this;
		this.$ele = $(formatPixelSample({
			count: this._count
		})).appendTo($parent);
		this.$input = this.$ele.find('input');
		this.$input.on('change', function() {
			var count = +self.$input.val();
			self.count = isNaN(count) ? self._count : count;
		});
		this.pixelMatrix.draw({
			$canvas: this.$ele.find('canvas'),
			scale: scale,
			fitCanvas: true
		});
	};
	Object.defineProperty(PixelSample.prototype, 'count', {
		get: function() {
			return this._count;
		},
		set: function(count) {
			this._count = count;
			if(this.$input) {
				this.$input.val(count);
			}
		}
	});
	return PixelSample;
});