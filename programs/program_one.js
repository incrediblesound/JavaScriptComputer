var program_one = [
	['0101', '0000', '0000', '1010'], //store 10 in addr 0000
	['0101', '0001', '0000', '0011'], //store 3 in addr 0001
	['0110', '0000', '0001'], //add contents of 0000 and 0001
	['0111', '0000'], //print as number
	['1000'] //end
]

module.exports = program_one;