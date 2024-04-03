#! /usr/bin/env node
import inquirer from "inquirer";

console.log("----------------------------------------------");
console.log("              WAJJI BANK LIMITED              ");
console.log("----------------------------------------------");

let tries = 3;
let userData = {
  name: "Wajahat Mustafa Ali",
  pin: 1999,
  balance: 50000,
};
while (tries > 0) {
  let login = await inquirer.prompt([
    {
      message: "Enter Your Pin: ",
      type: "password",
      name: "pin",
    },
  ]);

  if (Number(login.pin) !== userData.pin) {
    console.log(`You have entered incorrect Pin. \n${tries - 1} try left.`);
    
  }
  
  else {
    tries = 0;
    let userD = await inquirer.prompt([
      {
      name: "option",
      type: "list",
      message: "Please select options: ",
      choices: ["Withdraw", "FastCash", "BalanceCheck", "PinChange"],
      },
      {
        name: "amount",
      type: "number",
      message: "Enter Amount in Multiple of 500 RS",
      when(userD){
        return userD.option === "Withdraw";
      }
      },
      {
        name: "amount",
        type: "list",
        message: "Enter Amount",
        choices: [500, 1000, 5000, 10000],
        when(userD){
          return userD.option === "FastCash";
        }
      },
      {
        name: "amount",
        type: "list",
        message: "Enter Amount",
        choices: [500, 1000, 5000, 10000],
        when(userD){
          return userD.option === "FastCash";
        }
      },
      {
        name: "AmountBalance",
        type: "number",
        message: `Your Balance is ${userData.balance}`,
        when(userD){
          return userD.option === "BalanceCheck";
        }
      },
      {
        name: "pin",
        type: "number",
        message: "Enter New Pin",
        when(userD){
          return userD.option === "PinChange";
        }
      }
  ]);

  if (userD.option === "Withdraw" || userD.option === "FastCash"){
    if(userD.amount>userData.balance){
      console.log ("You have Insufficient Balance")
    } else {
      userData.balance -= userD.amount;
      console.log (`${userD.amount} is successfully withdraw \n Your new balance is ${userData.balance}`)
    }
  } else if (userD.option === "Change Pin") {
    userData.pin = userD.pin;
    console.log(`Your new pin is ${userData.pin}`);
  }
   
  }
  tries--;
  if (tries === 0) {
    console.log(`Card Blocked`);
  }
}
