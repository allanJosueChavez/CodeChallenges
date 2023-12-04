const { readFileSync } = require("fs");

const calibrationValues = readFileSync("./input.txt", "utf-8");
const lines = calibrationValues.split("\n");
let calibrationValuesSum = 0

// Part 1 
function findCalibrationValues (calibrationLines){
    calibrationLines.forEach(line => {
        const regex = /\d+/g
        const numbers = line.match(regex);
        if(numbers && numbers.length > 0){
            const mergedString = numbers.join('');
            const separateNumbers = mergedString.split('') 
            const firstNumber =  separateNumbers[0]  
            const lastNumber =  separateNumbers.pop()
            const concatFirstAndLast = parseInt(firstNumber + lastNumber);
            calibrationValuesSum = calibrationValuesSum + concatFirstAndLast
            // console.log(concatFirstAndLast)
        }
    })
    console.log("The sum of the calibrations values is:", calibrationValuesSum)
}


// Part two: Find the numbers written in letters and also taking into consideration in the search of the first digit and the last one.
const numbersInLetters = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]

async function findCalibrationValuesLettersAndNumbers(calibrationLines){
    calibrationLines.forEach(line => {
        line = line.toLowerCase()
        const matches = []  
        numbersInLetters.forEach((numberInLetters, index) =>{
            let match = line.match(new RegExp(numberInLetters, 'g'));
            if(match){
                matches.push(match)
                match.forEach(matchedString => {
                    let numericValue = numbersInLetters.indexOf(matchedString);
                    const lastLetter =  matchedString[(matchedString.length-1)]
                    const firstLetter =  matchedString[0]
                    line = line.replace(matchedString, `${firstLetter}${numericValue}${lastLetter}`);
                });
            }
        })

        const regex = /\d+/g
        const numbers = line.match(regex);
        if(numbers && numbers.length > 0){
            const mergedString = numbers.join('');
            const separateNumbers = mergedString.split('') 
            const firstNumber =  separateNumbers[0]  
            const lastNumber =  separateNumbers.pop()
            const concatFirstAndLast = parseInt(firstNumber + lastNumber);
            calibrationValuesSum = calibrationValuesSum + concatFirstAndLast
        }        
    })
    console.log("The sum of the calibrations values is:", calibrationValuesSum)
}
//  findCalibrationValues(lines)
 findCalibrationValuesLettersAndNumbers(lines)

