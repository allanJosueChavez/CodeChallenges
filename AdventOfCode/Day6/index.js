const { readFileSync } = require("fs");
const { parse } = require("path");

const txtContent = readFileSync("./input.txt", "utf-8");
// Rule is simple. I need to beat the specified distance.
// For that I need to calculate the time I press the button, that time is the speed my boat is going to run when I release it and the distance must be enough to win in the specified time.
// 1. First split the data so I can organize the four races info
// 2. Define variables to multiply the quantity of ways I cant win
// 3. Loop through the distance and calculate if the result of the distance it's enough, then add one to the counter.

// Part 1
function determineWaysToWin() {
  let multipliedWays = 1;
  const NUMSREGEX = /\d+/g;
  const STATS = txtContent.split("\n");
  const times = STATS[0].match(NUMSREGEX);
  const racesLength = times.length;
  const distances = STATS[1].match(NUMSREGEX);
  let races = [];
  for (let race = 0; race < racesLength; race++) {
    races[race] = {
      distance: 0,
      time: 0,
    };
  }
  distances.forEach((distance, index) => {
    races[index].distance = parseInt(distance);
  });
  times.forEach((time, index) => {
    races[index].time = parseInt(time);
  });
  races.forEach((race, index) => {
    let waysToWin = 0;
    for (let second = 0; second <= race.time; second++) {
      const remainingTime = race.time - second;
      const feasible = second * remainingTime > race.distance;
      if (feasible) {
        waysToWin++;
      }
    }
    multipliedWays = multipliedWays * waysToWin;
  });
  console.log("The multiplied ways to beat the 3 races are:", multipliedWays);
}

determineWaysToWin();

// Part 2
function waysToWinSingleRace() {
  let multipliedWays = 1;
  const NUMSREGEX = /\d+/g;
  const STATS = txtContent.split("\n");
  const time = parseInt(STATS[0].match(NUMSREGEX).join(""));
  const distance = parseInt(STATS[1].match(NUMSREGEX).join(""));
  let race = {
    distance: distance,
    time: time,
  };
  let waysToWin = 0;
  for (let second = 0; second <= race.time; second++) {
    const remainingTime = race.time - second;
    const feasible = second * remainingTime > race.distance;
    if (feasible) {
      waysToWin++;
    }
  }
  multipliedWays = multipliedWays * waysToWin;
  console.log("The ways to win this single race is:", multipliedWays);
}

waysToWinSingleRace();
