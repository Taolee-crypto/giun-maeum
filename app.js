/* 기운과 마음 - 사주×MBTI + 학생진로 */
const STEMS=['갑','을','병','정','무','기','경','신','임','계'];
const STEMS_H=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES=['자','축','인','묘','진','사','오','미','신','유','술','해'];
const BRANCHES_H=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const STEM_ELEM=['wood','wood','fire','fire','earth','earth','metal','metal','water','water'];
const BRANCH_ELEM=['water','earth','wood','wood','earth','fire','fire','earth','metal','metal','earth','water'];
const ELEM_KO={wood:'목',fire:'화',earth:'토',metal:'금',water:'수'};
const ELEM_COLOR={wood:'#4CAF50',fire:'#FF7043',earth:'#C08B52',metal:'#607D8B',water:'#5C6BC0'};
function getDayPillarIndex(y,m,d){const b=new Date(1900,0,1),t=new Date(y,m-1,d);return((10+Math.floor((t-b)/86400000))%60+60)%60;}
function getYearPillar(y,m,d){let yr=y;if(m<2||(m===2&&d<4))yr=y-1;return((yr-1984)%60+60)%60;}
function getMonthBranchIndex(m,d){const a=[[2,4,2],[3,6,3],[4,5,4],[5,6,5],[6,6,6],[7,7,7],[8,8,8],[9,8,9],[10,8,10],[11,7,11],[12,7,0],[1,6,1]];for(let i=0;i<12;i++){const[sm,sd,bi]=a[i],n=a[(i+1)%12];if(m===sm&&d>=sd)return bi;if(m===n[0]&&d<n[1])return bi;if(sm<n[0]){if(m>sm&&m<n[0])return bi;}else if(m>sm||m<n[0])return bi;}return(m+1)%12;}
function getMonthStem(ysi,mbi){const base=[2,4,6,8,0],st=base[ysi%5],off=(mbi-2+12)%12;return(st+off)%10;}
function getHourBranch(h){return(h>=23||h<1)?0:Math.floor((h+1)/2);}
function getHourStem(dsi,hbi){return([0,2,4,6,8][dsi%5]+hbi)%10;}
function calculateSaju(y,m,d,h){const yi=getYearPillar(y,m,d),mbi=getMonthBranchIndex(m,d),msi=getMonthStem(yi%10,mbi),di=getDayPillarIndex(y,m,d),dsi=di%10,dbi=di%12;let hsi=null,hbi=null;if(h!=null&&!isNaN(h)){hbi=getHourBranch(h);hsi=getHourStem(dsi,hbi);}const p={year:{s:yi%10,b:yi%12},month:{s:msi,b:mbi},day:{s:dsi,b:dbi},hour:hsi!=null?{s:hsi,b:hbi}:null};const c={wood:0,fire:0,earth:0,metal:0,water:0};const add=(s,b)=>{c[STEM_ELEM[s]]++;c[BRANCH_ELEM[b]]++;};add(p.year.s,p.year.b);add(p.month.s,p.month.b);add(p.day.s,p.day.b);if(p.hour)add(p.hour.s,p.hour.b);return{pillars:p,dayMaster:{stem:STEMS[dsi],hanja:STEMS_H[dsi],elem:STEM_ELEM[dsi]},counts:c,hasHour:!!p.hour};}
function formatPillar(p){return p?{ko:STEMS[p.s]+BRANCHES[p.b],hanja:STEMS_H[p.s]+BRANCHES_H[p.b]}:{ko:'—',hanja:'—'};}
let calType='solar',qIdx=0,answers=[],currentProfile=null,currentSaju=null;
const questions=[{t:"새로운 아이디어가 떠오르면 주로 어떻게 하시나요?",o1:"바로 이것저것 시도해보고 싶다",o2:"구체적인 사실과 경험을 먼저 확인한다"},{t:"마음이 상할 때 어떻게 위로받으시나요?",o1:"사람들과 이야기하며 풀어간다",o2:"혼자만의 시간을 가지며 정리한다"},{t:"중요한 결정을 할 때 무엇을 더 중시하시나요?",o1:"논리와 사실 기준",o2:"마음과 가치 기준"},{t:"하루를 보낼 때 더 편한 방식은?",o1:"계획을 세우고 지키는 것",o2:"흐름에 맞춰 유연하게 보내는 것"},{t:"미래에 대해 생각할 때 더 끌리는 쪽은?",o1:"새로운 가능성·변화",o2:"익숙하고 안정적인 모습"},{t:"의견이 다를 때 어떻게 하시나요?",o1:"서로 이야기 맞춰보기",o2:"각자의 생각 존중하기"},{t:"일을 진행할 때 먼저 떠오르는 것은?",o1:"전체적인 그림·방향",o2:"구체적인 단계·절차"},{t:"에너지를 얻는 곳은?",o1:"사람들과 함께 있을 때",o2:"혼자 있을 때"},{t:"설명을 들을 때 더 중요한 것은?",o1:"논리적인 흐름",o2:"진심이 담겼는지"},{t:"마무리하는 방식은?",o1:"여유를 두고 마무리",o2:"미리 끝내 여유를 갖기"},{t:"배울 때 더 편한 방식",o1:"새로운 방식·다양한 시도",o2:"익숙한 방식·확실한 이해"},{t:"스스로를 표현할 때",o1:"함께 공유하며 표현",o2:"조용히 행동으로 보여줌"}];

