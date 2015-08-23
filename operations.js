var isOne = function(char){
	return char === '1';
}

var and = function(a, b){
	var x = 0, y = a.length;
	var returnValue = '';
	for(x; x < y; x++){
		if(isOne(a[x]) && isOne(b[x])){
			returnValue += '1';
		} else {
			returnValue += '0';
		}
	}
	return returnValue
}

var or = function(a, b){
	var x = 0, y = a.length;
	var returnValue = '';
	for(x; x < y; x++){
		if(isOne(a[x]) || isOne(b[x])){
			returnValue += '1';
		} else {
			returnValue += '0';
		}
	}
	return returnValue
}

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

var not = function(a){
	var x = 0, y = a.length;
	var returnValue = '';
	for(x; x < y; x++){
		if(isOne(a[x])){
			returnValue += '0';
		} else {
			returnValue += '1';
		}
	}
	return returnValue
}

var xor = function(a, b){
	var x = 0, y = a.length;
	var returnValue = '';
	for(x; x < y; x++){
		if((isOne(a[x]) && !isOne(b[x])) ||
		   (!isOne(a[x]) && isOne(b[x]))){
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

module.exports = {
	and: and,
	add: add,
	or: or,
	xor: xor,
	not: not,
	setToZero: setToZero
}