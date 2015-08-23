
module.exports = function(n){
	var memory = [];
	var block = [['0000'],['0000']];
	var x = 0;
	while(x < n){
		memory.push(block.slice());
		x++;
	}
	return memory;
}