const PersonDB={
WOOD_Ne:[{name:"넬슨 만델라",desc:"분열된 세상을 화합으로 이끈 희망의 상징",tip:"연결하는 힘으로 한 사람씩 마음을 이어보세요."},{name:"오프라 윈프리",desc:"희망을 발견하고 수백만에게 영감",tip:"당신의 이야기는 누군가의 희망이 됩니다."}],
WOOD_Ni:[{name:"마틴 루터 킹 주니어",desc:"평화와 평등을 향해 한결같이 나아감",tip:"신념이 흔들릴 때도 방향만 확인하세요."},{name:"테레사 수녀",desc:"보이지 않는 곳에서 진심을 다해 살아감",tip:"너무 혼자 감당하지 마세요."}],
FIRE_Fe:[{name:"다이애나비",desc:"소외된 이들에게 손을 내민 인간의 왕비",tip:"다른 사람을 생각하되 자신도 돌보세요."},{name:"마더 테레사",desc:"가장 아픈 곳에 먼저 다가간 사랑의 삶",tip:"거절하는 것도 사랑입니다."}],
FIRE_Fi:[{name:"프리다 칼로",desc:"아픔 속에서도 진심 어린 자화상으로 감동",tip:"당신 그 자체로 충분히 아름답습니다."},{name:"빈센트 반 고흐",desc:"진심으로 그림을 그린 화가",tip:"포기하지 마세요. 시간이 지나면 빛을 발합니다."}],
EARTH_Si:[{name:"퀸 엘리자베스 2세",desc:"한결같은 마음으로 나라를 지킴",tip:"변하지 않는 것의 소중함을 아는 당신입니다."},{name:"토마스 에디슨",desc:"수천 번 실패 뒤 빛을 만든 발명가",tip:"꾸준함이 가장 큰 재능입니다."}],
EARTH_Se:[{name:"마이클 조던",desc:"지금 이 순간에 온 힘을 다해 최고가 됨",tip:"눈앞의 일에 집중하되 먼 곳도 보세요."},{name:"헬렌 켈러",desc:"어려운 환경에서도 꾸준히 나아감",tip:"오늘의 작은 걸음이 내일의 큰 길이 됩니다."}],
METAL_Te:[{name:"마하트마 간디",desc:"명확한 원칙으로 큰 변화를 이끔",tip:"따라오지 않을 때 기다려 주세요."},{name:"앨런 튜링",desc:"논리와 질서로 세상을 바꾼 천재",tip:"질서와 함께 마음의 소리도 들으세요."}],
METAL_Ti:[{name:"알버트 아인슈타인",desc:"세상의 본질을 파고들어 진실을 밝힘",tip:"쉬운 말로 풀어서 이야기해 주세요."},{name:"마리 퀴리",desc:"한 분야에 깊이 몰두한 과학자",tip:"완벽하지 않아도 충분히 가치 있습니다."}],
WATER_NiTi:[{name:"레오나르도 다 빈치",desc:"흐름을 읽고 예술과 과학을 펼침",tip:"예감은 틀리지 않습니다. 작은 것부터 실천하세요."},{name:"정약용",desc:"시대의 흐름을 읽고 변화를 제시함",tip:"때가 되면 생각이 빛을 발합니다."}]
};

function mkProf(tag,elem,core,str,grw,daily,adv,sc){return{tag,elem,core,strength:str,growth:grw,daily,advice:adv,studentCareer:sc};}

