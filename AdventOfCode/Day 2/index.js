const { readFileSync } = require("fs");

const inputContent = readFileSync("./input.txt", "utf-8");
const games = inputContent.split("\n");


 
function determinePossibleGames(games){
    let gamesIdsSum = 0
    let winnerIds = []
   
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
        subsets.forEach(subset => {


            const cubesInfo = subset.split(",")
            cubesColors.forEach(color =>{
                cubesInfo.forEach(cubeInfo =>{
                if(cubeInfo.includes(color)){
                   let cubeNumber = parseInt(cubeInfo.split(" ")[1])
                    // console.log(cubeNumber)
                   const colorObject = cubesCountPerColor.find(obj => obj.color === color);
                   if (colorObject) {
                       colorObject.count += cubeNumber;
                   }
                }
                })

            })

        })
        const metRedMin = cubesCountPerColor.some(item => (item.color === 'red' && item.count <= 12))
        const metGreenMin = cubesCountPerColor.some(item => (item.color === 'green' && item.count <= 13))
        const metBlueMin = cubesCountPerColor.some(item => (item.color === 'blue' && item.count <= 14))
               if (
                metRedMin && metGreenMin && metBlueMin
          ) {
            // console.log("The count for 'green' is equal to 11.");
            // console.log(gameId)
            gamesIdsSum = gameId +gamesIdsSum
            // console.log(cubesCountPerColor)
        }else{
            console.log("impossible gameid: ", gameId)
            console.log(cubesCountPerColor)
        }
        // if (
        //     cubesCountPerColor.some(
        //       item => (item.color === 'red' && item.count <= 12)          (item.color === 'blue' && item.count <= 14)
        //     )
        //   ) {
        //     // console.log("The count for 'green' is equal to 11.");
        //     console.log(gameId)
        //     // gamesIdsSum = gameId +gamesIdsSum
        //     console.log(cubesCountPerColor)
        // }
        // console.log(subsets)
        // const regex = /\d+/g
        // let allCubes = gameCubesInfo.match(regex);
        // allCubes = allCubes.map(cube => parseInt(cube))
        // let cubesSumPerGame = 0
        // console.log(" - - - ")
        // for (const cubesNumber of allCubes) {
        //     // console.log(cubesNumber)
        //     cubesSumPerGame += cubesNumber;
        // }
        // console.log(" - - - ")
        // console.log(cubesSumPerGame)
        // if (cubesSumPerGame === 12 ) {
        //     gamesIdsSum += gameId;
        //     console.log("yes")
            
        // }
        // // console.log(allCubes)
        // // console.log(gameId)

    })
 
    console.log("The sum of the possible games ids is: ", gamesIdsSum)
}

determinePossibleGames(games)


