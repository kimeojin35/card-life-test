import { calculateScore } from './calculateScore.js'
export function determineType(answers) {
  const score = calculateScore(answers)
  const [count, selection, tracking] = answers
  // Explicit combinations take precedence over the score fallback.
  if (count === 0 && selection === 0) return 'focused'
  if (count > 0 && (selection === 1 || tracking === 0)) return 'intuitive'
  if (count > 0 && selection === 3 && tracking === 3) return 'strategist'
  if (selection === 2 && tracking < 3) return 'explorer'
  if (selection === 1 || tracking === 0) return 'intuitive'
  if (score >= 55 || selection >= 2) return 'explorer'
  return count === 0 ? 'focused' : 'intuitive'
}
