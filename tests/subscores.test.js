import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateScore, getSubscores } from '../src/utils/calculateScore.js'

test('all 1024 combinations expose existing unweighted mappings independent of Q1/Q5', () => {
  const selection = [60,20,80,100], tracking = [20,50,70,100], missed = [20,45,35,100]
  for(let a=0;a<4;a++) for(let b=0;b<4;b++) for(let c=0;c<4;c++) for(let d=0;d<4;d++) for(let e=0;e<4;e++) {
    const answers = [a,b,c,d,e]
    assert.deepEqual(getSubscores(answers), { selection: selection[b], tracking: tracking[c], missed: missed[d] })
    assert.equal(calculateScore(answers), Math.round(selection[b]*.35 + tracking[c]*.4 + missed[d]*.25))
  }
})

test('subscores update for new answers and reject incomplete results', () => {
  assert.deepEqual(getSubscores([0,0,0,0,0]), { selection:60, tracking:20, missed:20 })
  assert.deepEqual(getSubscores([3,3,3,3,3]), { selection:100, tracking:100, missed:100 })
  assert.throws(() => getSubscores(Array(5).fill(null)))
})
