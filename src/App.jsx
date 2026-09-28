import AppDownload from './components/AppDownload'
import { useEffect, useRef, useState } from 'react'
import { Header, PrimaryButton, CardArt } from './components/Primitives'
import Icon from './components/Icons'
import BrandLogo from './components/BrandLogo'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import SplitScreen from './components/SplitScreen'
import { initialAmounts, adjustAmount, canCompletePayment } from './utils/splitPayment'
import './App.css'
import './styles/brand.css'

function App() {
  const [screen, setScreen] = useState('start')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState(Array(5).fill(null))
  const [pending, setPending] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [amounts, setAmounts] = useState(initialAmounts)
  const transitionTimer = useRef(null)
  const transitionLock = useRef(false)

  useEffect(() => () => clearTimeout(transitionTimer.current), [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.querySelector('[data-screen-title]')?.focus({ preventScroll: true })
  }, [screen, questionIndex])
  useEffect(() => {
    if (screen !== 'analysis') return
    const timer = setTimeout(() => setScreen('result'), 1350)
    return () => clearTimeout(timer)
  }, [screen])

  function cancelTransition() {
    clearTimeout(transitionTimer.current)
    transitionLock.current = false
    setPending(false)
    setLeaving(false)
  }
  function selectAnswer(value) {
    if (transitionLock.current) return
    transitionLock.current = true
    setPending(true)
    setAnswers(previous => previous.map((answer, i) => i === questionIndex ? value : answer))
    // Hold the selection before a short exit animation so the answer is easy to confirm.
    transitionTimer.current = setTimeout(() => {
      setLeaving(true)
      transitionTimer.current = setTimeout(() => {
        transitionLock.current = false
        setPending(false)
        setLeaving(false)
        if (questionIndex < 4) setQuestionIndex(questionIndex + 1)
        else setScreen('analysis')
      }, 220)
    }, 600)
  }
  function backQuestion() {
    cancelTransition()
    if (questionIndex === 0) setScreen('start')
    else setQuestionIndex(questionIndex - 1)
  }
  function restart() {
    cancelTransition()
    setAnswers(Array(5).fill(null))
    setQuestionIndex(0)
    setAmounts(initialAmounts())
    setScreen('start')
  }

  return <div className="site-layout"><aside className="desktop-note"><BrandLogo className="desktop-logo" /><p>내 카드생활을<br />알아가는 30초.</p><span className="desktop-note-line" /><small>YOUR CARDS.<br />YOUR BETTER EVERYDAY.</small></aside><main className={`app screen-${screen}`}>
    {screen === 'start' && <><Header branded right="CARD LIFE TEST" /><section className="start-body screen-enter"><span className="pill"><span /> 내 카드생활 진단소</span><h1 tabIndex={-1} data-screen-title>내 카드생활 점수는<br /><span className="highlight">몇 점?</span></h1><p className="start-subtitle">30초 만에 알아보는<br />나의 카드생활 유형</p><CardArt /><p className="start-description">카드는 잘 쓰는 것보다<br /><strong>잘 관리하는 게 더 중요하니까.</strong></p></section><div className="start-bottom"><PrimaryButton onClick={() => setScreen('question')}>진단 시작하기</PrimaryButton><p className="demo-caption">총 5문항 <span>·</span> 약 30초 소요</p></div><footer className="quiet-footer">CANDYPAY · YOUR EVERYDAY, BETTER.</footer></>}
    {screen === 'question' && <QuestionScreen index={questionIndex} answer={answers[questionIndex]} pending={pending} leaving={leaving} onSelect={selectAnswer} onBack={backQuestion} />}
    {screen === 'analysis' && <><Header label="CARD LIFE TEST" /><section className="analysis-body" aria-live="polite"><div className="analysis-symbol"><Icon name="sparkle" size={46} /></div><span className="eyebrow">A MOMENT FOR YOUR CARDS</span><h1 tabIndex={-1} data-screen-title>카드생활을<br />분석하고 있어요</h1><p>나의 습관 속에서 힌트를 찾는 중이에요.</p><ul className="analysis-checks">{['카드 사용 습관', '실적 관리', '혜택 활용'].map((text, i) => <li key={text} style={{ '--delay': `${(i + 1) * 300}ms` }}><span>{text}</span><Icon name="check" /></li>)}</ul></section></>}
    {screen === 'result' && <ResultScreen answers={answers} onBack={() => { setQuestionIndex(4); setScreen('question') }} onExperience={() => setScreen('split')} onRestart={restart} />}
    {screen === 'split' && <SplitScreen amounts={amounts} onBack={() => setScreen('result')} onAdjust={(index, direction) => setAmounts(previous => adjustAmount(previous, index, direction))} onComplete={() => { if (canCompletePayment(amounts)) setScreen('success') }} />}
    {screen === 'success' && <><Header onBack={() => setScreen('split')} label="EXPERIENCE COMPLETE" /><section className="success-body screen-enter"><div className="success-check"><Icon name="check" size={46} /></div><span className="eyebrow">A NEW WAY TO PAY</span><h1 tabIndex={-1} data-screen-title>분할 완료!</h1><p className="success-description">한 번의 결제를<br />여러 카드로 나누는 방법.</p><div className="success-brand"><BrandLogo light /></div><p>여러 카드 사용을 더 간편하게</p><div className="demo-notice">실제 결제가 아닌<br />서비스 이해를 위한 체험 화면입니다.</div></section><div className="success-bottom"><AppDownload /><button className="text-button" onClick={restart}>처음부터 다시 진단하기 <span aria-hidden="true">↻</span></button></div><footer className="quiet-footer">오늘부터, 조금 더 편한 카드생활.</footer></>}
  </main><span className="desktop-edition">CANDYPAY EXPERIENCE / 01</span></div>
}
export default App





