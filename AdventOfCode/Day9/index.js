const {readFileSync} = require("fs");
const inputTxt = readFileSync("./input.txt", "utf-8");  
const NUMREGEX = /\d+/g;

function sumExtrapolatedValues(){
    let historyValues = inputTxt.split("\n").map(historyValue => {
        return historyValue.match(NUMREGEX).map(number=>{ return parseInt(number)})
    }
    )
    
}

sumExtrapolatedValues();