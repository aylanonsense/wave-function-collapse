define([
	'jquery',
	'./pixelSample.html'
],
function(
	$,
	formatPixelSample
) {
	function PixelMatrix(params) {
		this.pixelMatrix = params.pixelMatrix;
		this._count = params.count;
		this.$ele = null;
		this.$input = null;
	}
	PixelMatrix.prototype.addToDOM = function($parent, scale) {
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
	Object.defineProperty(PixelMatrix.prototype, 'count', {
		get: function() {
			if(this.$ele) {
				var count = +this.$input.val();
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