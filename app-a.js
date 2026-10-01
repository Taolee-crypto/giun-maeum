/* 기운과 마음 - 사주×MBTI×타로 상세 해석 */
const STEMS=['갑','을','병','정','무','기','경','신','임','계'];
const STEMS_H=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES=['자','축','인','묘','진','사','오','미','신','유','술','해'];
const BRANCHES_H=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const STEM_ELEM=['wood','wood','fire','fire','earth','earth','metal','metal','water','water'];
const BRANCH_ELEM=['water','earth','wood','wood','earth','fire','fire','earth','metal','metal','earth','water'];
const ELEM_KO={wood:'목',fire:'화',earth:'토',metal:'금',water:'수'};
const ELEM_COLOR={wood:'#4CAF50',fire:'#FF7043',earth:'#C08B52',metal:'#607D8B',water:'#5C6BC0'};

const DayMasterDB={
'갑':{title:'갑목(甲木) · 큰 나무',elem:'wood',core:'하늘을 향해 뻗는 큰 나무처럼, 개척과 리더십의 기운을 가졌습니다. 앞장서고 방향을 제시하는 힘이 강합니다.',traits:['개척 정신','리더십','곧은 성격','추진력','자존심'],grow:['유연함 기르기','타협의 미덕','세부까지 챙기기'],student:'리더·기획·창업 성향이 강합니다. 학생회·프로젝트 리더 경험이 큰 자산이 됩니다. 국어·사회·경영 관련 과목과 잘 맞습니다.',career:'기획, 경영, 교육, 정치, 건축, 산림·환경, 창업 등 "방향을 잡고 이끄는" 일이 잘 맞습니다.'},
'을':{title:'을목(乙木) · 덩굴·꽃',elem:'wood',core:'바람에 흔들려도 끊어지지 않는 덩굴처럼, 유연하고 적응력 있는 성장의 기운입니다. 관계와 조화를 중시합니다.',traits:['유연성','적응력','섬세함','손재주','조화'],grow:['자기 주장 분명히 하기','한 곳에 뿌리내리기'],student:'손재주·표현·사람 관계에 강점이 있습니다. 미술·음악·디자인·외국어·봉사 활동이 잘 맞습니다.',career:'디자인, 예능, 상담, 서비스, 무역, 원예, 패션, 의료 보조 등 섬세함과 조화가 필요한 분야가 좋습니다.'},
'병':{title:'병화(丙火) · 태양',elem:'fire',core:'만물을 비추는 태양처럼, 밝고 뜨거운 표현과 영향력의 기운입니다. 존재감이 크고 주변을 밝힙니다.',traits:['카리스마','표현력','낙관','열정','개방성'],grow:['절제','남의 속도 인정','혼자 있는 시간'],student:'발표·공연·리더십 활동에서 두각을 나타냅니다. 국어·영어·체육·예능 과목과 잘 맞습니다.',career:'방송, 연예, 교육, 영업, 마케팅, 정치, 홍보, 스포츠 등 "빛나고 전하는" 일이 잘 맞습니다.'},
'정':{title:'정화(丁火) · 촛불·별',elem:'fire',core:'한 곳을 비추는 촛불처럼, 집중과 진심의 기운입니다. 겉으로 드러나지 않아도 깊이 있는 따뜻함이 있습니다.',traits:['집중력','진심','섬세한 배려','예술 감각','인내'],grow:['자기 표현 늘리기','완벽주의 내려놓기'],student:'깊이 파고드는 학습과 창작에 강점이 있습니다. 문학·예술·심리·과학 실험 등이 잘 맞습니다.',career:'연구, 작가, 디자이너, 상담, 의료, 요리, 공예, IT 등 "한 분야를 깊이 비추는" 일이 좋습니다.'},
'무':{title:'무토(戊土) · 산·큰 땅',elem:'earth',core:'움직이지 않는 산처럼, 안정과 신뢰의 기운입니다. 중심을 잡고 주변을 품는 힘이 있습니다.',traits:['안정감','신뢰','포용력','현실 감각','책임감'],grow:['변화 수용','감성 표현','유연한 계획'],student:'꾸준함과 책임감이 강점입니다. 수학·사회·과학·체육 등 체계적 과목과 잘 맞습니다.',career:'행정, 부동산, 건설, 금융, 교육, 농업, 물류, 공공기관 등 "기반을 다지는" 일이 잘 맞습니다.'},
'기':{title:'기토(己土) · 밭·정원',elem:'earth',core:'만물을 키우는 밭처럼, 돌보고 키워내는 기운입니다. 세심하고 실용적인 지원의 힘이 있습니다.',traits:['세심함','돌봄','실용성','인내','조율'],grow:['자기 돌봄','경계 설정','큰 그림 보기'],student:'남을 돕고 정리·관리하는 일에 강점이 있습니다. 가정·보건·교육·행정 관련이 잘 맞습니다.',career:'교육, 간호, 상담, 요리, 농업, 비서·행정, 회계, 복지 등 "키우고 돌보는" 일이 좋습니다.'},
'경':{title:'경금(庚金) · 쇠·바위',elem:'metal',core:'단단한 쇠처럼, 결단과 정의의 기운입니다. 원칙을 지키고 밀어붙이는 힘이 강합니다.',traits:['결단력','정의감','승부욕','직설','추진력'],grow:['부드러움','경청','과정의 여유'],student:'목표를 정하면 밀어붙이는 힘이 있습니다. 수학·사회(법·경제)·체육·과학이 잘 맞습니다.',career:'법조, 군인·경찰, 의료(외과), 엔지니어, 운동선수, 경영, 감사 등 "원칙과 실행"이 필요한 분야가 좋습니다.'},
'신':{title:'신금(辛金) · 보석·바늘',elem:'metal',core:'다듬어진 보석처럼, 예리함과 아름다움의 기운입니다. 디테일과 완성도를 중시합니다.',traits:['예리함','완벽 지향','미적 감각','분석력','자존심'],grow:['충분함으로 만족하기','비판보다 격려'],student:'세밀한 분석과 완성도 높은 결과물에 강점이 있습니다. 수학·미술·정보·과학이 잘 맞습니다.',career:'디자인, 보석·패션, 의료(정밀), IT, 회계, 연구, 미용, 품질관리 등 "다듬고 완성하는" 일이 좋습니다.'},
'임':{title:'임수(壬水) · 큰 강·바다',elem:'water',core:'흐름을 멈추지 않는 큰 물처럼, 지혜와 포용의 기운입니다. 변화를 읽고 넓게 담아냅니다.',traits:['지혜','포용','유연한 사고','직관','적응'],grow:['한곳에 집중','감정 표현','실행력'],student:'넓은 시야와 종합적 사고에 강점이 있습니다. 사회·역사·과학·정보·철학이 잘 맞습니다.',career:'연구, 컨설팅, 무역, 물류, 언론, 외교, 환경, 전략기획 등 "흐름을 읽고 연결하는" 일이 좋습니다.'},
'계':{title:'계수(癸水) · 이슬·빗물',elem:'water',core:'스며드는 이슬처럼, 섬세한 감수성과 직관의 기운입니다. 보이지 않는 곳을 적셔 줍니다.',traits:['감수성','직관','섬세함','공감','상상력'],grow:['현실적 실행','자기 경계','드러내기'],student:'감수성과 상상력이 강점입니다. 문학·예술·심리·외국어·환경이 잘 맞습니다.',career:'작가, 예술가, 상담, 치유, 연구, 번역, 디자인, 복지 등 "스며들고 치유하는" 일이 좋습니다.'}
};

