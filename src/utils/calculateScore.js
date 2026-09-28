const scores = { selection: [60, 20, 80, 100], tracking: [20, 50, 70, 100], missed: [20, 45, 35, 100] }
export function validateAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== 5 || !Array.from(answers).every(value => Number.isInteger(value) && value >= 0 && value <= 3)) {
    throw new Error('다섯 문항에 모두 응답해주세요.')
  }
}
export function calculateScore(answers) {
  validateAnswers(answers)
  return Math.round(scores.selection[answers[1]] * 0.35 + scores.tracking[answers[2]] * 0.4 + scores.missed[answers[3]] * 0.25)
}

// Expose the existing unweighted values for the result UI.
export function getSubscores(answers) {
  validateAnswers(answers)
  return {
    selection: scores.selection[answers[1]],
    tracking: scores.tracking[answers[2]],
    missed: scores.missed[answers[3]],
  }
}
