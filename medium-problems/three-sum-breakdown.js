/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
	const numsLength = nums.length;
	if (numsLength < 3) {
		return [];
	}
	else if (numsLength === 3) {
		if (nums[0] + nums[1] + nums[2] == 0) {
			return [nums];
		}
		else {
			return [];
		}
	}
	else {
		let triples = [];

		let positives = {exists: {}, list: []};
		let negatives = {exists: {}, list: []};
		let zeroes = 0;

		for (let i = 0; i < numsLength; i++) {
			let number = nums[i];
			if( number > 0) { 
				if ( number in positives.exists === false ) { 
					positives.exists[number] = 0;
				}
				if (positives.exists[number] != 2) {
					positives.exists[number] ++;
					positives.list.push(number);
				}
			}
			else if( number < 0) { 
				if ( number in negatives.exists === false ) { 
					negatives.exists[number] = 0;
				}
				if (negatives.exists[number] != 2) {
					negatives.exists[number] ++;
					negatives.list.push(number);
				}
			}
			else { zeroes ++; }
		}

		positives.list.sort(function(a, b) {return a - b;});
		negatives.list.sort(function(a, b) {return a - b;});

		// Combinations:
		// #1 Two positives + one negative
		// #2 Two negatives + one positive
		// #3 One positive + one negative + one zero
		// #4 Three zeroes
		if (positives.list.length > 1) {
			getTwoSumTriplets(positives.list, negatives.exists, triples);
		}

		if (negatives.list.length > 1) {
			getTwoSumTriplets(negatives.list, positives.exists, triples);
		}

		// Checking combinations #3
		// If we don't have a 0, then we don't need to do this.
		if (zeroes > 0) {
			let nonZeroes = []
			for(const number in positives.exists) {
				nonZeroes.push(parseInt(number));
			}
			for(const number in negatives.exists) {
				nonZeroes.push(parseInt(number));
			}
			getTwoSumTriplets(nonZeroes, {0: 1}, triples);
		}

		// If we have three or more zeroes, then we can make a three sum combo.
		if (zeroes >= 3) {
			triples.push([0,0,0]);
		}
		return triples;
	}
};

function getTwoSumTriplets(nums, filter, output) {
	const outerLength = nums.length - 1;
	const innerLength = nums.length;
	let seenCombo = {}
	for (let i = 0; i < outerLength - 1; i++) {
		for(let j = i + 1; j < innerLength; j++) {
			const sum = nums[i] + nums[j];
			let twoNums = [nums[i], nums[j]];
			

			if (twoNums in seenCombo == false) {
				seenCombo[twoNums] = 1;
			}
			else {
				continue;
			}

			if (-sum in filter) {
				twoNums.push(-sum);
				twoNums.sort(function(a, b) {return a - b;});
				output.push(twoNums);
			}
		}
	}

	const sum = nums[outerLength-1] + nums[innerLength-1];
	let twoNums = [nums[outerLength-1], nums[innerLength-1]];
	twoNums.sort(function(a, b) {return a - b;});

	if (twoNums in seenCombo == false) {
		if (-sum in filter) {
			twoNums.push(-sum);
			output.push(twoNums);
		}
	}
}

function concatComboSums(twoSums, number) {
	const numTwoSums = twoSums.length;
	let triplets_hash = {};
	let triplets = [];
	for(let i = 0; i < numTwoSums; i++) {
		let numStr = twoSums[i].split(',')
		let triplet = [parseInt(numStr[0]), parseInt(numStr[1]), number]
		triplet.sort(function(a, b) {return a - b;});
		if ((triplet in triplets_hash) == false) {
			triplets.push(triplet);
			triplets_hash[triplet] = 1;
		}
	}
	return triplets
}