const Cpu = require('../cpu')
const programs = require('../programs/programs')

const cpu = new Cpu()

console.log('\n')
console.log('Program #1: (10 + 3)')
cpu.loadProgram(programs.one)
cpu.execute()
console.log('\n')

console.log('Program #2: (10 > 3)')
cpu.loadProgram(programs.two)
cpu.execute()
console.log('\n')

console.log('Program #3: print("Hello, world.")')
cpu.loadProgram(programs.three)
cpu.execute()
console.log('\n')

console.log('Program #4: (11 === 11)')
cpu.loadProgram(programs.four)
cpu.execute()
console.log('\n')
