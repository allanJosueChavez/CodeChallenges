const { readFileSync } = require("fs")

const inputContent = readFileSync("./input.txt", "utf-8");
const cards = inputContent.split("\n");
 
function  calculateTotalPoints(){
    let totalPoints = 0
    const winningNumbersQuantity =  findWinningNumbers()
    winningNumbersQuantity.forEach(quantity =>{
        if(quantity === 0) return
        let partialSum = 1
        if(quantity > 1){
            for(let winningNumber = 1; winningNumber < quantity; winningNumber++){
                partialSum = partialSum * 2
            }
        }    
        totalPoints = totalPoints + partialSum
    })
    console.log("Total points count of total winning cards: ", totalPoints)

    
}

function findWinningNumbers(){
    const winningNumberPerCard = []
    cards.forEach(card_ => {
        let card = card_
        const NUMSREGEX =  /\d+/g
        card = card.split(":")
        card.shift()
        // Elements in the position [0] are winning numbers and [1] are all numbers
        card = card[0].split("|")
        const winningNumbers = card[0].match(NUMSREGEX)
        const allNumbers = card[1].match(NUMSREGEX)
        // Find the winning numbers in the al   l numbers array
        const commonElements = winningNumbers.filter(element => allNumbers.includes(element))
        winningNumberPerCard.push(commonElements.length)
    })
    return winningNumberPerCard
}

calculateTotalPoints()