const TAROT=[
{n:0,name:'바보',en:'The Fool',mean:'새로운 시작, 순수, 모험, 가능성. 발걸음을 내딛을 때입니다.',tip:'준비가 완벽하지 않아도 괜찮습니다. 첫 걸음이 길을 만듭니다.'},
{n:1,name:'마법사',en:'The Magician',mean:'능력, 의지, 실현. 이미 가진 도구로 충분히 만들어낼 수 있습니다.',tip:'아이디어를 행동으로 옮기세요. 지금이 실현의 때입니다.'},
{n:2,name:'여사제',en:'The High Priestess',mean:'직관, 내면의 지혜, 침묵. 답이 이미 당신 안에 있습니다.',tip:'바깥의 소음보다 내면의 소리에 귀 기울여 보세요.'},
{n:3,name:'여황제',en:'The Empress',mean:'풍요, 창조, 돌봄. 키우고 가꾸는 에너지가 흐릅니다.',tip:'자신과 주변을 돌보는 시간이 결실을 가져옵니다.'},
{n:4,name:'황제',en:'The Emperor',mean:'질서, 책임, 구조. 기반을 다지고 규칙을 세울 때입니다.',tip:'목표를 명확히 하고 체계를 잡으면 안정이 옵니다.'},
{n:5,name:'교황',en:'The Hierophant',mean:'전통, 가르침, 안내. 배움과 멘토의 기운이 있습니다.',tip:'선배·스승·좋은 시스템을 활용하세요.'},
{n:6,name:'연인',en:'The Lovers',mean:'선택, 관계, 가치의 일치. 진심이 통하는 연결이 중요합니다.',tip:'머리와 마음이 같은 방향을 가리키는지 확인하세요.'},
{n:7,name:'전차',en:'The Chariot',mean:'의지, 승리, 전진. 집중하면 돌파할 수 있습니다.',tip:'방향을 정했다면 흔들리지 말고 밀어붙이세요.'},
{n:8,name:'힘',en:'Strength',mean:'용기, 인내, 부드러운 통제. 강함은 부드러움 안에 있습니다.',tip:'조급함을 내려놓고 끈기로 다가가세요.'},
{n:9,name:'은둔자',en:'The Hermit',mean:'성찰, 고독, 내면 탐구. 혼자만의 시간이 필요합니다.',tip:'잠깐 멈추고 방향을 다시 점검해 보세요.'},
{n:10,name:'운명의 수레바퀴',en:'Wheel of Fortune',mean:'변화, 순환, 전환점. 흐름이 바뀌는 시기입니다.',tip:'변화에 저항하기보다 흐름을 타 보세요.'},
{n:11,name:'정의',en:'Justice',mean:'공정, 균형, 책임. 진실과 결과가 맞닿는 때입니다.',tip:'선택의 결과에 책임지되, 편견 없이 바라보세요.'},
{n:12,name:'매달린 사람',en:'The Hanged Man',mean:'관점 전환, 내려놓음, 기다림. 다른 각도에서 볼 때입니다.',tip:'서두르지 마세요. 멈춤이 곧 준비입니다.'},
{n:13,name:'죽음',en:'Death',mean:'끝과 시작, 변환. 낡은 것이 지고 새것이 옵니다.',tip:'보내야 할 것을 보내야 다음이 열립니다.'},
{n:14,name:'절제',en:'Temperance',mean:'균형, 조화, 치유. 극단을 피하고 가운데를 잡으세요.',tip:'일과 휴식, 이성과 감정의 균형을 맞추세요.'},
{n:15,name:'악마',en:'The Devil',mean:'집착, 유혹, 그림자. 묶여 있는 것을 알아차리세요.',tip:'습관·두려움·집착을 직면하면 자유로워집니다.'},
{n:16,name:'탑',en:'The Tower',mean:'붕괴와 각성. 거짓 기반이 무너지고 진실이 드러납니다.',tip:'충격 뒤에도 당신은 다시 세울 수 있습니다.'},
{n:17,name:'별',en:'The Star',mean:'희망, 치유, 영감. 어두운 밤 뒤의 빛입니다.',tip:'작은 희망을 붙잡으세요. 회복의 기운이 있습니다.'},
{n:18,name:'달',en:'The Moon',mean:'불확실, 꿈, 직관. 아직 흐릿한 것들을 조심하세요.',tip:'성급한 결론보다 시간을 두고 느껴 보세요.'},
{n:19,name:'태양',en:'The Sun',mean:'기쁨, 성공, 활력. 밝고 따뜻한 기운이 가득합니다.',tip:'성과를 인정하고 즐기세요. 자신감을 가져도 좋습니다.'},
{n:20,name:'심판',en:'Judgement',mean:'각성, 부름, 재평가. 다음 단계로 나아갈 신호입니다.',tip:'과거의 경험을 통합하고 새로운 소명에 응답하세요.'},
{n:21,name:'세계',en:'The World',mean:'완성, 통합, 성취. 한 사이클이 마무리됩니다.',tip:'결과를 축하하고, 다음 여정을 준비하세요.'}
];

