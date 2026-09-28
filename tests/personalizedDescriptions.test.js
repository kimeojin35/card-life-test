import test from 'node:test'
import assert from 'node:assert/strict'
import { personalizedDescriptions } from '../src/data/personalizedDescriptions.js'
import { getPersonalizedDescription } from '../src/utils/getPersonalizedDescription.js'

test('all 64 descriptions exist and Q1/Q5 never affect them', () => {
  assert.equal(Object.keys(personalizedDescriptions).length, 64)
  for (let q2 = 0; q2 < 4; q2++) for (let q3 = 0; q3 < 4; q3++) for (let q4 = 0; q4 < 4; q4++) {
    const expected = getPersonalizedDescription([0, q2, q3, q4, 0])
    assert.equal(typeof expected, 'string')
    assert.ok(expected.trim().length > 0)
    assert.ok(!expected.includes('\n'))
    for (let q1 = 0; q1 < 4; q1++) for (let q5 = 0; q5 < 4; q5++) {
      assert.equal(getPersonalizedDescription([q1, q2, q3, q4, q5]), expected)
    }
  }
})

test('new answers replace the previous description without cached state', () => {
  assert.equal(getPersonalizedDescription([0, 0, 0, 0, 0]), '익숙한 카드만 쓰다 보니 혜택을 자주 놓쳐요.')
  assert.equal(getPersonalizedDescription([2, 1, 3, 2, 3]), '실적은 잘 알지만 카드 선택은 직관적인 편이에요.')
  assert.equal(getPersonalizedDescription([3, 3, 3, 3, 3]), '실적과 혜택을 따져 가장 유리한 카드를 골라요.')
  assert.equal(getPersonalizedDescription([0, 0, 0, 0, 0]), '익숙한 카드만 쓰다 보니 혜택을 자주 놓쳐요.')
})
