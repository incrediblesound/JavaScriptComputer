var isOne = function(char){
	return char === '1';
}

var replaceAt = function(string, idx, unit){
	string = string.substr(0, idx) + unit + string.substr(idx+1);
	return string;
}

var createOne = function(len){
	var x = 0;
	var result = '';
	while(x < len){
		if(x < len-1){
			result += '0';
		} else {
			result += '1';
		}
		x++
	}
	return result;
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
	var x = 0, y = a.length;
	for(x; x < y; x++){
		if(isOne(a[x])){
			a[x] = '0';
		} else {
			a[x] = '1';
		}
	}
	return a
}

var xor = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y--){
		if((isOne(a[y]) && !isOne(b[y])) ||
		   (!isOne(a[y]) && isOne(b[y]))){
			a[y] = '1';
		} else {
			a[y] = '0';
		}
	}
	return a
}

var setToZero = function(a){
	return xor(a, a);
}

// math //
var add = function(a, b){
	var x = 0, y = a.length-1;
	var returnValue = '';
	for(y; y >= x; y--){
		if(isOne(a[y]) && isOne(b[y])){
			returnValue = '0' + returnValue;
			a = replaceAt(a, (y-1), '1');
		} else if(isOne(a[y]) || isOne(b[y])){
			returnValue = '1' + returnValue;
		} else {
			returnValue = '0' + returnValue;
		}
	}
	return returnValue
}

var subtract = function(a, b){
	b = not(b);
	b = add(b, createOne(b.length));
	return add(a, b);
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
	subtract: subtract,
	setToZero: setToZero
}
