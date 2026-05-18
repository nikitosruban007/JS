const taxRate = 0.05;
const ESV = 4500;

let balance = 210000;

let dollarRate = 36.7;

let amount_1 = 60000;
let amount_2 = 2600 * (dollarRate + 1);
let amount_3 = 1700 * (dollarRate + 2);

let totalAmount = amount_1 + amount_2 + amount_3;

let rentFlat = 3500 * 3;
let rentTech = 4000 * 3;

let netflixTotal = 0;

for (let i = 0; i < 3; i++) {
    netflixTotal += 9.99 * (dollarRate + i);
}

let expenses = rentFlat + rentTech + netflixTotal;

let totalTax = totalAmount * taxRate + ESV;

balance = balance + totalAmount - expenses - totalTax;

console.log(`В цьому кварталі Максим витратив ${expenses} грн.`);
console.log(`Загальний дохід Максима за квартал становить ${totalAmount} грн.`);
console.log(`Загальна сума податків становить ${totalTax} грн.`);
console.log(`Отже, наприкінці кварталу залишок на рахунку Максима становить ${balance} грн.`);