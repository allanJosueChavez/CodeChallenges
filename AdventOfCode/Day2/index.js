const { readFileSync } = require("fs");

const inputContent = readFileSync("./input.txt", "utf-8");
const games = inputContent.split("\n");


 
function determinePossibleGames(games){
    let gamesIdsSum = 0
    let possibleGames = []
    console.log()
    games.forEach((game, index) =>{
        // if(index === 98){
        console.log("index ", index)
        // The error here is that the validation must not be counting the total cubes per subset. instead it must consider the amount per subset and the total amount of cubes per color.
        // The sum  of cubes in the subset then is useless at the moment, because it shouldn't be considered in the validation.
        const gameNumber = game.split(":")[0]
        const gameId = parseInt(gameNumber.split(" ")[1])
        console.log("gameId ",gameId)
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
            console.log(subset)

            const cubesInfo = subset.split(",")
            console.log(cubesInfo)
            cubesColors.forEach(color =>{

                cubesInfo.forEach(cubeInfo =>{
                    console.log(cubeInfo)
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
            possibleGames.push({cubesCountPerColor, gameId})
        }else{
            // console.log("impossible gameid: ", gameId)
            // console.log(cubesCountPerColor)
        }
    // }
    })
 
    console.log("The sum of the possible games ids is: ", gamesIdsSum)
    console.log("The number of possible games is: ",possibleGames.length)
    console.log("The possible games are: ",possibleGames)
}

determinePossibleGames(games)


