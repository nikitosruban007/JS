const dollarCost = 43.7
const tax = 0.05
const ESV = 4500

let amount_1 = 68000
let amount_2 = 2600 * dollarCost
let amount_3 = 1900 * dollarCost

let total_amount = amount_1 + amount_2 + amount_3

let tax_amount = (total_amount * tax)+ESV
console.log(`Загальна сума доходу Максима складає ${total_amount} грн.`)
console.log(`В кінці кварталу Максиму необхідно сплатити ${tax_amount} грн.`)