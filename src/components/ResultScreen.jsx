import { useEffect, useRef } from 'react'
import ScoreSummary from './ScoreSummary'
import { getPersonalizedDescription } from '../utils/getPersonalizedDescription'
import { resultTypes } from '../data/resultTypes'
import { calculateScore } from '../utils/calculateScore'
import { determineType } from '../utils/determineType'
import { summarizeAnswers } from '../utils/summarizeAnswers'
import { Header } from './Primitives'
import Icon from './Icons'
export default function ResultScreen({ answers, onBack, onRestart }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    // Keep native playback controls available if the browser blocks autoplay.
    video.play().catch(() => {})
  }, [])
  const score = calculateScore(answers)
  const type = resultTypes[determineType(answers)]
  return <><Header onBack={onBack} branded right={<button className="text-button result-restart" onClick={onRestart}>처음으로 <span aria-hidden="true">↻</span></button>} /><section className="result-intro screen-enter"><ScoreSummary answers={answers} score={score} /><p className="type-tag">TYPE {type.number}</p><h1 className="type-name" tabIndex={-1} data-screen-title>{type.name}</h1><p className="type-subtitle">{type.label}</p><p className="type-description">{getPersonalizedDescription(answers)}</p><ul className="summary-list">{summarizeAnswers(answers).map(text => <li key={text}><Icon name="check" size={17} />{text}</li>)}</ul><p className="score-disclaimer">카드 관리 습관을 살펴보는 체험용 지수예요.<br />신용점수나 금융 평가와는 무관해요.</p></section><div className="result-details"><section className="feedback-card"><span className="feedback-icon"><Icon name="check" /></span><div><h3>잘하고 있어요</h3><p>{type.good}</p></div></section><section className="feedback-card"><span className="feedback-icon muted"><Icon name="sparkle" /></span><div><h3>이 부분은 조금 아쉬워요</h3><p>{type.improve}</p></div></section><section className="result-video-section" aria-label="캔디페이 분할결제 시연"><video ref={videoRef} className="result-demo-video" controls autoPlay muted playsInline preload="auto" aria-label="캔디페이 분할결제 시연 영상"><source src={`${import.meta.env.BASE_URL}videos/candypay-split-payment-demo.mp4`} type="video/mp4" />동영상 재생을 지원하는 브라우저에서 확인해주세요.</video><a className="primary-button homepage-link" href="https://www.candypay.co.kr/" target="_blank" rel="noopener noreferrer"><span>캔디페이 만나보기</span><Icon /></a><p className="demo-caption">캔디페이 공식 홈페이지에서 더 알아보세요</p></section></div></>
}



