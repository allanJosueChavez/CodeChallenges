const {readFileSync} = require("fs");
const txtContent = readFileSync("./input.txt", "utf-8");

// Determine what type is each hand through rules
// Card example: 'J3T3T' 
// One pair two cards are the same.
// Two pair is two cards share the label and other two cards share the label.
// three of a kind is three cards share the label.
// Full house is three cards same label and the other two share other label.
// Four of a kind is four cards share the label.
// Five of a kind is all cards share the label.
// High type hand is all cards different.
// Compare every letter of the string
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function rankHandsAndCalculateWinnings(){
    let handSets = txtContent.split("\n");
    const NUMBERREGEX = /\d+/g;
    let rankedCards = []
    let handsOrderedByType = {
        1:{ hands: [], type: "Five of a kind" },
        2:{ hands: [], type: "Four of a kind" },
        3:{ hands: [], type: "Full house" },
        4:{ hands: [], type: "Three of a kind" },
        5:{ hands: [], type: "Two pair" },
        6:{ hands: [], type: "One pair" },
        7:{ hands: [], type: "High card" },
    }
 
    handSets = handSets.map(handSet => handSet.split(" "));
    handSets = handSets.map(handSet => {
        handSet[1] = parseInt(handSet[1].match(NUMBERREGEX))
        return  handSet;
    })

    handSets.forEach(handSet=>{
        const cards = handSet[0].split("")
        let type = determineHandType(cards)[1]
        handsOrderedByType[type].hands.push(handSet) 
    })
    const typesQuantity = 7
    for(let type = 1; type<=typesQuantity; type++){
        console.log(handsOrderedByType[type].hands);
        handsOrderedByType[type].hands = sortByCardsValue(handsOrderedByType[type].hands)
    }
    for(let type = 1; type<=typesQuantity; type++){
        handsOrderedByType[type].hands.forEach(handSet=>{
            // console.log("handSet: ", handSet);
             rankedCards.push(handSet)
        })
    }
    const totalWinnings = calculateTotalWinnings(rankedCards)
    console.log("The total winnings are: ", totalWinnings);
}

function calculateTotalWinnings(rankedCards){
    // console.log(rankedCards)
     let totalWinnings = 0;
        rankedCards.forEach((handSet, index)=>{
            console.log("ranking: ", index+1)
            const bid = handSet[1]
            const multiplier = index + 1
            const winnings = bid * multiplier
            totalWinnings = totalWinnings + winnings
        })
    return totalWinnings
}


// Now loop through the hands of every type and order it by the second rule 
// Second rule: The card with the strongest value first indicates that 
// A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2
const order = { A: 0, K: 1, Q: 2, J: 3, T: 4, '9': 5, '8': 6, '7': 7, '6': 8, '5': 9, '4': 10, '3': 11, '2': 12 };
function sortByCardsValue(cards){
    const sortedCards = cards.sort((a, b) => {
        const card1 = a[0];
        // console.log("card1: ", card1);
        const card2 = b[0];
        // console.log("card2: ", card2);
        return compareStrings(card1, card2);
      });
        return sortedCards
}

function compareStrings(card1, card2) {
    for (let i = 0; i < Math.min(card1.length, card2.length); i++) {
      const char1 = card1[i];
      const char2 = card2[i];
      if (order[char1] < order[char2]) {
        return -1; // card1 comes before card2
      } else if (order[char1] > order[char2]) {
        return 1; // card1 comes after card2
      }
      // Continue to the next character if they are equal
    }
  
    // If one string is a prefix of the other, the shorter one should come first
    return card1.length - card2.length;
  }


function determineHandType(handSetCards){
    let type = ""
    const cardCounts = {};
    handSetCards.forEach((card) => {
        // Assign a new attribute to the object with the name of the card
        // The value is the sum or 0 if it does not exist yet
        card = card.toString();  
        cardCounts[card] = (cardCounts[card] || 0) + 1;
    });
        // uniqueCardCount is the value of how many kinds of cards there are
       const uniqueCardCount = Object.keys(cardCounts).length; // This returns 
       if (uniqueCardCount === 5) {
            type = ["High card", 7]
       } else if (uniqueCardCount === 4) {
            type = ["One pair", 6];
       } else if (uniqueCardCount === 3) {
           const duplicateCount = Object.values(cardCounts).filter(count => count > 1).length;
            type = duplicateCount === 1 ? ["Three of a kind", 4]:[ "Two pairs", 5];
       } else if (uniqueCardCount === 2) {
           const duplicateCount = Object.values(cardCounts).filter(count => count > 1).length;
            type = duplicateCount === 1 ? ["Four of a kind", 2] :["Full house", 3];
       }else if(uniqueCardCount === 1){
            type = ["Five of a kind", 1]
       }
       return type;
}

rankHandsAndCalculateWinnings()



// Multiply with a reduce function and b.[index+1] * b.bid


// [ '5', '2', '2', '9', '5' ]

// how to compare if there's one, two or three duplicate elements in js. 
// function determineHandType(handSetCards){
//     let type = ""
//     handSetCards.forEach((card) =>{
//         let card
//     })
//     return type
// }