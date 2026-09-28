import { getSubscores } from '../utils/calculateScore'

const indicators = [
  { key: 'selection', label: '카드 선택' },
  { key: 'tracking', label: '실적 관리' },
  { key: 'missed', label: '혜택 활용' },
]

export default function ScoreSummary({ answers, score }) {
  const subscores = getSubscores(answers)
  return <div className="score-summary">
    <p className="eyebrow">카드 활용력</p>
    <p className="score" aria-label={`카드 활용력 ${score}점, 100점 만점`}><span>{score}</span><small>점</small></p>
    <p className="score-explanation">실적과 혜택을 얼마나 잘 챙겨 카드를 활용하는지 나타낸 점수예요.</p>
    <div className="score-indicators">
      {indicators.map(({ key, label }) => <div className="score-indicator" key={key}>
        <div className="score-indicator-label"><span>{label}</span><strong>{subscores[key]}</strong></div>
        <div className="score-indicator-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={subscores[key]}>
          <span style={{ width: `${subscores[key]}%` }} />
        </div>
      </div>)}
    </div>
  </div>
}
