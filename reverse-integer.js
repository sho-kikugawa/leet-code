/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const limit = Math.pow(2, 31) - 1;
    let output = 0;

    while( x !== 0) {
        output = output * 10;
        output += (x % 10);
        x = Math.trunc(x / 10);
    }
    
    if (-limit < output && output < limit) {return output;}
    else {return 0;}
};
