const { readFileSync } = require("fs");
const { get } = require("http");

const inputContent = readFileSync("./input.txt", "utf-8");
const games = inputContent.split("\n");

// Part 1
function determinePossibleGames(games) {
  const cubesRules = [
    { color: "green", min: 13 },
    { color: "red", min: 12 },
    { color: "blue", min: 14 },
  ];

  let gamesIdsSum = 0;
  let possibleGames = [];
  games.forEach((game) => {
    // The error here is that the validation must not be counting the total cubes per subset. instead it must consider the amount per subset and the total amount of cubes per color.
    // The sum  of cubes in the subset then is useless at the moment, because it shouldn't be considered in the validation.
    const gameNumber = game.split(":")[0];
    const gameId = parseInt(gameNumber.split(" ")[1]);
    const gameCubesInfo = game.split(":")[1];
    const subsets = gameCubesInfo.split(";");
    let subsetsAssessment = [];
    // All subsets must meet the minimum amount of cubes per color. If so then add the gameId to the sum of possible games ids.
    subsets.forEach((subset) => {
      const cubesInfo = subset.split(",");
      let cubesCountAssessment = [];
      cubesInfo.forEach((cubeInfo) => {
        const NUMBERREGEX = /\d+/g;
        const LETTERSREGEX = /[a-z]/g;
        const amount = parseInt(cubeInfo.match(NUMBERREGEX));
        const color = cubeInfo.match(LETTERSREGEX).join("");
        const colorObject = cubesRules.find((rule) => rule.color === color);
        if (colorObject) {
          cubesCountAssessment.push(amount <= colorObject.min);
        }
      });
      const subsetAssessment = cubesCountAssessment.every(
        (item) => item === true
      );
      subsetsAssessment.push(subsetAssessment);
    });
    // Every function is used to check if all the array elements meet the condition.
    const gameAssessment = subsetsAssessment.every((item) => item === true);
    if (gameAssessment) {
      gamesIdsSum = gameId + gamesIdsSum;
      possibleGames.push({ gameId });
    }
  });
  console.log("------");
  console.log("Part one: ");
  console.log("The sum of the possible games ids is: ", gamesIdsSum);
  console.log("The number of possible games is: ", possibleGames.length);
}

determinePossibleGames(games);

// Part 2

function getSumOfSetPowers(games) {
  let sumOfSetPowers = 0;
  // 1. Loop through the games array. Find the subsets.
  // 2. Iterate the colors, if there's one amount per color higher then assign that as the power of the set.
  // 3. Those powers must be added to an array and then multiply them together
  // 4. The result of the multiplication must be added to the sum of set powers.

  games.forEach((game) => {
    const gameCubesInfo = game.split(":")[1];
    const subsets = gameCubesInfo.split(";");
    let higherAmountPerColor = [{ green: 0 }, { red: 0 }, { blue: 0 }];
    subsets.forEach((subset) => {
      const cubesInfo = subset.split(",");

      cubesInfo.forEach((cubeInfo) => {
        const NUMBERREGEX = /\d+/g;
        const LETTERSREGEX = /[a-z]/g;
        const amount = parseInt(cubeInfo.match(NUMBERREGEX));
        const color = cubeInfo.match(LETTERSREGEX).join("");
        const colorObject = higherAmountPerColor.find(
          (item) => Object.keys(item)[0] === color
        );
        if (colorObject) {
          if (amount > colorObject[color]) {
            colorObject[color] = amount;
          }
        }
      });
    });
    // Powers is going to turn my object into an array of values
    const powers = higherAmountPerColor.map((item) => Object.values(item)[0]);
    // constant multiply defines a function that receives two parameters and multiplies them
    const multiply = (a, b) => a * b;
    // a is the accumulator and b is the value of the element
    // the starter value of the accumulator will be the first element of the array
    // reduce receives an arrow function and it's going to iterate the (length - 1) times of the array
    // reduce function accumulates the result of the arrow function in the first parameter
    const powerOfSet = powers.reduce(multiply);
    sumOfSetPowers += powerOfSet;
  });
  console.log("------");
  console.log("Part two: ");
  console.log("The sum of the powers of the sets is: ", sumOfSetPowers);
}

getSumOfSetPowers(games);
