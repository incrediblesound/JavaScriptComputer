 /* letter: '0001'(word) 'xxxx' length ...letters
 * number: '0000'
 * bool: '0010'
 */
var toValue = require('./toValue');
var consoleFactory = function(){
	var virtualConsole = {};
	virtualConsole.print = function(type, block){
		var printFunc = this.types[type];
		if(typeof block === 'string'){
      console.log(printFunc(block))
    }
	}
	virtualConsole.types = {
		'0000': function(bite){
      if(bite.length === 4){
        bite = '0000'+bite
      }
			return toValue.numbers[bite];
		},
		'0001': function(bite){
      if(bite.length === 4){
        bite = '0000'+bite
      }
			return toValue.letters[bite];
		},
		'0010': function(bite){
      if(bite.length === 4){
        bite = '0000'+bite
      }
			return toValue.booleans[bite];
		}
	}
	return virtualConsole;
}

module.exports = consoleFactory;
