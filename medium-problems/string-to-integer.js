/**
 * @param {string} s
 * @return {number}
 */
 var myAtoi = function(s) {
	const digitMapping = {"0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9};
	const inputLen = s.length;
	let output = 0;
	let idx = 0;
	let numBuilder = [];
	let sign = 1;
	
	// Skip over spaces
	while(s[idx] === ' ' && idx < inputLen) {idx ++;}
	
	// Check if the next character is a - to determine sign
	if(s[idx] === '-') { sign = -1; idx ++;}
	else if(s[idx] === '+') { idx ++; }
	
	// Put numbers in numBuilder
	const validChars = "0123456789";
	while(validChars.indexOf(s[idx]) > -1 && idx < inputLen) {
		numBuilder.push(digitMapping[s[idx]]);
		idx++;
	}
	
	const digits = numBuilder.length;
	let magnitude = Math.pow(10, digits);
	idx = 0;
	while(idx < digits) {
		magnitude /= 10;
		output += numBuilder[idx] * magnitude;
		idx ++;
	}
	
	if(sign === -1 && output > Math.pow(2,31)) {
		output = Math.pow(2,31);
	}
	else if (sign === 1 && output > Math.pow(2,31) - 1) {
		output = Math.pow(2,31) - 1;
	}
	return output * sign;
};