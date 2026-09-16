import colorLogo from '../../logo/Group 1422235928.png'
import whiteWordmark from '../../logo/Group 1422235134.png'

export default function BrandLogo({ light = false, className = '' }) {
  return <img className={`brand-logo ${className}`} src={light ? whiteWordmark : colorLogo} alt="CANDYPAY" />
}
