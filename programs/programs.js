const program_one = [
	['0101', '0000', '0000', '1010'], // store 10 in addr 0000
	['0101', '0001', '0000', '0011'], // store 3 in addr 0001
	['0110', '0000', '0001'], // add contents of 0000 and 0001
	['1001', '0100', '0000'] // print as number
]

const program_two = [
	['0101', '0000', '0000', '1010'], // store 10 in addr 0000
	['0101', '0001', '0000', '0011'], // store 3 in addr 0001
	['1000', '0000', '0001'], // is 0000 value greater than 0001 value
	['1001', '0100', '0010'] // print result as boolean
]

const program_three = [
  ['0101', '0000', '0010', '0001', '0000', '0100', '0000', '1010',
	 '0000', '1010', '0000', '1101', '0011', '0101', '0011', '0110',
	 '0011', '0001', '0000', '1101', '0001', '0000', '0000', '1010',
	 '0000', '0011', '0011', '0111'], // store Hello, World. in addr 0000
	['1001', '0000', '0001'] // print addr 0000 as text
]

const program_four = [
	['0101', '0000', '0000', '1011'], // store 11 in addr 0000
	['0101', '0001', '0000', '1011'], // store 11 in addr 0001
	['0111', '0000', '0001'], // does 0000 value equal 0001 value
	['1001', '0100', '0010'] // print result as boolean
]

module.exports = {
  one: program_one,
  two: program_two,
  three: program_three,
	four: program_four
}
