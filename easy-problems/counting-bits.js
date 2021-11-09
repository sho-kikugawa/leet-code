/**
 * @param {number} n
 * @return {number[]}
 */
 var countBits = function(n) {
	let bitCounts = [0]
	for(let i = 1; i <= n; i++) {
		let num = i;
		let count = 0;
		while (num != 0) {
			count += num % 2;
			num = Math.floor(num/2);
		}
		bitCounts.push(count);
	}

	return bitCounts;
};