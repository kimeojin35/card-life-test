# CANDYPAY · CARD PORTFOLIO REPORT

오프라인 금융 박람회 방문객을 위한 React + Vite + JavaScript 프론트엔드 MVP입니다.
기존 Vite 설정과 의존성을 유지하고, 추가 패키지 없이 구현했습니다.

## 실행

```powershell
.\npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

개발 주소: http://127.0.0.1:5173/
서버 종료: 실행한 터미널에서 Ctrl+C.

현재 Node.js v24.19.0 및 로컬 npm 12.0.2를 사용합니다.
시스템 npm이 없어서 `.tools/package`의 npm을 `npm.cmd`로 실행합니다.
다른 PC에서는 Node.js와 npm을 설치한 뒤 `npm install`, `npm run dev`를 사용할 수 있습니다.
`.tools/`와 `node_modules/`는 Git에서 제외됩니다.

## 사용자 흐름

시작 → 질문 5개 → 1.35초 분석 → 결과 → 분할결제 체험 → 완료 및 캔디페이 CTA

- 선택 시 250ms 동안 선택을 보여준 후 다음 질문으로 이동합니다.
- 뒤로가기로 기존 응답을 확인하고 수정할 수 있습니다.
- 결과 화면의 뒤로가기는 마지막 질문으로 돌아갑니다.
- 결과의 특징 3개는 카드 수·실적 인지·혜택 손실 답변에 맞춰 달라집니다.
- Q5 응답에 따라 분할결제 추천 문구가 바뀝니다.
- 가상 카드 A/B/C에 40,000 / 30,000 / 30,000원을 초기 배분합니다.
- 10,000원씩 조절하며 합계가 100,000원일 때만 완료할 수 있습니다.
- 캔디페이 CTA는 URL 이동 없이 다운로드 링크 준비 중 안내만 표시합니다.
- 새 리포트 만들기는 응답, 문항 위치, 금액, CTA 안내를 모두 초기화합니다.

## 점수 및 유형

점수 = round(Q2 × 0.35 + Q3 × 0.40 + Q4 × 0.25)
Q1 카드 수 및 Q5 분할 의향은 점수에 영향을 주지 않습니다.
지정된 선택지 점수로 산출 가능한 실제 범위는 20~100점입니다.
체험용 관리지수이며 신용점수나 금융 평가가 아닙니다.

유형은 아래 조합을 점수보다 우선합니다.

1. 1장 + 늘 같은 카드 → SINGLE CORE
2. 여러 장 + 즉흥 선택 또는 실적 모름 → INTUITIVE
3. 여러 장 + 실적과 혜택 확인 + 정확한 실적 인지 → PORTFOLIO OPTIMIZER
4. 혜택 고려 + 실적을 완전히 관리하지 않음 → VALUE SEEKER
5. 나머지는 선택 습관과 55점 기준을 참고해 SINGLE CORE·INTUITIVE·VALUE SEEKER으로 분류

겹치는 경우 위 순서가 우선합니다. 1장 사용자는 전략가형이 될 수 없습니다.

## 주요 파일

- `src/App.jsx`: SPA 화면 상태, 전환 타이머, 뒤로가기, 초기화
- `src/components/QuestionScreen.jsx`: 질문과 선택 버튼
- `src/components/ResultScreen.jsx`: 점수, 유형, 특징, 캔디페이 연결
- `src/components/SplitScreen.jsx`: 금액 배분과 완료 조건
- `src/components/Primitives.jsx`, `Icons.jsx`: 공통 헤더·버튼·CSS 카드 그래픽·아이콘
- `src/data/questions.js`: 질문 및 선택지
- `src/data/resultTypes.js`: 유형 설명, 피드백, Q5 추천 문구
- `src/utils/calculateScore.js`: 가중 점수 계산 및 응답 검증
- `src/utils/determineType.js`: 조합 우선 유형 판별
- `src/utils/summarizeAnswers.js`: 실제 선택값 요약
- `src/utils/splitPayment.js`: 분할금액 계산
- `src/index.css`: 임시 색상 토큰과 전역 스타일
- `src/App.css`: 기본 레이아웃 및 반응형 스타일
- `src/styles/brand.css`: 로고 기반 브랜드 스타일, 카드형 결과, 선택 상태 및 화면별 표현
- `src/components/BrandLogo.jsx`: 밝은 배경의 컬러 로고와 어두운 배경의 흰색 워드마크
- `tests/logic.test.js`: 핵심 계산과 판별 회귀 검사

## 로고 기반 UI 디자인

제공된 로고 이미지에서 참고한 코랄(#F09276)·딥네이비(#171F2E) 색감으로 구성했습니다. 공식 브랜드 가이드의 확정 색상값은 아닙니다.
`src/index.css`의 아래 변수로 전체 색상을 교체할 수 있습니다.

`--color-primary`, `--color-primary-light`, `--color-background`, `--color-surface`,
`--color-text`, `--color-text-secondary`, `--color-border`, `--color-accent-soft`

390px 모바일을 우선하고 콘텐츠는 최대 480px로 제한합니다.
프로젝트의 로고 PNG를 번들에 포함하며 외부 이미지와 웹폰트를 요청하지 않습니다. 카드 그래픽은 CSS로 표현합니다.
키보드 포커스, 선택 상태, 진행률, 실시간 합계 안내와 모션 감소 설정을 지원합니다.

## 검사 및 빌드

```powershell
.\npm.cmd test
.\npm.cmd run lint
.\npm.cmd run build
.\npm.cmd run preview
```

빌드 결과는 `dist/`에 생성됩니다.

검증 내역:
- 1,024개 응답 조합의 점수 범위, Q1/Q5 점수 독립성, 유형 우선순위 검사
- 모든 유형 도달 가능 및 카드 1장 전략가형 제외
- 실제 응답 요약과 불확실한 답변의 표현 확인
- 누락 응답 거부, 금액 하한, 합계 부족·초과·일치 조건 검사
- 브라우저에서 시작, 5문항, 뒤로가기 및 수정, 분석, 결과, 분할, 성공, CTA, 초기화 확인
- 브라우저에서 INTUITIVE 38점, SINGLE CORE 86점, PORTFOLIO OPTIMIZER 100점, 1장 VALUE SEEKER 100점 확인
- 시작·결과·분할·완료 화면은 320/390/768/1440px에서 가로 넘침 없음
- 질문 5개는 320/390px에서 가로 넘침 없음
- 브라우저 경고 및 오류 로그 없음

## 데이터 및 서비스 범위

백엔드·로그인·데이터베이스·실제 결제·다운로드 링크는 없습니다.
응답은 React 메모리에만 저장되며 외부 전송하지 않습니다. 새로고침하면 초기화됩니다.
오프라인 행사 현장용 MVP이며 인터넷 연결 없이 다시 접속하는 PWA·서비스워커는 포함하지 않습니다.


