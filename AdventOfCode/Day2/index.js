const { readFileSync } = require("fs");

const inputContent = readFileSync("./input.txt", "utf-8");
const games = inputContent.split("\n");

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

  console.log("The sum of the possible games ids is: ", gamesIdsSum);
  console.log("The number of possible games is: ", possibleGames.length);
}

determinePossibleGames(games);
