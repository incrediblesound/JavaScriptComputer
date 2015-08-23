var memoryFactory = require('./memory');
var operations = require('./operations');
var os = require('./os')();
var virtualConsole = require('./console/console')();
var programs = require('./programs/programs');

var cpuFactory = function(){
	var cpu = {
		logic: {},
		control: {},
		running: false
	};
	cpu.registerMap = {
		'0000': [],
		'0001': [],
		'0010': [],
		'0011': [],
		'0100': []
	},
	cpu.instuctionStack = [];
	cpu.start = function(){
		while(this.running){
			var nextCommand = this.instuctionStack.shift();
			if(nextCommand !== undefined){
				this.process(nextCommand);
			}
		}
	}
	cpu.loadProgram = function(array){
		this.running = true;
		while(array.length && this.running){
			this.instuctionStack.push(array.shift());
		}
	}
	cpu.storeAt = function(location, block){
		this.registerMap[location] = [];
		while(block.length){
		this.registerMap[location].push(block.shift());
		}
	}
	cpu.process = function(block, currentOperation){
		currentOperation = currentOperation || block.shift();
		if(currentOperation === '0101'){
			var location = block.shift();
			this.storeAt(location, block)
		}
		else if(currentOperation === '0110' ||
				currentOperation === '0111'){
			var valueOne = this.registerMap[block.shift()];
			var valueTwo = this.registerMap[block.shift()];
			var result = this.logic.process([currentOperation, valueOne, valueTwo]);
			this.registerMap['0100'] = [];
			this.registerMap['0100'].push(result);
		}
		else if(currentOperation === '1001'){
			var type = block.shift();
			virtualConsole.print(type, this.registerMap['0100']);
		}
		else if(currentOperation === '1000'){
			this.running = false;
		}
	}
	cpu.logic.process = function(block, currentOperation){
		currentOperation = currentOperation || block.shift();
		return cpu.logic.operations[currentOperation](block);
	}
	cpu.logic.operations = {
		'0001': function(block){
			return operations.and(valueOne, valueTwo)
		},
		'0010': function(block){
			var valueOne = block[0].join('');
			var valueTwo = block[1].join('');
			return operations.or(valueOne, valueTwo)
		},
		'0011': function(block){
			var valueOne = block[0].join('');
			return operations.not(value)
		},
		'0110': function(block){
			var valueOne = block[0].join('');
			var valueTwo = block[1].join('');
			return operations.add(valueOne, valueTwo)
		},
		'0100': function(block){
			var valueOne = block[0].join('');
			var valueTwo = block[1].join('');
			return operations.xor(valueOne, valueTwo)
		},
		'0111': function(block){
			var valueOne = block[0].join('');
			var valueTwo = block[1].join('');
			return operations.equals(valueOne, valueTwo)
		}
	}
	return cpu;
}
// instruction = [['0000'],['0000'],['0000'],['0000']]
// where [ command, value, value, value]
/* instructions
 * and: '0001'
 * or: '0010'
 * not: '0011'
 * xor: '0100'
 * store: '0101'
 * add: '0110'
 * equals: '0111'
 * greaterThan: '1000'
 * print: '1001',
 * end: '1000'
 */

var cpu = cpuFactory();
cpu.loadProgram(programs.two);
cpu.start();