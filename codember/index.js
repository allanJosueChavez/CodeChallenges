const { readFileSync } = require("fs");

const contents = readFileSync("./message_01.txt", "utf-8");
const totalWords = contents.split(" ");

let words = []
let counters = []
let result = ''

totalWords.map((word) => {
    if (!words.includes(word)){
        console.log(word)
        words.push(word)
    }
})

words.map((word, index)=> {
    counters.push(0)
    totalWords.forEach((originalWord) =>{
        if(word == originalWord){
            counters[index]++
        }
    })    
})

words.map((word, index)=>{
    result = result + word + counters[index]
})

console.log(result)
