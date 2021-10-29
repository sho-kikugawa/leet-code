var lengthOfLongestSubstring = function(s) {
    let substring = "";
    let length = -1;
    const sLen = s.length;
    for(let idx = 0; idx < sLen; idx++) {
        const letter = s[idx];
        const letterIdx = substring.indexOf(letter);
        if(letterIdx !== -1) {
            if (substring.length > length) {
                length = substring.length
            }
            substring = substring.substring(letterIdx + 1);
        }
        
        substring += letter;
    }

    return (substring.length < length) ? length : substring.length;
};