function getDayPillarIndex(y,m,d){const b=new Date(1900,0,1),t=new Date(y,m-1,d);return((10+Math.floor((t-b)/86400000))%60+60)%60;}
function getYearPillar(y,m,d){let yr=y;if(m<2||(m===2&&d<4))yr=y-1;return((yr-1984)%60+60)%60;}
function getMonthBranchIndex(m,d){const a=[[2,4,2],[3,6,3],[4,5,4],[5,6,5],[6,6,6],[7,7,7],[8,8,8],[9,8,9],[10,8,10],[11,7,11],[12,7,0],[1,6,1]];for(let i=0;i<12;i++){const[sm,sd,bi]=a[i],n=a[(i+1)%12];if(m===sm&&d>=sd)return bi;if(m===n[0]&&d<n[1])return bi;if(sm<n[0]){if(m>sm&&m<n[0])return bi;}else if(m>sm||m<n[0])return bi;}return(m+1)%12;}
function getMonthStem(ysi,mbi){const base=[2,4,6,8,0],st=base[ysi%5],off=(mbi-2+12)%12;return(st+off)%10;}
function getHourBranch(h){return(h>=23||h<1)?0:Math.floor((h+1)/2);}
function getHourStem(dsi,hbi){return([0,2,4,6,8][dsi%5]+hbi)%10;}
function calculateSaju(y,m,d,h){const yi=getYearPillar(y,m,d),mbi=getMonthBranchIndex(m,d),msi=getMonthStem(yi%10,mbi),di=getDayPillarIndex(y,m,d),dsi=di%10,dbi=di%12;let hsi=null,hbi=null;if(h!=null&&!isNaN(h)){hbi=getHourBranch(h);hsi=getHourStem(dsi,hbi);}const p={year:{s:yi%10,b:yi%12},month:{s:msi,b:mbi},day:{s:dsi,b:dbi},hour:hsi!=null?{s:hsi,b:hbi}:null};const c={wood:0,fire:0,earth:0,metal:0,water:0};const add=(s,b)=>{c[STEM_ELEM[s]]++;c[BRANCH_ELEM[b]]++;};add(p.year.s,p.year.b);add(p.month.s,p.month.b);add(p.day.s,p.day.b);if(p.hour)add(p.hour.s,p.hour.b);return{pillars:p,dayMaster:{stem:STEMS[dsi],hanja:STEMS_H[dsi],elem:STEM_ELEM[dsi]},counts:c,hasHour:!!p.hour};}
function formatPillar(p){return p?{ko:STEMS[p.s]+BRANCHES[p.b],hanja:STEMS_H[p.s]+BRANCHES_H[p.b]}:{ko:'—',hanja:'—'};}
function drawTarot(count){const deck=[...TAROT];for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}return deck.slice(0,count);}
let calType='solar',qIdx=0,answers=[],currentProfile=null,currentSaju=null,currentTarot=null;
const questions=[{t:"새로운 아이디어가 떠오르면 주로 어떻게 하시나요?",o1:"바로 이것저것 시도해보고 싶다",o2:"구체적인 사실과 경험을 먼저 확인한다"},{t:"마음이 상할 때 어떻게 위로받으시나요?",o1:"사람들과 이야기하며 풀어간다",o2:"혼자만의 시간을 가지며 정리한다"},{t:"중요한 결정을 할 때 무엇을 더 중시하시나요?",o1:"논리와 사실 기준",o2:"마음과 가치 기준"},{t:"하루를 보낼 때 더 편한 방식은?",o1:"계획을 세우고 지키는 것",o2:"흐름에 맞춰 유연하게 보내는 것"},{t:"미래에 대해 생각할 때 더 끌리는 쪽은?",o1:"새로운 가능성·변화",o2:"익숙하고 안정적인 모습"},{t:"의견이 다를 때 어떻게 하시나요?",o1:"서로 이야기 맞춰보기",o2:"각자의 생각 존중하기"},{t:"일을 진행할 때 먼저 떠오르는 것은?",o1:"전체적인 그림·방향",o2:"구체적인 단계·절차"},{t:"에너지를 얻는 곳은?",o1:"사람들과 함께 있을 때",o2:"혼자 있을 때"},{t:"설명을 들을 때 더 중요한 것은?",o1:"논리적인 흐름",o2:"진심이 담겼는지"},{t:"마무리하는 방식은?",o1:"여유를 두고 마무리",o2:"미리 끝내 여유를 갖기"},{t:"배울 때 더 편한 방식",o1:"새로운 방식·다양한 시도",o2:"익숙한 방식·확실한 이해"},{t:"스스로를 표현할 때",o1:"함께 공유하며 표현",o2:"조용히 행동으로 보여줌"}];
const PersonDB={WOOD_Ne:[{name:"넬슨 만델라",desc:"분열된 세상을 화합으로 이끈 희망의 상징",tip:"연결하는 힘으로 한 사람씩 마음을 이어보세요."},{name:"오프라 윈프리",desc:"희망을 발견하고 수백만에게 영감",tip:"당신의 이야기는 누군가의 희망이 됩니다."}],WOOD_Ni:[{name:"마틴 루터 킹 주니어",desc:"평화와 평등을 향해 한결같이 나아감",tip:"신념이 흔들릴 때도 방향만 확인하세요."},{name:"테레사 수녀",desc:"보이지 않는 곳에서 진심을 다해 살아감",tip:"너무 혼자 감당하지 마세요."}],FIRE_Fe:[{name:"다이애나비",desc:"소외된 이들에게 손을 내민 인간의 왕비",tip:"다른 사람을 생각하되 자신도 돌보세요."},{name:"마더 테레사",desc:"가장 아픈 곳에 먼저 다가간 사랑의 삶",tip:"거절하는 것도 사랑입니다."}],FIRE_Fi:[{name:"프리다 칼로",desc:"아픔 속에서도 진심 어린 자화상으로 감동",tip:"당신 그 자체로 충분히 아름답습니다."},{name:"빈센트 반 고흐",desc:"진심으로 그림을 그린 화가",tip:"포기하지 마세요. 시간이 지나면 빛을 발합니다."}],EARTH_Si:[{name:"퀸 엘리자베스 2세",desc:"한결같은 마음으로 나라를 지킴",tip:"변하지 않는 것의 소중함을 아는 당신입니다."},{name:"토마스 에디슨",desc:"수천 번 실패 뒤 빛을 만든 발명가",tip:"꾸준함이 가장 큰 재능입니다."}],EARTH_Se:[{name:"마이클 조던",desc:"지금 이 순간에 온 힘을 다해 최고가 됨",tip:"눈앞의 일에 집중하되 먼 곳도 보세요."},{name:"헬렌 켈러",desc:"어려운 환경에서도 꾸준히 나아감",tip:"오늘의 작은 걸음이 내일의 큰 길이 됩니다."}],METAL_Te:[{name:"마하트마 간디",desc:"명확한 원칙으로 큰 변화를 이끔",tip:"따라오지 않을 때 기다려 주세요."},{name:"앨런 튜링",desc:"논리와 질서로 세상을 바꾼 천재",tip:"질서와 함께 마음의 소리도 들으세요."}],METAL_Ti:[{name:"알버트 아인슈타인",desc:"세상의 본질을 파고들어 진실을 밝힘",tip:"쉬운 말로 풀어서 이야기해 주세요."},{name:"마리 퀴리",desc:"한 분야에 깊이 몰두한 과학자",tip:"완벽하지 않아도 충분히 가치 있습니다."}],WATER_NiTi:[{name:"레오나르도 다 빈치",desc:"흐름을 읽고 예술과 과학을 펼침",tip:"예감은 틀리지 않습니다. 작은 것부터 실천하세요."},{name:"정약용",desc:"시대의 흐름을 읽고 변화를 제시함",tip:"때가 되면 생각이 빛을 발합니다."}]};
function mkProf(tag,elem,core,str,grw,daily,adv,sc){return{tag,elem,core,strength:str,growth:grw,daily,advice:adv,studentCareer:sc};}