const ProfileTemplates={
WOOD_Ne:mkProf("목·Ne","wood","가능성을 향해 열린 마음으로 미래를 꿈꾸고 주변에 영감을 줍니다.",["창의적 아이디어","잠재력 발견","유연한 대응","새로운 연결"],["아이디어를 계획으로","한 가지에 집중","완전히 쉬기","서두르지 않기"],{sum:"성장과 표현의 기운이 열린 날입니다.",do:"✅ 담아둔 생각을 꺼내 이야기해 보세요.",avoid:"⚠️ 오늘은 두 가지만 정해서 실천하세요."},{career:"아이디어·사람·성장 환경에서 힘을 발휘합니다.",student:"탐구·표현·사람 관련 과목에 강점. 국어·영어·사회·예술. 교육·심리·미디어·디자인 전공 추천. 동아리·프로젝트 경험이 자산입니다.",relation:"가능성을 보고 격려하는 매력. 현실 이야기도 들어주세요.",decision:"직감을 무시하지 말고 확인을 덧붙이세요.",selfcare:"쉴 때는 완전히 내려놓으세요. 자연이 충전제입니다."},{subjects:["국어","영어","사회","미술/음악","윤리"],majors:["교육학","심리학","미디어","디자인","국제학"],jobs:["교사","상담사","콘텐츠 기획","디자이너","기자"]}),
WOOD_Ni:mkProf("목·Ni","wood","먼 미래를 내다보며 한결같은 시선으로 나아갑니다.",["깊은 통찰","흔들리지 않는 신념","긴 호흡","본질 파악","진실함"],["혼자 감당하지 않기","마음 표현","작은 성과 인정","흐름에 맡기기"],{sum:"깊은 통찰의 기운이 찾아온 날입니다.",do:"✅ '나는 무엇을 원하는가?' 스스로에게 물어보세요.",avoid:"⚠️ 서둘러 결정하지 마세요."},{career:"한 분야에 깊이 몰두하고 장기 비전을 세우는 일에서 보람을 느낍니다.",student:"탐구형 과목에 강점. 과학·수학·철학·역사. 연구·분석·전략 전공. 장기 프로젝트·논문형 과제로 실력을 키우세요.",relation:"진심이 깊습니다. 가끔은 말로 표현해 주세요.",decision:"한 걸음씩 천천히 나아가세요.",selfcare:"산책과 햇살이 채워줍니다."},{subjects:["수학","과학","역사","철학","정보"],majors:["자연과학","공학","철학","역사","데이터사이언스"],jobs:["연구원","전략기획","데이터 분석","교수","정책 전문가"]}),
FIRE_Fe:mkProf("화·Fe","fire","사람들과 마음을 나누고 함께 움직일 때 가장 빛납니다.",["따뜻한 배려","모으는 힘","밝은 분위기","신뢰","공감"],["자신부터 돌보기","거절 연습","혼자 시간","모두를 만족시키려 하지 않기"],{sum:"마음이 통하는 화기운의 날입니다.",do:"✅ 따뜻한 말 한마디를 건네보세요.",avoid:"⚠️ 다른 사람 기분을 너무 의식하지 마세요."},{career:"함께하고 돕고 이끄는 일에서 보람을 느낍니다.",student:"소통·협력 활동에 강점. 국어·사회·예체능·봉사. 교육·상담·홍보 전공. 학생회·동아리에서 리더십을 키우세요.",relation:"배려가 강점. 받는 것도 사랑입니다.",decision:"마음이 편안한 선택이 좋은 선택입니다.",selfcare:"당신만을 위한 시간을 만드세요."},{subjects:["국어","사회","영어","체육","음악"],majors:["교육학","사회복지","홍보","간호","상담심리"],jobs:["교사","상담사","사회복지사","홍보","의료"]}),
FIRE_Fi:mkProf("화·Fi","fire","진심과 가치를 따라 살며 진솔한 관계를 맺습니다.",["진솔함","변치 않는 마음","내면의 깊이","가치관 충실","공감"],["너무 혼자 있지 않기","이유 설명 연습","실행 계획","다른 속도 인정"],{sum:"진심이 빛나는 날입니다.",do:"✅ 마음이 끌리는 것을 하나 실천하세요.",avoid:"⚠️ 남의 기준에 맞추지 마세요."},{career:"진심이 통하는 일, 가치가 느껴지는 일에서 힘을 발휘합니다.",student:"가치·표현이 중요한 과목. 예술·문학·심리·철학. 창작·치료·상담 전공. 포트폴리오·개인 프로젝트로 자신을 드러내세요.",relation:"깊은 연결을 소중히 합니다.",decision:"마음이 '예'일 때 시작하세요.",selfcare:"섬세한 마음을 쉬게 해주세요."},{subjects:["국어","미술/음악","윤리","영어"],majors:["문예창작","미술","음악","심리","철학"],jobs:["작가","아티스트","상담·치료","큐레이터","크리에이터"]}),
EARTH_Si:mkProf("토·Si","earth","소중한 것을 지키고 차곡차곡 쌓아가는 든든한 기반입니다.",["신뢰성","끈기","안정감","기억력","실용 지혜"],["새 시도 열기","미래 상상","과거에 얽매이지 않기","계획 벗어나보기"],{sum:"안정과 신뢰의 기운이 자리 잡은 날입니다.",do:"✅ 쌓아온 것을 발판으로 다음 한 걸음을.",avoid:"⚠️ 새 것만 쫓지 마세요."},{career:"꾸준함이 가장 큰 재능입니다.",student:"체계·심화 과목에 강점. 수학·과학·국어·회계. 전문직·공무원·교육 계열. 매일 복습·노트 정리가 힘입니다.",relation:"변함없는 마음이 힘입니다.",decision:"조금만 내딛어 보세요.",selfcare:"익숙하고 편안한 것이 채워줍니다."},{subjects:["수학","과학","국어","사회","정보"],majors:["교육","회계","행정","간호","법학"],jobs:["교사","공무원","회계사","간호사","행정"]}),
EARTH_Se:mkProf("토·Se","earth","지금 이 순간을 살고 현실을 단단히 다집니다.",["실용성","적응력","현실 감각","행동력","문제 해결"],["먼 곳 보기","장기 계획","쉬는 것도 계획","미래 준비"],{sum:"현실을 딛고 나아가는 기운이 충만한 날입니다.",do:"✅ 오늘 할 일을 미루지 마세요.",avoid:"⚠️ 먼 곳을 보는 것도 잊지 마세요."},{career:"직접 부딪히고 경험하는 것에서 배웁니다.",student:"실습·체험·운동·기술에 강점. 체육·기술·실험·예체능. 현장 중심 전공. 동아리·대회·인턴으로 경험 쌓으세요.",relation:"함께 만들고 움직이는 것에서 정이 듭니다.",decision:"손에 잡히는 것과 함께 미래도 그려보세요.",selfcare:"몸을 움직일 때 마음도 살아납니다."},{subjects:["체육","기술","과학","미술","음악"],majors:["체육","공학","디자인","조리","응급구조"],jobs:["선수/코치","엔지니어","셰프","디자이너","응급구조"]}),
METAL_Te:mkProf("금·Te","metal","명확한 기준으로 질서를 세우고 이끄는 힘이 있습니다.",["결단력","체계","공정","효율","책임감"],["마음 언어","과정도 소중","다른 속도","부드러움도 힘"],{sum:"정리와 명확함의 기운이 흐르는 날입니다.",do:"✅ 우선순위를 다시 세워보세요.",avoid:"⚠️ 기준이 너무 엄격하지 않은지 돌아보세요."},{career:"명확한 비전과 체계적 진행에서 힘을 발휘합니다.",student:"목표·체계 학습에 강점. 수학·사회(경제/법)·영어. 경영·법·행정·공학. 스터디 리더·PM 역할을 해보세요.",relation:"공정한 관계. 마음도 보살펴 주세요.",decision:"충분하다 싶으면 내딛으세요.",selfcare:"때로는 내려놓아도 됩니다."},{subjects:["수학","사회","영어","정보","과학"],majors:["경영","법학","행정","경제","공학"],jobs:["경영/기획","법조","공무원","컨설턴트","PM"]}),
METAL_Ti:mkProf("금·Ti","metal","본질을 파고들어 논리와 구조를 만듭니다.",["분석력","정확성","창의적 해결","독립 사고","본질 파악"],["마음 느끼기","연결 소중히","충분함으로 만족","쉬운 설명"],{sum:"깊은 통찰과 명확한 기운의 날입니다.",do:"✅ 일의 본질을 파악해 보세요.",avoid:"⚠️ 모든 것을 논리로만 설명하려 하지 마세요."},{career:"원리와 본질을 파고드는 일에서 보람을 느낍니다.",student:"논리·분석 과목에 강점. 수학·과학·정보·철학. 컴퓨터·공학·자연과학. 혼자 파고드는 시간과 코딩/실험이 자산입니다.",relation:"깊이 이해하고 싶어 합니다. 함께 있는 것도 충분합니다.",decision:"가장 그럴듯할 때 출발하세요.",selfcare:"논리가 닿지 않는 곳으로 가보세요."},{subjects:["수학","과학","정보","물리","철학"],majors:["컴퓨터","수학","물리","전자","AI"],jobs:["개발자","데이터 사이언티스트","연구원","분석가"]}),
WATER_NiTi:mkProf("수·NiTi","water","깊은 통찰로 흐름을 읽고 변화에 유연하게 대처합니다.",["예지력","흐름 읽기","적응력","깊은 이해","침묵의 힘"],["혼자 두지 않기","마음 보이기","작은 것부터 실천","기다리기만 하지 않기"],{sum:"깊은 흐름과 통찰의 기운이 찾아온 날입니다.",do:"✅ 스스로에게 귀 기울여 보세요.",avoid:"⚠️ 서둘러 결정하지 마세요."},{career:"흐름을 읽고 다가올 것을 준비하는 일에서 힘을 발휘합니다.",student:"종합·흐름 읽기에 강점. 사회·역사·과학·정보. 융합·전략·연구 계열. 넓은 시야를 키우는 독서와 관찰이 힘입니다.",relation:"말하지 않아도 느낍니다. 조금씩 꺼내 보세요.",decision:"알 수 없는 확신을 믿으세요.",selfcare:"흘러가는 시간, 아무것도 하지 않는 시간이 필요합니다."},{subjects:["사회","역사","과학","정보","영어"],majors:["융합","국제학","데이터","정책","환경"],jobs:["전략/기획","연구원","컨설턴트","트렌드 분석","창업"]})
};

