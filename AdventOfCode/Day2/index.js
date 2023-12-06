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
  let gamesAssessment = [];
  gamesAssessment = games.map((game) => {
    game = [];
    return game;
  });
  games.forEach((game, index) => {
    const gameIndex = index;
    // The error here is that the validation must not be counting the total cubes per subset. instead it must consider the amount per subset and the total amount of cubes per color.
    // The sum  of cubes in the subset then is useless at the moment, because it shouldn't be considered in the validation.
    const gameNumber = game.split(":")[0];
    const gameId = parseInt(gameNumber.split(" ")[1]);
    console.log("gameId ", gameId);
    const gameCubesInfo = game.split(":")[1];
    const subsets = gameCubesInfo.split(";");
    let subsetsAssessment = [];
    // All subsets must meet the minimum amount of cubes per color. If so then add the gameId to the sum of possible games ids.
    subsets.forEach((subset, index) => {
      const cubesInfo = subset.split(",");
      let cubesCountAssessment = [];
      cubesInfo.forEach((cubeInfo, index) => {
        const cubeIndex = index;
        const NUMBERREGEX = /\d+/g;
        const LETTERSREGEX = /[a-z]/g;
        const amount = parseInt(cubeInfo.match(NUMBERREGEX));
        const color = cubeInfo.match(LETTERSREGEX).join("");
        const colorObject = cubesRules.find((obj) => obj.color === color);
        if (colorObject) {
        console.log("colorObject ", colorObject);
            cubesCountAssessment.push(amount <= colorObject.min);
        }
        // if (color === "red") {
        //   cubesCountAssessment.push(amount <= 12);
        // }
        // if (color === "green") {
        //   cubesCountAssessment.push(amount <= 13);
        // }
        // if (color === "blue") {
        //   cubesCountAssessment.push(amount <= 14);
        // }
      });
      const subsetAssessment = cubesCountAssessment.every(
        (item) => item === true
      );
      subsetsAssessment.push(subsetAssessment);
    });
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
