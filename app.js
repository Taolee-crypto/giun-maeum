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
/* Full profiles + student career data + UI logic: see artifacts/index.html for complete single-file version */
console.log('Saju engine loaded. For full profiles use the single-file index.html from artifacts.');
alert('app.js 부분 로직입니다. 전체 기능은 artifacts/index.html 단일 파일을 사용하세요.');
