 /* letter: '0001'(word) 'xxxx' length ...letters
 * number: '0000'
 * bool: '0010'
 */
var toValue = require('./toValue');
var consoleFactory = function(){
	var virtualConsole = {};
	virtualConsole.print = function(type, block){
		var printFunc = this.types[type];
		var currentByte;
		while(block.length){
			currentByte = block.shift();
			var value = printFunc(currentByte);
			console.log(value)
		}
	}
	virtualConsole.types = {
		'0000': function(bite){
			return toValue.numbers[bite];
		},
		'0001': function(bite){
			return toValue.letters[bite];
		},
		'0010': function(bite){
			return toValue.booleans[bite];
		}
	}
	return virtualConsole;
}

module.exports = consoleFactory;