function threeSum(nums) {
    let triples = [];
    if (nums.length >= 3) {
        nums.sort((a,b) => {return a-b});
        for(let i = 0; nums [i] < 1; i++) {
            if(i > 0 && nums[i] === nums[i-1]) {
                continue;
            }
            let j = i + 1;
            let k = nums.length;

            while (j < k) {
                const sum = nums[i] + nums[j] + nums[k];
                if (sum == 0) {
                    triples.push([nums[i], nums[j], nums[k]]);
                    do{ j++; } while (nums[j] == nums[j-1]);
                }
                else if (sum < 0) {
                    j++;
                }
                else {
                    do { k--; } while (nums[k] == nums[k+1]);
                }
            }
        }
    }
    return triples;
}