# 🌿 기운과 마음 (Giun Maeum)

**사주 × MBTI × 타로** 기반 개인 상담 앱 (PWA)

📱 **홈 화면에 설치**하면 네이티브 앱처럼 사용할 수 있습니다.

## 앱으로 설치하기

### Android (Chrome)
1. https://taolee-crypto.github.io/giun-maeum/ 접속 (또는 Pages URL)
2. 주소창 옆 **설치** 또는 메뉴 → **홈 화면에 추가**
3. 하단 배너의 **설치** 버튼 클릭

### iPhone (Safari)
1. Safari로 사이트 접속
2. 공유 버튼 (□↑) 탭
3. **홈 화면에 추가** 선택

### PC (Chrome / Edge)
1. 주소창 오른쪽 설치 아이콘 클릭
2. 또는 메뉴 → 앱 설치

## 기능

- 사주 명식 + **일간 10종** 상세 해석
- MBTI 12문항 + 진로·관계·자기돌봄 상담
- **타로** 메이저 아르카나 3장 스프레드
- 학생 진로 (과목·전공·직업)
- **오프라인** 동작 (Service Worker)
- 개인정보 서버 저장 없음 (완전 클라이언트)

## 로컬 실행

```bash
git clone https://github.com/Taolee-crypto/giun-maeum.git
cd giun-maeum
# 단순 파일 서버 권장 (SW 동작을 위해)
npx serve .
# 또는 python -m http.server 8080
```

## GitHub Pages 켜기

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)` → Save
4. 수 분 후 `https://taolee-crypto.github.io/giun-maeum/` 접속

## 파일 구성

| 파일 | 역할 |
|------|------|
| `index.html` | UI + PWA 설치 배너 |
| `app-a.js` | 일간·타로·사주 계산 |
| `app-b.js` | 프로필 상세 해석 |
| `app-c.js` | 결과 화면 로직 |
| `manifest.json` | 앱 설치 정보 |
| `sw.js` | 오프라인 캐시 |

---
Privacy-first · Client-side only · PWA
