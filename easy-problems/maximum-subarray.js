/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
	let largest = nums[0];
	let sum = nums[0];
	for (let i = 1; i < nums.length; i++ ) {
		if (sum < 0) {
			sum = nums[i];
		}
		else {
			sum += nums[i];
		}
		largest = (sum > largest) ? sum : largest;
	}
	return largest;
};
