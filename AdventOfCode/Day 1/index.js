const { readFileSync } = require("fs");

const calibrationValues = readFileSync("./input.txt", "utf-8");
let lines = calibrationValues.split("\n");
let calibrationValuesSum = 0

function findCalibrationValues (){
    lines.forEach(line => {
        const regex = /\d+/g
        const numbers = line.match(regex);
        if(numbers && numbers.length > 0){
            const mergedString = numbers.join('');
            const separateNumbers = mergedString.split('') 
            const firstNumber =  separateNumbers[0]  
            const lastNumber =  separateNumbers.pop()
            const concatFirstAndLast = parseInt(firstNumber + lastNumber);
            calibrationValuesSum = calibrationValuesSum + concatFirstAndLast
            console.log(concatFirstAndLast)
        }
    })
    console.log("The sum of the calibrations values is:", calibrationValuesSum)
}

findCalibrationValues()