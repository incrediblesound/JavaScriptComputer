var isOne = function(char){
	return char === '1';
}
// logic //
var and = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y--){
		if(isOne(a[y]) && isOne(b[y])){
			returnValue += '1';
		} else {
			returnValue += '0';
		}
	}
	return returnValue;
}

var or = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y--){
		if(isOne(a[y]) || isOne(b[y])){
			returnValue += '1';
		} else {
			returnValue += '0';
		}
	}
	return returnValue;
}

var xnor = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y--){
		if(isOne(a[y]) && isOne(b[y])){
			returnValue += '1';
		}
		else if(!isOne(a[y]) && !isOne(b[y])){
			returnValue += '1';
		}
		else {
			returnValue += '0';
		}
	}
	return returnValue;
}
var not = function(a){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y++){
		if(isOne(a[y])){
			returnValue += '0';
		} else {
			returnValue += '1';
		}
	}
	return returnValue
}

var xor = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y--){
		if((isOne(a[y]) && !isOne(b[y])) ||
		   (!isOne(a[y]) && isOne(b[y]))){
			returnValue += '1';
		} else {
			returnValue += '0';
		}
	}
	return returnValue
}

var setToZero = function(a){
	return xor(a, a);
}

// math //
var add = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	var carry = false;
	for(y; y >= x; y--){
		if(carry){
			returnValue += '1';
			carry = false;
		} else if(isOne(a[y]) && isOne(b[y])){
			returnValue += '0';
			carry = true;
		} else if(isOne(a[y]) || isOne(b[y])){
			returnValue = '1' + returnValue;
		} else {
			returnValue = '0' + returnValue;
		}
	}
	return returnValue
}

var greaterThan = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	var carry = false;
	for(x; x < y; x++){
		if(isOne(a[x]) && !isOne(b[x])){
			return '11111111';
		}
	}
	return '00000000';
}

var equals = function(a, b){
	var result = xnor(a, b);
	if(result !== '11111111'){
		return '00000000';
	} else {
		return result;
	}
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
	setToZero: setToZero
}