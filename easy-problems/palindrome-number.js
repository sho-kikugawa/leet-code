/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if((x < 0) || (x != 0 && (x % 10) === 0)) { return false; }
    else if ( 0 <= x && x <= 9 ) { return true;}
    let reverse = 0;
    let obverse = x;
    let lastReverse = 0;
  
    // Exits early if both "halves" of the number are equal
    while (lastReverse != obverse && 
           reverse != obverse && 
           obverse > 0) {
        lastReverse = reverse;
        reverse *= 10;
        reverse += (obverse % 10);
        obverse = Math.floor(obverse / 10);
    }
    
    // If obverse is 0, we exhausted the number so it's not a palindrome.
    return (obverse !== 0);
};
