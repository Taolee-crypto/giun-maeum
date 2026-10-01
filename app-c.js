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
const dm=DayMasterDB[saju.dayMaster.stem];

const labels=['년주','월주','일주','시주'],keys=['year','month','day','hour'];
document.getElementById('pillarGrid').innerHTML=keys.map((k,i)=>{const p=formatPillar(saju.pillars[k]);return`<div class="pillar"><div class="label">${labels[i]}</div><div class="ganji">${p.ko}</div><div class="hanja">${p.hanja}</div></div>`;}).join('');
document.getElementById('dayMaster').textContent=`일간(日干): ${saju.dayMaster.stem}(${saju.dayMaster.hanja}) · ${ELEM_KO[saju.dayMaster.elem]} 기운`;
const total=Object.values(saju.counts).reduce((a,b)=>a+b,0)||1;
const bar=document.getElementById('elemBar');bar.innerHTML='';
['wood','fire','earth','metal','water'].forEach(e=>{const pct=saju.counts[e]/total*100;if(pct>0){const div=document.createElement('div');div.style.width=pct+'%';div.style.background=ELEM_COLOR[e];bar.appendChild(div);}});
document.getElementById('elemLegend').innerHTML=['wood','fire','earth','metal','water'].map(e=>`<span><i class="dot" style="background:${ELEM_COLOR[e]}"></i>${ELEM_KO[e]} ${saju.counts[e]}</span>`).join('');
document.getElementById('sajuNote').textContent=saju.hasHour?'※ 절기·시주는 근사 계산입니다. 정밀 명식은 전문가 상담을 권합니다.':'※ 출생 시간이 없어 시주가 없습니다. 시간을 입력하면 더 정확해집니다.';

if(dm){
  document.getElementById('dayMasterDetail').innerHTML=`
    <h4 style="margin:0.8rem 0 0.4rem;">${dm.title}</h4>
    <p style="line-height:1.8;margin-bottom:0.6rem;">${dm.core}</p>
    <p><strong>성향</strong>: ${dm.traits.join(' · ')}</p>
    <p style="margin-top:0.4rem;"><strong>성장 포인트</strong>: ${dm.grow.join(' · ')}</p>
    <p style="margin-top:0.6rem;font-size:0.95rem;"><strong>🎓 학생</strong>: ${dm.student}</p>
    <p style="margin-top:0.4rem;font-size:0.95rem;"><strong>💼 직업 방향</strong>: ${dm.career}</p>
  `;
}

document.getElementById('rTags').innerHTML=`<span class="tag ${profile.elem}">${profile.tag}</span><span class="tag ${profile.elem}">${mbtiType}</span><span class="tag ${profile.elem}">일간 ${saju.dayMaster.stem}</span>`;
document.getElementById('rCore').textContent=profile.core;
document.getElementById('personBox').innerHTML=persons.map(p=>`<div class="person-card" style="border-color:var(--${profile.elem});"><h4>${p.name}</h4><p style="margin:0.4rem 0;font-size:0.95rem;">${p.desc}</p><p style="color:var(--${profile.elem}-txt);font-weight:500;">💡 ${p.tip}</p></div>`).join('');
document.getElementById('rStrength').innerHTML=profile.strength.map(s=>`<li>${s}</li>`).join('');
document.getElementById('rGrowth').innerHTML=profile.growth.map(g=>`<li>${g}</li>`).join('');
document.getElementById('rDailySum').textContent=profile.daily.sum;
document.getElementById('rDailyDo').textContent=profile.daily.do;
document.getElementById('rDailyAvoid').textContent=profile.daily.avoid;

const sc=profile.studentCareer||{subjects:[],majors:[],jobs:[]};
document.getElementById('careerContent').innerHTML=`<div class="career-box"><h4>📚 잘 맞는 과목 방향</h4><p>${sc.subjects.join(' · ')}</p></div><div class="career-box"><h4>🎓 추천 전공 계열</h4><p>${sc.majors.join(' · ')}</p></div><div class="career-box"><h4>💼 진로·직업 힌트</h4><p>${sc.jobs.join(' · ')}</p></div><p class="note">사주 일간·오행과 MBTI를 조합한 참고 자료입니다. 흥미와 현실을 함께 고려하세요.</p>`;

currentTarot=drawTarot(3);
const positions=['현재의 에너지','주의할 점','앞으로의 흐름'];
document.getElementById('tarotBox').innerHTML=currentTarot.map((c,i)=>`
  <div class="career-box" style="border-left:3px solid #7E57C2;">
    <h4>🃏 ${positions[i]} — ${c.name} (${c.en})</h4>
    <p style="margin:0.3rem 0;">${c.mean}</p>
    <p style="color:#5C6BC0;font-weight:500;">💡 ${c.tip}</p>
  </div>
`).join('')+`<p class="note">타로는 미래를 단정하지 않습니다. 지금 마음과 상황을 비추는 거울로 활용하세요. 카드를 다시 뽑으려면 아래 버튼을 누르세요.</p>
<button class="btn btn-option" style="margin-top:0.5rem;" onclick="redrawTarot()">🔄 타로 다시 뽑기</button>`;

go('result');
}

function redrawTarot(){
  currentTarot=drawTarot(3);
  const positions=['현재의 에너지','주의할 점','앞으로의 흐름'];
  document.getElementById('tarotBox').innerHTML=currentTarot.map((c,i)=>`
  <div class="career-box" style="border-left:3px solid #7E57C2;">
    <h4>🃏 ${positions[i]} — ${c.name} (${c.en})</h4>
    <p style="margin:0.3rem 0;">${c.mean}</p>
    <p style="color:#5C6BC0;font-weight:500;">💡 ${c.tip}</p>
  </div>
`).join('')+`<p class="note">타로는 미래를 단정하지 않습니다. 지금 마음과 상황을 비추는 거울로 활용하세요.</p>
<button class="btn btn-option" style="margin-top:0.5rem;" onclick="redrawTarot()">🔄 타로 다시 뽑기</button>`;
}

function advice(cat){const box=document.getElementById('adviceBox');box.classList.remove('hidden');const key=cat==='student'?'student':cat;box.innerHTML=`<p style="line-height:1.8;">${currentProfile.advice[key]||currentProfile.advice.career}</p>`;box.scrollIntoView({behavior:'smooth'});}
function reset(){qIdx=0;answers=[];currentProfile=null;currentSaju=null;currentTarot=null;go('splash');}
renderQ();
