 
const { readFileSync } = require("fs");
const txtContent = readFileSync("./input.txt", "utf-8");

// Part 1

function calculateStepTillReachGoal(){
    const instructionsData = txtContent.split("\n");
    const directions = instructionsData[0].split("")
    instructionsData.shift() // Remove the directions
    const mapElements = instructionsData
    const map = buildMap(mapElements)
    let stepsCounter = 0
    const firstPoint = map.find((point) => point.key === 'AAA')
    let nextStep = null
    let goalReached = false
    
    directions.pop()  
    do{
        directions.forEach((direction, index) => {
            if(!goalReached){
            let currentPoint = stepsCounter === 0 ? firstPoint : nextStep
            currentPoint.key = currentPoint.key.trim()
            const indicator = direction === "L" ? "L" : "R"
                nextStep = map.find((point) => point.key === currentPoint[indicator])
                stepsCounter++
                if(nextStep.key === "ZZZ"){
                    goalReached = true
                    console.log("Reached the goal at step: ", stepsCounter)
                    return
                } 
            }
            
        })
    }while(!goalReached)
    console.log("The steps to reach the goal are: ", stepsCounter)
}

function buildMap(mapElements){
    mapElements.shift() // remove break line
    let map = mapElements.map((element) => {
        const LETTERSREGEX = /[A-Z]/g
        const elementKey = element.split("=")[0].trim()
        // console.log(element)
        const point = {
            key: elementKey,
            L:  element.split("=")[1].split(",")[0].trim().match(LETTERSREGEX).join(""),
            R:  element.split("=")[1].split(",")[1].trim().match(LETTERSREGEX).join(""),
        }
        return point
    })
    return map
}
// calculateStepTillReachGoal()

// Part 2

function calculateStepsToSpecifiedNodes(){
    const instructionsData = txtContent.split("\n");
    // The starting nodes are all the keys that end in 'A'
    const directions = instructionsData[0].split("")
    console.log("Directions: ", directions)
    instructionsData.shift() // Remove the directions
    const mapElements = instructionsData
    const map = buildMap(mapElements)
    let stepsCounter = 0
    const startingNodes = map.filter((point) => point.key.endsWith('A'))
    console.log("Starting nodes: ", startingNodes)
    let nextSteps = []
    let goalReached = false
    
    directions.pop()  
    do{
        directions.forEach((direction, index) => {
            if(!goalReached){
                let currentPoints = stepsCounter === 0 ?  startingNodes : nextSteps
                const indicator = direction === "L" ? "L" : "R"
                console.log("indicator: ", direction)
                nextSteps = []
                currentPoints.forEach((currentPoint) => {
                    const nextStep = map.find((point) => point.key === currentPoint[indicator])
                    nextSteps.push(nextStep)
                })
                console.log("Next steps: ", nextSteps)
                stepsCounter++
                // pointsEndInZ is a boolean value if all the keys of nextSteps end in Z
                const pointsEndInZ = nextSteps.every((point) => point.key.endsWith('Z'))
                console.log("Points end in Z: ", pointsEndInZ)
                
                if(pointsEndInZ){
                    goalReached = true
                    console.log("Reached the goal at step: ", stepsCounter)
                    return
                } 
           
            }
            
        })
    }while(!goalReached)
    console.log("The steps to reach all nodes that end in Z: ", stepsCounter)
}
calculateStepsToSpecifiedNodes()


