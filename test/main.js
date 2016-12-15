const Cpu = require('../cpu')
const programs = require('../programs/programs')

const cpu = new Cpu()

cpu.loadProgram(programs.one)
cpu.execute()
cpu.loadProgram(programs.two)
cpu.execute()
cpu.loadProgram(programs.three)
cpu.execute()
