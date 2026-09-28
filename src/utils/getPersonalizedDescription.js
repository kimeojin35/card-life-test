import { personalizedDescriptions } from '../data/personalizedDescriptions.js'

export function getPersonalizedDescription(answers) {
  const [, q2, q3, q4] = answers
  return personalizedDescriptions[`${q2}-${q3}-${q4}`]
}
