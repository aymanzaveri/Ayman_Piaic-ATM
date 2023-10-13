import * as readline from "readline-sync";

// Sample user data (In a real application, you'd store this in a database)
const users = [
  { id: 1, name: 'John', pin: '1234', balance: 1000 },
  { id: 2, name: 'Alice', pin: '5678', balance: 1500 },
];

let currentUser: any | null = null;

function authenticateUser() {
  const userId = readline.question('Enter User ID: ');
  const userPin = readline.question('Enter PIN: ');

  const user = users.find((u) => u.id === parseInt(userId) && u.pin === userPin);

  if (user) {
    console.log(`Welcome, ${user.name}!`);
    currentUser = user;
  } else {
    console.log('Authentication failed. Invalid user ID or PIN.');
  }
}

function checkBalance() {
  if (!currentUser) {
    console.log('Please authenticate first.');
    return;
  }

  console.log(`Your balance is $${currentUser.balance}`);
}

function deposit() {
  if (!currentUser) {
    console.log('Please authenticate first.');
    return;
  }

  const amount = parseFloat(readline.question('Enter the deposit amount: '));
  if (isNaN(amount) || amount <= 0) {
    console.log('Invalid amount.');
  } else {
    currentUser.balance += amount;
    console.log(`Deposited $${amount}. Your new balance is $${currentUser.balance}`);
  }
}

function withdraw() {
  if (!currentUser) {
    console.log('Please authenticate first.');
    return;
  }

  const amount = parseFloat(readline.question('Enter the withdrawal amount: '));
  if (isNaN(amount) || amount <= 0) {
    console.log('Invalid amount.');
  } else if (amount > currentUser.balance) {
    console.log('Insufficient funds.');
  } else {
    currentUser.balance -= amount;
    console.log(`Withdrawn $${amount}. Your new balance is $${currentUser.balance}`);
  }
}

function displayMenu() {
  console.log('ATM Menu:');
  console.log('1. Authenticate');
  console.log('2. Check Balance');
  console.log('3. Deposit');
  console.log('4. Withdraw');
  console.log('5. Exit');
}

function main() {
  while (true) {
    displayMenu();
    const choice = readline.question('Enter your choice: ');

    switch (choice) {
      case '1':
        authenticateUser();
        break;
      case '2':
        checkBalance();
        break;
      case '3':
        deposit();
        break;
      case '4':
        withdraw();
        break;
      case '5':
        console.log('Exiting. Have a nice day!');
        return;
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
}

main();