function calculateProfile(birthDate,answers,saju){
const sc={E:0,I:0,N:0,S:0,F:0,T:0,J:0,P:0};
answers.forEach((a,i)=>{const m=[[0,'N','S'],[1,'E','I'],[2,'T','F'],[3,'J','P'],[4,'N','S'],[5,'E','I'],[6,'N','S'],[7,'E','I'],[8,'T','F'],[9,'J','P'],[10,'N','S'],[11,'E','I']];const[,p,q]=m[i];a===1?sc[p]++:sc[q]++;});
const type=(sc.E>sc.I?'E':'I')+(sc.N>sc.S?'N':'S')+(sc.F>sc.T?'F':'T')+(sc.J>sc.P?'J':'P');
let el=saju?saju.dayMaster.elem:'wood';
const mf=['ENFP','INFP'].includes(type)?'Ne':['ENFJ','INFJ'].includes(type)?'Ni':['ESFJ','ISFJ'].includes(type)?'Si':['ESFP','ISFP'].includes(type)?'Se':['ENTJ','INTJ'].includes(type)?'Ni':['ESTJ','ISTJ'].includes(type)?'Si':['ESTP','ISTP'].includes(type)?'Se':['ENTP','INTP'].includes(type)?'Ti':'Ne';
let code;
if(el==='wood')code=['Ne','Ni'].includes(mf)?`WOOD_${mf}`:'WOOD_Ne';
else if(el==='fire')code=`FIRE_${type.includes('F')&&type.includes('E')?'Fe':type.includes('F')?'Fi':'Fe'}`;
else if(el==='earth')code=['Si','Se'].includes(mf)?`EARTH_${mf}`:'EARTH_Si';
else if(el==='metal')code=`METAL_${type.includes('T')&&(type.includes('J')||mf==='Te')?'Te':'Ti'}`;
else code='WATER_NiTi';
return{code,mbtiType:type,strongestElem:el};
}

