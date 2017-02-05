 /* letter: '0001'(word) 'xxxx' length ...letters
 * number: '0000'
 * bool: '0010'
 */
var toValue = require('./toValue')
var consoleFactory = function () {
  var virtualConsole = {}
  virtualConsole.print = function (type, block) {
    var printFunc = this.printTypes[type]
    let result = ''

    if (typeof block === 'string') {
      result = printFunc(block)
    } else if (block.length === 2) {
      result = printFunc(block.join(''))
    } else {
      while (block.length) {
        let head = block.shift()
        let tail = block.shift()
        let value = printFunc(head + tail)
        result = `${result}${value}`
      }
    }
    console.log('>>', result)
  }
  virtualConsole.printTypes = {
    '0000': (block) => {
      if (block.length === 4) {
        block = '0000' + block
      }
      return toValue.numbers[block]
    },
    '0001': (block) => {
      if (block.length === 4) {
        block = '0000' + block
      }
      return toValue.letters[block]
    },
    '0010': (block) => {
      if (block.length === 4) {
        block = block + block
      }
      return toValue.booleans[block]
    }
  }
  return virtualConsole
}

module.exports = consoleFactory
