function Simulation(mapSize) {
	this.map = new Map(mapSize);
	this.map.simulation = this;
	
	this.ticks = 0;
	
	this.rules = 'LRLRR';
	
	this.ant = new Ant(Math.floor(mapSize / 2), Math.floor(mapSize / 2), mapSize, this.rules);
}

/**
 * Called to run a single tick on every agent in the simulation
 */
Simulation.prototype.tick = function() {
	if (this.ticks % 100 === 0) {
		console.log('ticks: ' + this.ticks);
	}
	
	var x = this.ant.x;
	var y = this.ant.y;
	var move = this.ant.tick(this.map.get(x, y));
	this.map.put(x, y, move);	
	
	this.ticks++;	
}
Simulation.prototype.parseRules = function(rules) {
	this.rules = rules;
}

// Ant
function Ant(x, y, max, rules){
	this.x = x;
	this.y = y;
	this.max = max - 1;
	this.direction = 0;
	
	this.rules = rules;
}
Ant.prototype.tick = function(current) {
	// change orientation
	var change = this.rules[current];
	if (change === "R") {
		if (this.direction === 3) {
			this.direction = 0;
		} else {
			this.direction++;
		}
	} else {
		if (this.direction === 0) {
			this.direction = 3;
		} else {
			this.direction--;
		}
	}
	
	// Move forward one
	switch (this.direction) {
		case 0:
			if (this.y === 0) {
				this.y = this.max;
			} else {
				this.y--;
			}
			break;
		case 1: 
			if (this.x === this.max) {
				this.x = 0;
			} else {
				this.x++;
			}
			break;
		case 2:
			if (this.y === this.max) {
				this.y = 0;
			} else {
				this.y++;
			}
			break;
		case 3:
			if (this.x === 0) {
				this.x = this.max;
			} else {
				this.x--;
			}
			break;
		default:
			console.log('something went wrong when moving');
	}
	
	// return new amount
	if (current < this.rules.length) {
		return current + 1;
	} else {
		return 0;
	}
}