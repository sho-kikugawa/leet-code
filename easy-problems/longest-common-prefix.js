/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
	const numStrs = strs.length;
	let streakBroken = false;
	let letterIdx = 0;

	if (strs[0].length === 0) {
		return "";
	}
	else if (strs.length === 1) {
		return strs[0];
	}

	let commonLetter = strs[0][0];

	while (streakBroken === false) {
		for(let i = 0; i < numStrs && streakBroken === false; i++) {
			streakBroken = commonLetter != strs[i][letterIdx];
		}
		
		if (streakBroken === false) {
			letterIdx ++;
			commonLetter = strs[0][letterIdx]; 
			if(letterIdx >= strs[0].length) {
				return strs[0].substring(0, letterIdx);
			}
		}

	}

	return strs[0].substring(0, letterIdx);
};