function romanToInt(s) {
    const romanDigit = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };
    s = s.toUpperCase();

    let lastRoman = s[0];
    let number = romanDigit[s[0]];

    for(let i = 1; i < s.length; i++) {
        number += romanDigit[s[i]];

        switch(s[i]) {
            case "M":
            case "D":
                if(lastRoman === "C") { number -= 200;}
                break;
            case "C":
            case "L":
                if(lastRoman === "X") { number -= 20;}
                break;
            case "X":
            case "V":
                if(lastRoman === "I") { number -= 2;}
                break;
        }
        lastRoman = s[i];
    }
    return number;
};