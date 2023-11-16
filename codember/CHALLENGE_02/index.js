const { readFileSync } = require("fs");

const txtContent = readFileSync("./message_02.txt", "utf-8");
const symbols = txtContent.split("");
let hiddenMessage = ""
const increment = "#"
const decrease = "@"
const multiply = "*"
const print = "&"

let initialValue = 0

function getHiddenMessage(){
    symbols.forEach((symbol)=>{
        switch (symbol) {
            case increment:
              initialValue++
              break;
            case decrease:
              initialValue--
              break;
            case multiply:
              initialValue = initialValue*initialValue;
              break;
            case print:
                initialValue = initialValue.toString();
                console.log(initialValue);
                hiddenMessage += initialValue; // Use the += operator to concatenate strings
              break;
            default:
              console.log(`The symbol is invalid`);
          }
    
    })
    console.log('The hidden message is: ',hiddenMessage)
}

getHiddenMessage()

