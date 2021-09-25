class Account {

  constructor(username) {
    this.username = username;
    /* // Have the account balance start at $0 since that makes more sense.
    this.balance = 0; */
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    this.transactions.forEach(transaction => {
      balance += transaction.value;
    });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    //this.account.balance += this.value;

    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

  get value() {
    return -this.amount;
  }

}


// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(50.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
console.log('Transaction History:', myAccount.transactions);



/* const myAccount = new Account("snow-patrol");
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Ending Balance:', myAccount.balance); */
