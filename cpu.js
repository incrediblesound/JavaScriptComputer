var operations = require('./operations')
var virtualConsole = require('./console/console')()

/* OPERATIONS */
const STORE = '0101'
const PRINT = '1001'
const KILL = '1111'
/* REGISTERS */
const RETURN_VAL = '0100'

/* BLOCK LOCATIONS */
const BLOCK_OPERATION = 0
const BLOCK_LOCATION = 1
const BLOCK_PRINT_TYPE = 2
const BLOCK_VALUE_ONE = 1
const BLOCK_VALUE_TWO = 2
const BLOCK_STORE_VAL = 2

const operationMap = {
  '0001': 'and',
  '0010': 'or',
  '0011': 'not',
  '0100': 'xor',
  '0110': 'add',
  '0111': 'equals',
  '1000': 'greaterThan',
  '1010': 'subtract'
}

class Cpu {
  constructor () {
    // this.running = false
    this.pointer = 0
    this.operations = operations
  	this.registers = {
  		'0000': [],
  		'0001': [],
  		'0010': [],
  		'0011': [],
  		'0100': []
  }
  	this.instuctionStack = []
  }
  execute () {
    let nextBlock = this.instuctionStack[this.pointer]
    while (nextBlock) {
      this.process(nextBlock)
      this.pointer++
      nextBlock = this.instuctionStack[this.pointer]
    }
    this.pointer = 0
  }
  loadProgram (program) {
    this.instuctionStack = program.slice()
  }
  storeAt (location, block) {
    this.registers[location] = block.slice(BLOCK_STORE_VAL)
  }
  process (block, currentOperation) {
    var location
    currentOperation = currentOperation || block[BLOCK_OPERATION]
    switch (currentOperation) {
      case STORE:
        location = block[BLOCK_LOCATION]
        this.storeAt(location, block)
        break
      case PRINT:
        location = block[BLOCK_LOCATION]
        const type = block[BLOCK_PRINT_TYPE]
        virtualConsole.print(type, this.registers[location])
        break
      default:
        if (!this.operations[operationMap[currentOperation]]) {
          throw new Error(`Operation not found: ${currentOperation}`)
        }
  			const valueOne = this.prepareValue(this.registers[block[BLOCK_VALUE_ONE]])
  			const valueTwo = this.prepareValue(this.registers[block[BLOCK_VALUE_TWO]])
  			const result = this.operations[operationMap[currentOperation]](valueOne, valueTwo)
  			this.registers[RETURN_VAL] = result
    }
  }
  prepareValue (value) {
    /* prepares value to be processed by binary operation functions */
    if (typeof value === 'string') {
      return value
    } else {
      return value.join('')
    }
  }
}

module.exports = Cpu

// instruction = [['0000'],['0000'],['0000'],['0000']]
// where [ command, value, value, value]
