const { readFileSync } = require("fs");

const inputContent = readFileSync("./input.txt", "utf-8");
const schematics = inputContent.split("\n");

function determineAdjacentNumbers(schematics) {
  let partNumbersSum = 0;
  const schematicsArrays = schematics.map((schematic) => {
    schematic = schematic.split("");

    return schematic;
  });

  schematicsArrays.forEach((schematicArray, index) => {
    const arrayIndex = index;
    let partNumber = "";
    console.log(schematicArray, "");
    schematicArray.forEach((character, index) => {
      const characterIndex = index;

      // if character is a number
      if (!isNaN(character) && character !== ".") {
        // If it's a number concat it with the next one
        partNumber = partNumber + character;
      } else {
        // If it's not a number, reset the partNumber
        // console.log("partNumber", partNumber);
        const nextCharacter = schematicArray[index + 1];
        const nextCharacterIsNumber = !isNaN(nextCharacter);
        const previousCharacter = schematicArray[index - 1];
        const previousCharacterIsNumber = !isNaN(previousCharacter);
        // characterLength is a variable to store the number of digits of the partNumber
        const characterLength = partNumber.length;

        // verify if the current is a symbol
        // verify if the same characterindex in the previous array is a symbol. Above the part number
        let rightUpperCorner = false;
        // verify if the same characterindex in the next array is a symbol. Below the part number
        let rightLowerCorner = false;
        // verify if the(the character is after the part number ends) (characterindex  - characterLength - 1) in the same array is a symbol (symbol before the partNumber starts). Before the part number
        let leftSide = false;
        // verify if the (characterindex  - characterLength - 1) in the previous array is a symbol. Character in the left upper corner of the part number
        let leftUpperCorner = false;
        // verify if the (characterindex  - characterLength - 1) in the next array is a symbol. Character in the left lower corner of the part number
        let leftLowerCorner = false;
        // Now it's needed to verify the characters above and below the part number. For that ill use a for loop
        const characterIsSymbol = isSymbol(character);
        if (schematicsArrays[arrayIndex - 1]) {
          if (schematicsArrays[arrayIndex - 1][characterIndex]) {
            rightUpperCorner = isSymbol(
              schematicsArrays[arrayIndex - 1][characterIndex]
            );
          }

          if (
            schematicsArrays[arrayIndex - 1][
              characterIndex - characterLength - 1
            ]
          ) {
            leftUpperCorner = isSymbol(
              schematicsArrays[arrayIndex - 1][
                characterIndex - characterLength - 1
              ]
            );
          }
        }
        if (schematicsArrays[arrayIndex + 1]) {
          if (schematicsArrays[arrayIndex + 1][characterIndex]) {
            rightLowerCorner = isSymbol(
              schematicsArrays[arrayIndex + 1][characterIndex]
            );
          }
          if (
            schematicsArrays[arrayIndex + 1][
              characterIndex - characterLength - 1
            ]
          ) {
            leftLowerCorner = isSymbol(
              schematicsArrays[arrayIndex + 1][
                characterIndex - characterLength - 1
              ]
            );
          }
        }
        if (
          schematicsArrays[arrayIndex][characterIndex - characterLength - 1]
        ) {
          leftSide = isSymbol(
            schematicsArrays[arrayIndex][characterIndex - characterLength - 1]
          );
        }

        let charactersAboveIsSymbolVerify = [];
        let charactersBelowIsSymbolVerify = [];

        for (let digit = 1; digit <= characterLength; digit++) {
          if (schematicsArrays[arrayIndex - 1]) {
            const characterAbove =
              schematicsArrays[arrayIndex - 1][characterIndex - digit];
            // console.log("characterAbove", characterAbove)
            const characterAboveIsSymbol = isSymbol(characterAbove);
            charactersAboveIsSymbolVerify.push(characterAboveIsSymbol);
          }
          if (schematicsArrays[arrayIndex + 1]) {
            const characterBelow =
              schematicsArrays[arrayIndex + 1][characterIndex - digit];
            // console.log("characterBelow", characterBelow)
            const characterBelowIsSymbol = isSymbol(characterBelow);
            charactersBelowIsSymbolVerify.push(characterBelowIsSymbol);
          }
        }
        // console.log(charactersAboveIsSymbolVerify)
        let charactersAboveIsSymbol = false;
        if (charactersAboveIsSymbolVerify.length > 0) {
          // verify there's at least one element true in the array of charactersAboveIsSymbolVerify
          charactersAboveIsSymbol = charactersAboveIsSymbolVerify.some(
            (item) => item === true
          );
        }
        let charactersBelowIsSymbol = false;
        if (charactersBelowIsSymbolVerify.length > 0) {
          // verify there's at least one element true in the array of charactersAboveIsSymbolVerify
          charactersBelowIsSymbol = charactersBelowIsSymbolVerify.some(
            (item) => item === true
          );
        }

        if (
          characterIsSymbol ||
          charactersAboveIsSymbol ||
          charactersBelowIsSymbol ||
          rightUpperCorner ||
          rightLowerCorner ||
          leftSide ||
          leftUpperCorner ||
          leftLowerCorner
        ) {
          if (parseInt(partNumber) > 0) {
            console.log(
              "+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + Part Number Found",
              partNumber
            );
            console.log(character);
            console.log("characterIsSymbol", characterIsSymbol);
            console.log("rightUpperCorner", rightUpperCorner);
            console.log("rightLowerCorner", rightLowerCorner);
            console.log("leftSide", leftSide);
            console.log("leftUpperCorner", leftUpperCorner);
            console.log("leftLowerCorner", leftLowerCorner);
            console.log("Is there a symbol above the number?", charactersAboveIsSymbol);
            console.log("Is there a symbol below the number?", charactersBelowIsSymbol);
            console.log(
              "Characters above the number",
              charactersAboveIsSymbolVerify
            );
            console.log(
                "Characters below the number",
              charactersBelowIsSymbolVerify
            );
            console.log("- - - - - ");

            partNumbersSum = partNumbersSum + parseInt(partNumber);
          }
        }
        partNumber = "";
      }
    });
  });
  // console.log(schematicsArrays)
  console.log("The sum of the part numbers is: ", partNumbersSum);
}

function isSymbol(character) {
  // different than dot and is not a number
  if (character !== "." && isNaN(character)) {
    return true;
  }
  return false;
}

determineAdjacentNumbers(schematics);
