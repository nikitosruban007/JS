let amount = 3500
const dollarCost = 43.7

try {
    let convertedAmount = amount * 0.995 * dollarCost
    console.log(`Після виконання проєкту, буде нараховано ${convertedAmount} грн з урахуванням комісії банку!`)
} catch (error) {
    console.error("Невірний тип даних")
}