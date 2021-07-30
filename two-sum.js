 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let usedNums = {}
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const diff = target - num
        if (usedNums[diff] !== undefined) return [usedNums[diff], i]
		else if (!usedNums[num]) usedNums[num] = i
    }
	console.log('No match')
};
