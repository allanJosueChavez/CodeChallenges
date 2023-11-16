const { readFileSync } = require("fs");

const txtContent = readFileSync("./message_01.txt", "utf-8");

const totalWords = txtContent.split(" ");

let words = []
let counters = []
let result = ''

for(word of totalWords){
    if(!words.includes(word)){
        words.push(word)
    }
}
words.forEach((word, index)=> {
    counters.push(0)
    totalWords.forEach((originalWord) =>{
        if(word == originalWord){
            counters[index]++
        }
    })    
})

for(let index = 0; index < words.length; index++){
    result = result + words[index] + counters[index]
}


console.log("The result is: ", result);
