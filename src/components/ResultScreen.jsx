import { resultTypes, splitRecommendations } from '../data/resultTypes'
import { calculateScore } from '../utils/calculateScore'
import { determineType } from '../utils/determineType'
import { summarizeAnswers } from '../utils/summarizeAnswers'
import { Header, PrimaryButton } from './Primitives'
import Icon from './Icons'
import BrandLogo from './BrandLogo'
export default function ResultScreen({ answers, onBack, onExperience, onRestart }) {
  const score = calculateScore(answers)
  const type = resultTypes[determineType(answers)]
  return <><Header onBack={onBack} branded right={<button className="text-button result-restart" onClick={onRestart}>처음으로 <span aria-hidden="true">↻</span></button>} /><section className="result-intro screen-enter"><p className="eyebrow">나의 카드생활 관리지수</p><p className="score" aria-label={`나의 카드생활 관리지수 ${score}점, 100점 만점`}><span>{score}</span><small>/ 100</small></p><div className="score-meter" aria-hidden="true"><span style={{ width: `${score}%` }} /></div><p className="type-tag">TYPE {type.number}</p><h1 className="type-name" tabIndex={-1} data-screen-title>{type.name}</h1><p className="type-subtitle">{type.label}</p><p className="type-description">{type.description}</p><ul className="summary-list">{summarizeAnswers(answers).map(text => <li key={text}><Icon name="check" size={17} />{text}</li>)}</ul><p className="score-disclaimer">카드 관리 습관을 살펴보는 체험용 지수예요.<br />신용점수나 금융 평가와는 무관해요.</p></section><div className="result-details"><section className="feedback-card"><span className="feedback-icon"><Icon name="check" /></span><div><h3>잘하고 있어요</h3><p>{type.good}</p></div></section><section className="feedback-card"><span className="feedback-icon muted"><Icon name="sparkle" /></span><div><h3>이 부분은 조금 아쉬워요</h3><p>{type.improve}</p></div></section><section className="connection-card"><span className="eyebrow">A BETTER CARD LIFE</span><h2>그렇다면 내 카드생활,<br />조금 더 편하게<br />관리할 수는 없을까요?</h2><p>여러 카드의 실적을 한눈에 확인하고,<br />필요할 때는 하나의 결제를<br />여러 카드로 나눠보세요.</p><div className="mini-cards" aria-hidden="true"><span>A</span><span>B</span><span>C</span><Icon name="arrow" /><strong>한 번에</strong></div><div className="connection-brand"><BrandLogo /></div><p className="brand-caption">여러 카드 사용을 더 간편하게</p><p className="recommendation">{splitRecommendations[answers[4]]}</p><PrimaryButton onClick={onExperience}>분할결제 직접 체험하기</PrimaryButton><p className="demo-caption">가상 카드로 부담 없이 체험해보세요.</p></section></div></>
}



