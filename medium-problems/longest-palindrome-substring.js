/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
	// If the word is a single letter, return it
	if (s.length === 1) {return s;}

	// Check if the word itself is a palindrome
	if(checkPalindrome(s)) { return s; }

	// 1. Start with the next largest word size (n - 1)
	// 2. Get how many substring words we can make (n - wordSize)
	// 3. Make substrings of wordSize length, slide the window until
	//    the end.
	// 4. If we have a substring that's a panlindrome, return it;
	for(let wordSize = s.length - 1; wordSize > 1; wordSize --) {
		const numWords = s.length - wordSize + 1;
		for(let pos = 0; pos < numWords; pos++ ) {
			let sub = s.substring(pos, pos+wordSize);
			if (checkPalindrome(sub) === true) {
				return sub;
			}
		}
	}

	return s[0];
};


function checkPalindrome(s) {
	const halfPoint = Math.floor(s.length / 2);
	for (let i = 0; i < halfPoint; i++) {
		if(s[i] !== s[s.length - i - 1]) {
			return false;
		}
	}
	return true;
}
