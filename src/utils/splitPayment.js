export const PAYMENT_TOTAL = 100000
export const PAYMENT_STEP = 10000
export const initialAmounts = () => [40000, 30000, 30000]
export const sumAmounts = amounts => amounts.reduce((total, amount) => total + amount, 0)
export const canCompletePayment = amounts => amounts.length === 3 && amounts.every(amount => Number.isInteger(amount) && amount >= 0 && amount % PAYMENT_STEP === 0) && sumAmounts(amounts) === PAYMENT_TOTAL
export function adjustAmount(amounts, index, direction) {
  return amounts.map((amount, i) => i === index ? Math.max(0, Math.min(PAYMENT_TOTAL, amount + direction * PAYMENT_STEP)) : amount)
}
export const formatWon = amount => amount.toLocaleString('ko-KR')
