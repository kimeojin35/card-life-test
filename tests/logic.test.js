import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateScore } from '../src/utils/calculateScore.js'
import { determineType } from '../src/utils/determineType.js'
import { summarizeAnswers } from '../src/utils/summarizeAnswers.js'
import { initialAmounts, adjustAmount, sumAmounts, canCompletePayment } from '../src/utils/splitPayment.js'

test('weighted score: known cases and rounding', () => {
  assert.equal(calculateScore([0, 1, 0, 0, 0]), 20)
  assert.equal(calculateScore([3, 3, 3, 3, 3]), 100)
  assert.equal(calculateScore([2, 1, 1, 1, 3]), 38)
  assert.equal(calculateScore([1, 2, 2, 1, 0]), 67)
})

test('all 1,024 combinations: valid score, Q1/Q5 independence and type priority', () => {
  const types = new Set()
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++)
    for (let c = 0; c < 4; c++) for (let d = 0; d < 4; d++) for (let e = 0; e < 4; e++) {
      const answers = [a,b,c,d,e]
      const score = calculateScore(answers)
      const type = determineType(answers)
      types.add(type)
      assert.ok(Number.isInteger(score) && score >= 0 && score <= 100)
      assert.equal(score, calculateScore([0,b,c,d,0]))
      if (a === 0) assert.notEqual(type, 'strategist')
      if (a === 0 && b === 0) assert.equal(type, 'focused')
      if (a > 0 && (b === 1 || c === 0)) assert.equal(type, 'intuitive')
      if (a > 0 && b === 3 && c === 3) assert.equal(type, 'strategist')
      if (b === 2 && c > 0 && c < 3) assert.equal(type, 'explorer')
    }
  assert.deepEqual([...types].sort(), ['explorer', 'focused', 'intuitive', 'strategist'])
})

test('answer summaries preserve the actual selection and uncertainty', () => {
  assert.deepEqual(summarizeAnswers([2,1,1,1,3]), ['카드 3~4장 사용 중', '카드 실적은 대략 알고 있음', '혜택을 놓친 경험이 가끔 있음'])
  assert.equal(summarizeAnswers([0,0,0,2,0])[2], '혜택을 놓쳤는지 확실하지 않음')
  assert.equal(summarizeAnswers([3,3,3,3,3])[1], '카드별 실적을 거의 정확히 알고 있음')
})

test('incomplete and invalid answers cannot produce a result', () => {
  for (const answers of [[], Array(5), [0,0,null,0,0], [0,0,4,0,0], [0,0,-1,0,0]]) {
    assert.throws(() => calculateScore(answers))
    assert.throws(() => determineType(answers))
  }
})

test('allocation supports zero, exact totals, over and under allocations', () => {
  let amounts = initialAmounts()
  assert.equal(sumAmounts(amounts), 100000)
  assert.equal(canCompletePayment(amounts), true)
  amounts = adjustAmount(amounts, 0, -1)
  assert.equal(sumAmounts(amounts), 90000)
  assert.equal(canCompletePayment(amounts), false)
  amounts = adjustAmount(amounts, 1, 1)
  assert.deepEqual(amounts, [30000,40000,30000])
  assert.equal(canCompletePayment(amounts), true)
  assert.equal(canCompletePayment(adjustAmount(amounts, 2, 1)), false)
  for (let i = 0; i < 8; i++) amounts = adjustAmount(amounts, 0, -1)
  assert.equal(amounts[0], 0)
  assert.deepEqual(initialAmounts(), [40000,30000,30000])
  assert.equal(canCompletePayment([-10000,60000,50000]), false)
  assert.equal(canCompletePayment([100000,0,0]), true)
})
