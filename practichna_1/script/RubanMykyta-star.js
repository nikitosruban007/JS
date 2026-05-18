const tax = 0.05;
const ESV = 18000;
const dollarCost = 43.7;
const euroCost = 51.2;
const comeback = 0.1;
const children = 0.05;
const business = 100000;
const dollarPostponement = 3000 * dollarCost;
const euroPostponement = 2500 * euroCost;

let income_1 = 100000;
let income_2 = 200000;
let income_3 = 300000;
let income_4 = 150000;

let total_income = income_1 + income_2 + income_3 + income_4;
let total_tax = total_income * tax;

let incomeAfterTaxes = total_income - total_tax - ESV;

let charity_comeback = incomeAfterTaxes * comeback;
let charity_children = incomeAfterTaxes * children;

let total_postponement = dollarPostponement + euroPostponement;

let balance = incomeAfterTaxes - charity_comeback - charity_children - business - total_postponement;

console.log(`За рік Максим заробив — ${total_income} грн`);
console.log(`Єдиний податок 5% складає ${total_tax} грн`);
console.log(`Відрахування у фонди «Повернись живим» та «Діти Героїв» складає ${charity_comeback} грн та ${charity_children} грн відповідно`);
console.log(`На валютну карту сумарно відкладено ще ${total_postponement} грн`);
console.log(`Залишок на рахунку Максима складає ${balance} грн`);