const { readFileSync } = require("fs");

const txtContent = readFileSync("./encryption_policies.txt", "utf-8");

let passwords = txtContent.split("\n");
function findInvalidFortySecondPassword() {
  let invalidPasswords = []
   passwords.forEach((password) => {
    const itemSplited = password.split(":");
    const policy = itemSplited[0];
    const pass = itemSplited[1].trim();
    const ranges = policy.split(" ")[0].split("-");
    const letter = policy.split(" ")[1];
    const min = parseInt(ranges[0]);
    const max = parseInt(ranges[1]);
    const regex = new RegExp(`a{${min},${max}}`);
    const passwordValid = regex.test(pass);
    if (!passwordValid) {
      invalidPasswords.push(pass);
    }
    console.log("INVALID PASSWORDS: ", invalidPasswords.length);
    if(invalidPasswords.length === 42){
      return
    } 
  })
  console.log("SOLUTION:")
  console.log("The forty second invalid password is:", invalidPasswords[42]  );
  
}

findInvalidFortySecondPassword()

// 1. Get the policy and the password
// 2. Evaluate the passwords and save them in a invalid passwords array
// 3. Print the 42