function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}
function setCal(t){calType=t;document.getElementById('solBtn').classList.toggle('selected',t==='solar');document.getElementById('lunBtn').classList.toggle('selected',t==='lunar');}
function renderQ(){const q=questions[qIdx];document.getElementById('qTitle').textContent=`질문 ${qIdx+1}/${questions.length}`;document.getElementById('qText').textContent=q.t;document.getElementById('opt1').textContent=q.o1;document.getElementById('opt2').textContent=q.o2;document.getElementById('pbar').style.width=`${(qIdx+1)/questions.length*100}%`;}
function ans(n){answers[qIdx]=n;if(qIdx<questions.length-1){qIdx++;renderQ();}else showResult();}
function prevQ(){if(qIdx>0){qIdx--;renderQ();}}

function showResult(){
const birthDate=document.getElementById('birthDate').value||'2005-05-20';
const timeVal=document.getElementById('birthTime').value;
let[y,m,d]=birthDate.split('-').map(Number),h=null;
if(timeVal){const[hh]=timeVal.split(':').map(Number);h=hh;}
const saju=calculateSaju(y,m,d,h);currentSaju=saju;
const{code,mbtiType}=calculateProfile(birthDate,answers,saju);
const profile=ProfileTemplates[code];currentProfile=profile;
const persons=PersonDB[code]||[];

const labels=['년주','월주','일주','시주'],keys=['year','month','day','hour'];
document.getElementById('pillarGrid').innerHTML=keys.map((k,i)=>{const p=formatPillar(saju.pillars[k]);return`<div class="pillar"><div class="label">${labels[i]}</div><div class="ganji">${p.ko}</div><div class="hanja">${p.hanja}</div></div>`;}).join('');
document.getElementById('dayMaster').textContent=`일간(日干): ${saju.dayMaster.stem}(${saju.dayMaster.hanja}) · ${ELEM_KO[saju.dayMaster.elem]} 기운`;
const total=Object.values(saju.counts).reduce((a,b)=>a+b,0)||1;
const bar=document.getElementById('elemBar');bar.innerHTML='';
['wood','fire','earth','metal','water'].forEach(e=>{const pct=saju.counts[e]/total*100;if(pct>0){const div=document.createElement('div');div.style.width=pct+'%';div.style.background=ELEM_COLOR[e];bar.appendChild(div);}});
document.getElementById('elemLegend').innerHTML=['wood','fire','earth','metal','water'].map(e=>`<span><i class="dot" style="background:${ELEM_COLOR[e]}"></i>${ELEM_KO[e]} ${saju.counts[e]}</span>`).join('');
document.getElementById('sajuNote').textContent=saju.hasHour?'※ 절기·시주는 근사 계산입니다. 정밀 명식은 전문가 상담을 권합니다.':'※ 출생 시간이 없어 시주가 없습니다. 시간을 입력하면 더 정확해집니다.';

document.getElementById('rTags').innerHTML=`<span class="tag ${profile.elem}">${profile.tag}</span><span class="tag ${profile.elem}">${mbtiType}</span><span class="tag ${profile.elem}">일간 ${saju.dayMaster.stem}</span>`;
document.getElementById('rCore').textContent=profile.core;
document.getElementById('personBox').innerHTML=persons.map(p=>`<div class="person-card" style="border-color:var(--${profile.elem});"><h4>${p.name}</h4><p style="margin:0.4rem 0;font-size:0.95rem;">${p.desc}</p><p style="color:var(--${profile.elem}-txt);font-weight:500;">💡 ${p.tip}</p></div>`).join('');
document.getElementById('rStrength').innerHTML=profile.strength.map(s=>`<li>${s}</li>`).join('');
document.getElementById('rGrowth').innerHTML=profile.growth.map(g=>`<li>${g}</li>`).join('');
document.getElementById('rDailySum').textContent=profile.daily.sum;
document.getElementById('rDailyDo').textContent=profile.daily.do;
document.getElementById('rDailyAvoid').textContent=profile.daily.avoid;

const sc=profile.studentCareer||{subjects:[],majors:[],jobs:[]};
document.getElementById('careerContent').innerHTML=`<div class="career-box"><h4>📚 잘 맞는 과목 방향</h4><p>${sc.subjects.join(' · ')}</p></div><div class="career-box"><h4>🎓 추천 전공 계열</h4><p>${sc.majors.join(' · ')}</p></div><div class="career-box"><h4>💼 진로·직업 힌트</h4><p>${sc.jobs.join(' · ')}</p></div><p class="note">사주 일간 오행과 MBTI를 조합한 참고 자료입니다. 흥미와 현실을 함께 고려하세요.</p>`;
go('result');
}

function advice(cat){const box=document.getElementById('adviceBox');box.classList.remove('hidden');const key=cat==='student'?'student':cat;box.innerHTML=`<p style="line-height:1.8;">${currentProfile.advice[key]||currentProfile.advice.career}</p>`;box.scrollIntoView({behavior:'smooth'});}
function reset(){qIdx=0;answers=[];currentProfile=null;currentSaju=null;go('splash');}
renderQ();
