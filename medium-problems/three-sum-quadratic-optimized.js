function threeSum(nums) {
    let triples = [];
    if (nums.length >= 3) {
        nums.sort((a,b) => {return a-b});
        for(let i = 0; nums[i] < 1; i++) {
            for(let j = i + 1; j < nums.length - 1; j++) {
                if (nums[i] + nums[j] > 0) {
                    break;
                }
                let k = j + 1;
                while (nums[k] < 0) k++;
                for(; k < nums.length; k++) {
                    let sum = nums[i] + nums[j] + nums[k];
                    if (sum  === 0) {
                        triples.push([nums[i], nums[j], nums[k]]);
                        break;
                    }
                    else if (sum > 0) {
                        break;
                    }
                    else {
                        while (nums[k] === nums[k + 1]) k++;
                    }
                }
                while (nums[j] === nums[j + 1]) j++;
            }
            while (nums[i] === nums[i + 1]) i++;
        }
    }
    return triples;
}