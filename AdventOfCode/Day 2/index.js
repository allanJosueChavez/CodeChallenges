const { readFileSync } = require("fs");

const inputContent = readFileSync("./input.txt", "utf-8");
const games = inputContent.split("\n");


 
function determinePossibleGames(games){
    let gamesIdsSum = 0
    let possibleGames = []
   
    games.forEach(game =>{
        const gameNumber = game.split(":")[0]
        const gameId = parseInt(gameNumber.split(" ")[1])
        const gameCubesInfo =  game.split(":")[1]
        const subsets = gameCubesInfo.split(";")
        const cubesColors = ['green', 'red', 'blue']
        const cubesCountPerColor = [
            {color:"green", count:0 },
            {color:"red", count:0 },
            {color:"blue", count:0 }
        ]
        // console.log("------")
        subsets.forEach(subset => {


            const cubesInfo = subset.split(",")
            cubesColors.forEach(color =>{
                cubesInfo.forEach(cubeInfo =>{
                if(cubeInfo.includes(color)){
                   let cubeNumber = parseInt(cubeInfo.split(" ")[1])
                   const colorObject = cubesCountPerColor.find(obj => obj.color === color);
                   if (colorObject) {
                       colorObject.count += cubeNumber;
                   }
                }
                })

            })

        })
        // console.log("------")
        const metRedMin = cubesCountPerColor.some(item => (item.color === 'red' && item.count <= 12))
        const metGreenMin = cubesCountPerColor.some(item => (item.color === 'green' && item.count <= 13))
        const metBlueMin = cubesCountPerColor.some(item => (item.color === 'blue' && item.count <= 14))
               if (
                metRedMin && metGreenMin && metBlueMin
          ) {
            
            gamesIdsSum = gameId +gamesIdsSum
            possibleGames.push(cubesCountPerColor)
        }else{
            // console.log("impossible gameid: ", gameId)
            // console.log(cubesCountPerColor)
        }
       
    })
 
    console.log("The sum of the possible games ids is: ", gamesIdsSum)
    console.log("The number of possible games is: ",possibleGames.length)
}

determinePossibleGames(games)


