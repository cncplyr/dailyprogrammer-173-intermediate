function Map(mapSize) {
	this.mapSize = mapSize;
	this.grid = this.makeGrid(mapSize);
}

Map.prototype.makeGrid = function(size) {
	array = [];
	for (var x = 0; x < size; x++) {
		array[x] = [];
		for (var y = 0; y < size; y++) {
			array[x][y] = 0;
		}
	}
	return array;
}

Map.prototype.put = function(x, y, obj) {
	var grid = this.grid;
	
	var posX = this.getSafeCoord(x);
	var posY = this.getSafeCoord(y);
	
	grid[posX][posY] = obj;
}

Map.prototype.get = function(x, y) {
	return this.grid[x][y];
}

// Toroid
Map.prototype.getSafeCoord = function(coord) {
	if (coord < 0) return this.mapSize - 1;
	if (coord >= this.mapSize) return 0;
	return coord;
}