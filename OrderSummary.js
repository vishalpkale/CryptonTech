const fs = require('fs');

const fileContents = (fs.readFileSync('new.csv')).toString();// Read CSV file

const lines = fileContents.trim().split('\n');// Split the file contents into lines

const headers = lines.shift().split(',');// Extract the header row and remove it from the lines array

let orderCount = 0;
let orderTotal = 0;
let vatTotal = 0;


for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(',');
  const totalIncl = parseFloat(values[3]);
  const vatAmount = parseFloat(values[5]);

  orderCount++;
  orderTotal += totalIncl;
  vatTotal += vatAmount;
}


console.log(`No of orders: ${orderCount}`);
console.log(`Total: ${orderTotal.toFixed(2)}`);
console.log(`Vat: ${vatTotal.toFixed(2)}`);
