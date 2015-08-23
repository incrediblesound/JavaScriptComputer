var memoryFactory = require('./memory');
var osFactory = function(){
	var os = {};
	os.memory = memoryFactory(1000);
	os.variables = []; //['label', start, end]
	os.memAlloc = function(label, size){
		var newBlock;
		if(this.variables.length){
			var lastBlock = this.variables[this.variables.length-1];
			newBlock = [label, lastBlock[2]+1, lastBlock[2]+1+size];
		} else {
			newBlock = [label, 0, size-1];
		}
		this.variables.push(newBlock);
		return {
			memory: this.memory,
			start: newBlock[1]
		}
	},
	os.free = function(label){
		var x = 0, current;
		while(x < this.variables.length){
			current = this.variables[x];
			if(current === undefined){ break; }
			else if(current === label){
				this.variables.splice(x, 1);
			}
		}
	}
	os.copyBlock = function(start, end){
		var newBlock = this.memory.slice(start, end-start);
	}
	return os;
}

module.exports = osFactory;
