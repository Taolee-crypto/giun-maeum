# 🌿 기운과 마음 (Giun Maeum)

**사주 × MBTI** 기반 개인 상담 앱 MVP

## ✨ 기능

### 사주 명식 계산 (클라이언트)
- 년주 · 월주 · 일주 · 시주 (천간지지)
- 일간(日干) 표시 및 오행 균형 바
- 생년월일 + 시간 기반 (절기 근사 계산)
- 모든 연산은 브라우저에서만 수행 (서버 저장 없음)

### MBTI 성향 12문항
- E/I, N/S, F/T, J/P 점수화
- 사주 일간 오행과 조합한 프로필

### 학생 진로 상담
- 잘 맞는 과목 방향
- 추천 전공 계열
- 진로·직업 힌트
- 상담 버튼: 진로·직업 / 학생 진로 / 관계 / 의사결정 / 자기돌봄

### 기타
- 유사 인물 + 팁
- 강점 & 성장 포인트
- 오늘의 조언

## 사용법

1. 레포 clone 또는 `index.html` + `app.js`를 같은 폴더에 두고 브라우저로 열기
2. GitHub Pages 설정 시: Settings → Pages → main branch → root

```bash
git clone https://github.com/Taolee-crypto/giun-maeum.git
cd giun-maeum
# index.html 을 브라우저로 열기 (app.js 필요)
```

## 기술
- 순수 HTML / CSS / Vanilla JS
- 외부 의존성 없음 (Google Fonts만)
- 사주 계산: 60갑자 순환, 입춘 기준 연주, 절기 근사 월주, 일주 연속 카운트, 시주(자시 기준)

## 주의
- 절기·시주는 **근사 계산**입니다. 정밀 명식·대운은 전문가 상담을 권합니다.
- 음력은 MVP에서 양력과 동일 처리합니다. (향후 정밀 변환 예정)

## 향후 개선
- 정밀 24절기 표 연동
- 음력/윤달 변환
- 십신·대운
- PWA / 결과 공유 카드

---
Privacy-first · Client-side only
