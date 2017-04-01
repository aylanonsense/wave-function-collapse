define(function() {
	function ColorTable() {
		this.colors = [];
	}
	ColorTable.prototype.hasColor = function(r, g, b, a) {
		return this.lookUpColor(r, g, b, a) >= 0;
	};
	ColorTable.prototype.lookUpColor = function(r, g, b, a) {
		for(var i = 0; i < this.colors.length; i++) {
			if(this.colors[i].r === r &&
				this.colors[i].g === g &&
				this.colors[i].b === b &&
				this.colors[i].a === a) {
				return i;
			}
		}
		return -1;
	};
	ColorTable.prototype.lookUpIndex = function(i) {
		if(i < this.colors.length) {
			return this.colors[i];
		}
		else {
			return null;
		}
	};
	ColorTable.prototype.addColor = function(r, g, b, a) {
		this.colors.push({ r: r, g: g, b: b, a: a });
		return this.colors.length - 1;
	};
	ColorTable.prototype.lookUpOrAddColor = function(r, g, b, a) {
		var i = this.lookUpColor(r, g, b, a);
		if(i >= 0) {
			return i;
		}
		else {
			return this.addColor(r, g, b, a);
		}
	};
	return ColorTable;
});