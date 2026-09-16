import { questions } from '../data/questions.js'
import { validateAnswers } from './calculateScore.js'
export function summarizeAnswers(answers) {
  validateAnswers(answers)
  return [
    `카드 ${questions[0].options[answers[0]]} 사용 중`,
    ['카드 실적은 아직 확인하지 않음', '카드 실적은 대략 알고 있음', '주로 쓰는 카드의 실적만 알고 있음', '카드별 실적을 거의 정확히 알고 있음'][answers[2]],
    ['혜택을 놓친 경험이 자주 있음', '혜택을 놓친 경험이 가끔 있음', '혜택을 놓쳤는지 확실하지 않음', '혜택을 놓친 경험이 거의 없음'][answers[3]],
  ]
}
