import { useId, useRef } from 'react'
import { appStores } from '../data/appStores'
import Icon from './Icons'
import BrandLogo from './BrandLogo'

export default function AppDownload() {
  const dialogRef = useRef(null)
  const titleId = useId()
  function openDownload() {
    dialogRef.current.showModal()
  }
  return <>
    <button className="primary-button homepage-link" onClick={openDownload}><span>캔디페이 만나보기</span><Icon /></button>
    <p className="demo-caption">QR 코드를 스캔하거나 버튼을 눌러 앱을 설치하세요</p>
    <dialog ref={dialogRef} className="download-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close() }}>
      <div className="download-content">
        <div className="download-heading"><BrandLogo /><button className="icon-button" type="button" aria-label="다운로드 안내 닫기" onClick={() => dialogRef.current.close()}>×</button></div>
        <h2 id={titleId}>캔디페이 앱 다운로드</h2>
        <p className="download-description">QR을 스캔하면 내 휴대폰에 맞는 설치 페이지로 연결돼요.<br />휴대폰에서는 설치 버튼을 바로 눌러주세요.</p>
        <div className="download-stores">{appStores.map(store => <section className="download-store" key={store.id} aria-label={store.name}>
          <p className="download-device">{store.device}</p><h3>{store.name}</h3>
          <img src={`${import.meta.env.BASE_URL}qr/${store.id}.png`} width="512" height="512" alt={`캔디페이 ${store.name} 설치 페이지 QR 코드`} />
          <a className="download-store-link" href={store.url} target="_blank" rel="noopener noreferrer">앱 설치하기<span aria-hidden="true"> ↗</span></a>
        </section>)}</div>
      </div>
    </dialog>
  </>
}
