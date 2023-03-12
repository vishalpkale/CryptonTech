# CryptonTech



## 1. File Usage
Create a node js program "FileUsage" which accepts the directory as input
and prints the list of files and size.<br>
It should print in descending order (Big size files comes first)
Eg Output:<br>
45M File1.log<br>
25K File2.tmp<br>
2K Test.txt<br>
197B New.log<br>
124B README.md<br>


## 2. Bank Account Simulation
Create a typescript based api “BackAccount" class with following
functionalities:<br>
• openAccount - used to start the account. Parameters passed are "name,
gender, dob, email, mobile, address, initialBalance, adharNo, panNo, etc".
Store the information as account details. Only after opening we can do
transactions on this account.<br>
• updateKYC - used to update the account KYC details - Parameters passed
are "name, dob, email, mobile, adharNo, panNo". Update the KYC
information in account details.<br>
• depositMoney - used to deposit money in the account. Parameters passed
are "amount". Update the balance and create the ledger for this transaction.<br>
• withdrawMoney - used to withdraw money in the account. Parameters
passed are "amount". Update the balance and create the ledger for this
transaction.<br>
• transferMoney - used to transfer money to another account. Parameters
passed are "toName, amount". Update the balance and create the ledger for
this transaction.<br>
• receiveMoney - used to receive money to another account. Parameters
passed are "fromName, amount". Update the balance and create the ledger
for this transaction.<br>
• printStatement - Print the account details and transaction statements in neat
format..<br>
• closeAccount - Used to close the account. After closing the account no
transactions can be done on this account.<br>


## 3. Simple Calc
Create a node js command-line program "Calc" which accepts a question as
string eg "What is 5 plus 7?". This program parses the question and calculate
the result and print it eg: "5 plus 7 is 12".<br>
Program should support for add, subtract, multiply and divide operations.<br>
Input arg: What is 5 plus 7?<br>
Output: 5 plus 7 is 12<br>
Input arg: What is 9 minus 3?<br>
Output: 9 minus 3 is 6<br>
Input arg: What is 24 multiplied by 2?<br>
Output: 24 multiplied by 2 is 48<br>
Input arg: What is 60 divided by 5?<br>
Output: 60 divided by 5 is 12<br>


## 4. Simple User API
Create a node js express based program "UserApiServer" which provides
following REST Apis:<br>
• GET /users - Used to return list of the users which information like "id,
name, createdOn, gender, dob, city, state, pincode, modifiedOn"<br>
• POST /users - Used to create new user<br>
• PUT /users/<userId> - Used to update an existing user<br>
• DELETE /users/<userId> - Used to delete an existing user<br>
Note: You can store the users information in memory or json data file<br>

## 5. Order Summary
Create a node js program "OrderSummary" which reads a csv file data and
prints the total and summary of orders.<br>
Csv File Format:<br>
OrderDate,Code,Account,TotalIncl,TotalExcl,VatAmount<br>
12/09/2023,ORD0002032,Ram,28.08,26,2.08<br>
Output:<br>
No of orders: 5<br>
Total: 235.60<br>
Vat: 35.60<br>

