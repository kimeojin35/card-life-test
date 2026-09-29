import Icon from './Icons'
import BrandLogo from './BrandLogo'

export function Header({ onBack, label = 'CARD PORTFOLIO REPORT', right, branded = false }) {
  return (
    <header className="topbar">
      {onBack && <button className="icon-button" onClick={onBack} aria-label="뒤로가기"><Icon name="back" /></button>}
      {branded ? <BrandLogo /> : <span className="topbar-label">{label}</span>}
      <span className="topbar-right">{right || <span className="status-dot" />}</span>
    </header>
  )
}
export function PrimaryButton({ children, arrow = true, ...props }) {
  return <button className="primary-button" {...props}><span>{children}</span>{arrow && <Icon />}</button>
}
export function CardArt() {
  return (
    <div className="card-art" aria-hidden="true">
      <span className="orbit orbit-one" /><span className="orbit orbit-two" />
      <div className="plastic-card card-back"><span>YOUR EVERYDAY</span><span className="card-stripe" /></div>
      <div className="plastic-card card-front">
        <div className="card-art-top"><span>MY CARD<span className="card-art-caption">A BETTER WAY TO PAY</span></span><Icon name="sparkle" size={25} /></div>
        <span className="card-chip" />
        <div className="card-digits">•••• &nbsp; •••• &nbsp; 0824</div>
        <div className="card-art-bottom"><span>YOUR CARD PORTFOLIO.</span><span className="card-circles">○○</span></div>
      </div>
      <span className="floating-note"><Icon name="check" size={16} /> 내 카드, 더 똑똑하게</span>
    </div>
  )
}
