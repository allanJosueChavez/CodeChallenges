const { readFileSync } = require("fs");
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
 
    // 10 = (7 - 2) * 2
    // 10 = (7 - x )* x
    // 10 = 7x - x^2
    // x^2 - 7x + 10 = 0
    // x = (-b +- sqrt(b^2 - 4ac))/2a
    // b is the time
    // a is 1
    // c is the distance
    const time = race.time;
    const distance = race.distance;
    
    let rangeStart = (-time + Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2;
    rangeStart = (-1) * rangeStart;
    rangeStart = Math.round(rangeStart);
    console.log("Range Start:", rangeStart);
    
    let result = (time + 1) - (2 * (rangeStart + 1));
    console.log("Ways to win (formula):", result);
    
    
    // 10 is the distance wanted. 7 is the time. 2 is the time I press the button. And 5 is the time I release the button.
    // Formula replaced with variables. startRange must be the time I press the button.
    let startRange = race.distance +1;
    for (let second = 1; second <= race.time; second++) {
      const remainingTime = race.time - second;
      const feasible = second * remainingTime > race.distance;
      console.log("distance", second,second * remainingTime)
      if (feasible) {
        waysToWin++;
      }
    }
    multipliedWays = multipliedWays * waysToWin;
    console.log("Ways to win,", waysToWin)
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
 