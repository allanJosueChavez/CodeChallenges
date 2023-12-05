const { readFileSync } = require("fs");

const inputContent = readFileSync("./input.txt", "utf-8");
const cards = inputContent.split("\n");

// Part 1
function calculateTotalPoints() {
  let totalPoints = 0;
  const winningNumbersQuantity = findWinningNumbers();
  winningNumbersQuantity.forEach((quantity) => {
    if (quantity === 0) return;
    let partialSum = 1;
    if (quantity > 1) {
      for (let winningNumber = 1; winningNumber < quantity; winningNumber++) {
        partialSum = partialSum * 2;
      }
    }
    totalPoints = totalPoints + partialSum;
  });
  console.log("Total points count of total winning cards: ", totalPoints);
}

function findWinningNumbers() {
  const winningNumberPerCard = [];
  cards.forEach((card_) => {
    let card = card_;
    const NUMSREGEX = /\d+/g;
    card = card.split(":");
    card.shift();
    // Elements in the position [0] are winning numbers and [1] are all numbers
    if (!card[0]) return;
    card = card[0].split("|");
    const winningNumbers = card[0].match(NUMSREGEX);
    const allNumbers = card[1].match(NUMSREGEX);
    // Find the winning numbers in the al   l numbers array
    const commonElements = winningNumbers.filter((element) =>
      allNumbers.includes(element)
    );
    winningNumberPerCard.push(commonElements.length);
  });
  return winningNumberPerCard;
}

// calculateTotalPoints()

// Part 2
function evaluateCards() {
  let allCards = cards;
  let currentCardIndex = 0;
  let copyCounters = []; // the idea is to use another array isntead of concat the copy counter and add unnecesary complexity to the code
  copyCounters = allCards.map((counter, index) => {
    counter = 0;
    return counter;
  });
  allCards = allCards.map((card_, index) => {
    let card = card_;
    const NUMSREGEX = /\d+/g;
    card = card.split(":");
    card.shift(); // Because the first element is the card number and it's useless.
    // Elements in the position [0] are winning numbers and [1] are all numbers
    if (!card[0]) return;
    card = card[0].split("|");
    const winningNumbers = card[0].match(NUMSREGEX);
    const allNumbers = card[1].match(NUMSREGEX);
    // Find the winning numbers in the all numbers array
    const commonElements = winningNumbers.filter((element) =>
      allNumbers.includes(element)
    );
    // It's missing something:
    //if the card has copies (If it has counters. more specifcally a counter > 0 in the array of counters). Then I have to iterate those times and add more copies. 
    for (let i = 1; i <= commonElements.length; i++) {
      if (allCards[currentCardIndex + i]) {
        let counter = copyCounters[currentCardIndex + i];
        copyCounters[currentCardIndex + i] = parseInt(counter) + 1;
      }
    }
    currentCardIndex++;
  });
  return copyCounters;
}

function countObtainedCards() {
  const copyCounters = evaluateCards();
  let cardIndex = 0;
  let noMoreMatches = false;
  let cardsLengthAndCopiesSum = 0;
  while (!noMoreMatches) {
    let matchesCount = copyCounters[cardIndex];
    if (matchesCount > 1) {
        // This is summing the copies and the original card
      cardsLengthAndCopiesSum = cardsLengthAndCopiesSum + matchesCount + 1;
    }
        // Validating if a card has no matches and it's not the first card, because the first card will not have copies
    if (matchesCount === 0 && cardIndex !== 0) {
      noMoreMatches = true;
      break;
    }
    cardIndex++;
  }
  console.log("Total amount of copies and original cards, I end up with: ", cardsLengthAndCopiesSum);
}

countObtainedCards();

// 1. Find the winning numbers in each card
// 2. Loop through every card and find the winning numbers in the all numbers array of each card
// 3. Depending on the quantity of winning numbers of each card i'll add a copy of the cards (number equal to the quantity of winning numbers) to the same array. The copies will be added after the original. If I win copies of the card 2 and 3, the copy of two will be in the position 3 and the copy of 3 will be in the position 4.// 4. Return the length of total scratch cards gotten. Copies and original cards
