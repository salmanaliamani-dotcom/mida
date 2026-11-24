// shared shot helpers
const CU=(o)=>Object.assign({x:540,y:1080,s:1.2},o);           // close-up placement
const at=(x,feet,s,o)=>Object.assign({x,y:feet-560*s,s},o);   // place by feet line
function closeUp(t,bgName,k,pose,line,o={}){useBG(bgName);cam(t,540,o.cy??960,kf(t,[[T(line),o.z0??1.3],[TE(line)+1,o.z1??1.4]]));
  const p=CU(pose||{});if(line&&o.talk!==false)p.mouth=o.all?talkAll(t,line):talkIn(t,line);show({[k]:p},t);GRADE.setAttribute('opacity',o.grade??.25);WARM.setAttribute('opacity',o.warm??.2);}
function QUIZ(n){return (t,lt,ln)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(QL[n]),n);};}
function CTA(line){return (t)=>{useBG('card');cam(t,540,960,1);show({},t);ctaCard(t,T(line),T(line,'متابعة'));};}
function ANS(n,line,after){return (t,lt)=>{if(after&&t>T(line)+1.2){after(t,lt);return;}useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(line),n);};}
function badgeFix(){}
