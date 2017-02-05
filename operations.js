const isOne = (char) => {
  return char === '1'
}

const isTrue = (value) => {
  for (var x = 0; x < value.length; x++) {
    if (!isOne(value[x])) {
      return false
    }
  }
  return true
}

const replaceAt = (string, idx, unit) => {
  return `${string.substr(0, idx)}${unit}${string.substr(idx + 1)}`
}

const createOne = (size) => {
  const result = []
  result.length = size
  result.fill('0')
  result[size - 1] = '1'
  return result.join('')
}

const createBool = (size, bool) => {
  const result = []
  const filler = bool ? '1' : '0'
  result.length = size
  result.fill(filler)
  return result.join('')
}

// logic //
const and = (a, b) => {
  var result = ''
  for (let x = 0; x < a.length; x++) {
    result += isOne(a[x]) && isOne(b[x]) ? '1' : '0'
  }
  return result
}

const or = (a, b) => {
  var result = ''
  for (let x = 0; x < a.length; x++) {
    result += isOne(a[x]) || isOne(b[x]) ? '1' : '0'
  }
  return result
}

const xnor = (a, b) => {
  var result = ''
  for (let y = a.length - 1; y >= 0; y--) {
    if (isOne(a[y]) && isOne(b[y])) {
      result += '1'
    } else if (!isOne(a[y]) && !isOne(b[y])) {
      result += '1'
    } else {
      result += '0'
    }
  }
  return result
}

const not = (a) => {
  var result = ''
  for (let x = 0; x < a.length; x++) {
    result += isOne(a[x]) ? '0' : '1'
  }
  return result
}

const xor = (a, b) => {
  var result = ''
  for (let x = 0; x < a.length; x++) {
    result += (isOne(a[x]) && !isOne(b[x])) || (!isOne(a[x]) && isOne(b[x])) ? '1' : '0'
  }
  return result
}

const setToZero = (a) => {
  return xor(a, a)
}

// math //
const add = (a, b) => {
  var x = 0, y = a.length - 1
  var result = ''
  for (y; y >= x; y--) {
    if (isOne(a[y]) && isOne(b[y])) {
      result = '0' + result
      a = replaceAt(a, (y - 1), '1')
    } else if (isOne(a[y]) || isOne(b[y])) {
      result = '1' + result
    } else {
      result = '0' + result
    }
  }
  return result
}

const subtract = (a, b) => {
  b = not(b)
  b = add(b, createOne(b.length))
  return add(a, b)
}

const greaterThan = (a, b) => {
  for (let x = 0; x < a.length; x++) {
    if (isOne(a[x]) && !isOne(b[x])) {
      return createBool(a.length, true)
    }
  }
  return createBool(a.length, false)
}

const equals = (a, b) => {
  var result = xnor(a, b)
  return isTrue(result) ? result : createBool(a.length, false)
}

module.exports = {
  and: and,
  or: or,
  xor: xor,
  xnor: xnor,
  not: not,
  add: add,
  greaterThan: greaterThan,
  equals: equals,
  subtract: subtract,
  setToZero: setToZero
}
