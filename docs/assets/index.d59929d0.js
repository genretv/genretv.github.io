var ne=Object.defineProperty;var I=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var Y=(n,r,i)=>r in n?ne(n,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[r]=i,k=(n,r)=>{for(var i in r||(r={}))ae.call(r,i)&&Y(n,i,r[i]);if(I)for(var i of I(r))se.call(r,i)&&Y(n,i,r[i]);return n};import{A as ie,l as B,c as oe,p as le,a as de,b as ce,d as ue,u as pe,F as ge,R as he,P as fe,e as me,f as ye,g as De,h as Se,j as l,B as S,i as e,C as be,k as b,r as d,T as U,m as xe,n as Ue,o as ve,q as we,s as L,I as W,t as Ee,D as A,v,w as ke,x as Le,y as Ae,z as je,E as Re,G as Te,H as Pe,J as Oe,K as Me,L as Fe}from"./vendor.115dd91d.js";const _e=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}};_e();const w={renewed:"r",finished:"f",canceled:"c",unknown:""},Ce=Object.keys(w),_={Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6,Sunday:7,Binge:8},Je=Object.keys(_),Ne={type:"array",items:{type:"object",properties:{date:{type:"string"},text:{type:"string"}},required:["date","text"]}},Ie={type:"array",items:{type:"object",properties:{name:{type:"string"},imdb:{type:"string",nullable:!0},genre:{type:"string",nullable:!0},status:{type:"string",nullable:!0,enum:Ce},statusUncertain:{type:"boolean",nullable:!0},studio:{type:"string",nullable:!0},page:{type:"object",properties:{title:{type:"string",nullable:!0},link:{type:"string",nullable:!0}},nullable:!0,required:["link"],additionalProperties:!1},seasons:{type:"array",uniqueItems:!0,items:{type:"object",properties:{num:{type:"integer"},days:{type:"array",items:{type:"string",enum:Je}},studio:{type:"string",nullable:!0},page:{type:"object",properties:{title:{type:"string",nullable:!0},link:{type:"string",nullable:!0}},nullable:!0,required:["link"],additionalProperties:!1},runningPeriods:{type:"array",items:{type:"object",properties:{startDate:{type:"string",nullable:!0},startDateUncertain:{type:"boolean",nullable:!0},endDate:{type:"string",nullable:!0},endDateUncertain:{type:"boolean",nullable:!0}},required:[],additionalProperties:!1}}},required:["num"],additionalProperties:!1}}},required:["name"],additionalProperties:!1}},z={border:"solid 1px #dddddd",borderRadius:"10px",padding:"15px 20px",backgroundColor:"white",maxWidth:"970px",margin:"30px auto"};function x(n){const r=new Date;if(n==="summer"){const i=r.getMonth()<7?r.getFullYear():r.getFullYear()+1;return"September 21, "+i.toString()}else if(n==="fall"){const i=r.getMonth()<10?r.getFullYear():r.getFullYear()+1;return"December 21, "+i.toString()}else{if(n==="winter")return"March 21, "+(r.getFullYear()+1).toString();if(n==="spring"){const i=r.getMonth()<4?r.getFullYear():r.getFullYear()+1;return"June 21, "+i.toString()}else if(parseInt(n).toString()===n)return"December 31, "+n}return n}async function H(n){const r=await fetch(n);if(r.ok)return await r.json();throw new Error(r.statusText)}async function K(n){const r={};for(const i of n){if(!i.trim())continue;const t=await fetch(i);if(t.ok){const a=await t.json();for(const s of a)s.name in r?B.exports.merge(r[s.name],s):r[s.name]=s}else throw new Error(t.statusText||await t.text())}return Object.values(r)}const X=new ie({strict:!0}),j=X.compile(Ne),R=X.compile(Ie),Ye="https://raw.githubusercontent.com/genretv/data/main/main/updateLog.json",$e="https://raw.githubusercontent.com/genretv/data/main/main/data.json",Ve={updateLogUrl:Ye,dataUrls:[$e]},Q=oe({name:"jsonfiles",initialState:Ve,reducers:{setUpdateLogUrl:(n,r)=>{n.updateLogUrl=r.payload},setDataUrls:(n,r)=>{n.dataUrls=r.payload}}}),{setDataUrls:Ge,setUpdateLogUrl:qe}=Q.actions;var Be=Q.reducer;const We={key:"root",version:1,storage:ue},ze=le(We,de({jsonfiles:Be})),$=ce({reducer:ze,middleware:n=>n({serializableCheck:{ignoredActions:[ge,he,fe,me,ye,De]}})}),T=Se,Z=()=>pe();function He({classes:n,size:r,disableShrink:i,message:t,position:a,top:s,show:o}){return o?l(S,{sx:{textAlign:"center",left:"50%",position:a||"absolute",top:s||"100px",zIndex:1e5,transform:"translate(-50%, 0)",fontSize:"3em"},children:[e(be,{size:r||200,disableShrink:i}),t&&e("div",{className:n==null?void 0:n.message,children:t})]}):e(b,{})}const V="The data JSON is valid";function ee({title:n,data:r,urls:i,children:t}){const[a,s]=d.exports.useState(""),[o,c]=d.exports.useState(),[g,f]=d.exports.useState(!1);return d.exports.useEffect(()=>{if(f(!0),i&&i.length>0)(async()=>{try{c(await K(i))}catch(h){s(h.message)}})();else try{c(r?JSON.parse(r):[])}catch(h){h instanceof SyntaxError?s(`${h.name}: ${h.message}`):s("Unknown error trying to parse the json")}f(!1)},[i,r]),d.exports.useEffect(()=>{if(!o||!o.length){s("");return}try{R(o)?(s(V),f(!1)):s(JSON.stringify(R.errors))}catch(h){h instanceof SyntaxError?s(`${h.name}: ${h.message}`):s("Unknown error trying to parse the json")}f(!1)},[o]),l(S,{sx:{padding:2},children:[e(He,{position:"fixed",show:g}),e(U,{sx:{padding:2},component:"h2",children:n||"Data"}),a&&e(U,{sx:{padding:2,color:a===V?"inherit":"red"},children:a}),t]})}function Ke(){const n=T(p=>p.jsonfiles.dataUrls),r=Z(),{register:i,control:t,watch:a}=xe(),{fields:s,append:o,remove:c,replace:g}=Ue({control:t,name:"fieldArray"}),f=a("fieldArray"),h=s.map((p,m)=>k(k({},p),f[m]));return d.exports.useEffect(()=>{g(n.map(p=>({dataUrl:p})))},[]),d.exports.useEffect(()=>{const p=h.map(m=>m.dataUrl);(p.length!==n.length||B.exports.difference(p,n).length>0)&&r(Ge(h.map(m=>m.dataUrl)))},[h]),l(ee,{urls:h.map(p=>p.dataUrl),title:"Data URLs",children:[e(ve,{onClick:()=>o({dataUrl:""}),variant:"outlined",startIcon:e(we,{}),children:"Add Data URL"}),h.map((p,m)=>l(S,{sx:{padding:2,width:"100%"},children:[e(L,k({sx:{width:"90%"},label:"Data URL",required:!0},i(`fieldArray.${m}.dataUrl`))),e(W,{"aria-label":"delete",onClick:()=>c(m),children:e(Ee,{})})]},`fieldArray.${m}.dataUrl`))]})}const G="The update log JSON is valid";function te({data:n,url:r,title:i,children:t}){const[a,s]=d.exports.useState(""),[o,c]=d.exports.useState();return d.exports.useEffect(()=>{if(r)(async()=>{try{c(await H(r))}catch(g){s(g.message)}})();else try{c(n?JSON.parse(n):[])}catch(g){g instanceof SyntaxError?s(`${g.name}: ${g.message}`):s("Unknown error trying to parse the json")}},[r,n]),d.exports.useEffect(()=>{if(!o||!o.length){s("");return}try{j(o)?s(G):s(JSON.stringify(j.errors))}catch{s("Unknown error trying to parse the json")}},[o]),l(S,{sx:{padding:2},children:[e(U,{sx:{padding:2},component:"h2",children:i||"Update log"}),a&&e(U,{sx:{padding:2,color:a===G?"inherit":"red"},children:a}),t]})}function Xe(){function n(t){i(qe(t))}const r=T(t=>t.jsonfiles.updateLogUrl),i=Z();return e(te,{url:r,title:"Update log URL",children:e(L,{onChange:t=>n(t.currentTarget.value),fullWidth:!0,defaultValue:r,label:"Log file URL",variant:"outlined"})})}function Qe(){const[n,r]=d.exports.useState(""),[i,t]=d.exports.useState("");return l(b,{children:[e(ee,{data:n,title:"Data JSON validator",children:e(L,{onChange:a=>r(a.currentTarget.value),multiline:!0,maxRows:15,fullWidth:!0,label:"Data JSON",variant:"outlined"})}),e(te,{data:i,title:"Update log JSON validator",children:e(L,{onChange:a=>t(a.currentTarget.value),multiline:!0,maxRows:15,fullWidth:!0,label:"Update log JSON",variant:"outlined"})})]})}function Ze({}){return l(S,{sx:z,children:[e(Ke,{}),e(A,{}),e(Xe,{}),e(A,{}),e(Qe,{})]})}function et({data:n}){const[r,i]=d.exports.useState();return d.exports.useEffect(()=>{n.sort((t,a)=>!t.days||!t.days.length?1:!a.days||!a.days.length?-1:_[t.days[0]]-_[a.days[0]]),i(n)},n),e("div",{children:l("table",{children:[e("thead",{children:l("tr",{children:[e("td",{width:"225",children:e("strong",{children:"On Now:"})}),e("td",{width:"80",children:e("strong",{children:"Day"})}),e("td",{width:"115",children:e("strong",{children:"Official Page"})}),e("td",{width:"190",children:e("strong",{children:"Genre"})}),e("td",{width:"23",children:e("strong",{children:"S"})}),e("td",{width:"110",children:e("strong",{children:"Hiatus"})})]})}),e("tbody",{children:r&&r.map(t=>{var a,s,o,c;return l("tr",{children:[e("td",{children:t.imdb?e("a",{href:t.imdb,target:"_blank",children:t.name}):t.name}),e("td",{children:t.days?t.days.join(", "):"Unknown"}),e("td",{children:(a=t.page)!=null&&a.link?e("a",{href:(s=t.page)==null?void 0:s.link,target:"_blank",children:(o=t.page)==null?void 0:o.title}):(c=t.page)==null?void 0:c.title}),e("td",{children:t.genre}),e("td",{children:t.season}),l("td",{children:[t.endDate&&v(Date.parse(t.endDate)).format("MMM.D")," ",w[t.status]?`(${w[t.status]})`:""]})]},t.name)})})]})})}function tt({data:n}){const[r,i]=d.exports.useState();return d.exports.useEffect(()=>{n.sort((t,a)=>Date.parse(a.finale)-Date.parse(t.finale)),i(n)},n),e("div",{children:l("table",{children:[e("thead",{children:l("tr",{children:[e("td",{width:"225",children:e("strong",{children:"Past shows:"})}),e("td",{width:"80",children:e("strong",{children:"Status"})}),e("td",{width:"115",children:e("strong",{children:"Station"})}),e("td",{width:"190",children:e("strong",{children:"Genre"})}),e("td",{width:"23",children:e("strong",{children:"S"})}),e("td",{width:"110",children:e("strong",{children:"Finale"})})]})}),e("tbody",{children:r&&r.map(t=>{var a,s,o,c;return l("tr",{children:[e("td",{children:t.imdb?e("a",{href:t.imdb,target:"_blank",children:t.name}):t.name}),e("td",{children:t.status}),e("td",{children:(a=t.page)!=null&&a.link?e("a",{href:(s=t.page)==null?void 0:s.link,target:"_blank",children:(o=t.page)==null?void 0:o.title}):(c=t.page)==null?void 0:c.title}),e("td",{children:t.genre}),e("td",{children:t.nbSeasons}),e("td",{children:t.finale&&v(Date.parse(t.finale)).format("MMM.D YYYY")})]},t.name)})})]})})}function rt(){var s,o;const[n,r]=d.exports.useState(),[i,t]=d.exports.useState(),a=T(c=>c.jsonfiles.updateLogUrl);return d.exports.useEffect(()=>{(async()=>{const c=await H(a);j(c)?r(c):t(j.errors)})()},[]),l("div",{children:[n&&n.length>0&&l("p",{children:[l("strong",{children:["Updated ",(s=n[0])==null?void 0:s.date,": "]}),(o=n[0])==null?void 0:o.text]}),i&&i.length>0&&e("p",{children:JSON.stringify(i)}),l("p",{children:["Start dates for every sci-fi/fantasy shows so none of us miss the first episode of our favorite shows or new shows. I try to keep this list fairly up-to-date so that everyone can see at a glance what shows are currently running and what shows will be starting soon. Title links go to IMDb pages when they exist. If I am missing something, please let me know in the comments.",e("br",{}),"(r) = renewed, (c) = canceled, (f) = final season, (rf) = renewed for final season, (m) = moving to new channel",e("br",{}),"S = Current, Upcoming or Total Season #. (0 = Pilot only, h = season on hiatus)"]})]})}function nt({data:n}){const[r,i]=d.exports.useState();return d.exports.useEffect(()=>{n.sort((t,a)=>t.startDate?a.startDate?new Date(x(t.startDate))<new Date(x(a.startDate))?-1:1:-1:1),i(n)},n),e("div",{children:l("table",{children:[e("thead",{children:l("tr",{children:[e("td",{width:"225",children:e("strong",{children:"Upcoming:"})}),e("td",{width:"80",children:e("strong",{children:"When"})}),e("td",{width:"115",children:e("strong",{children:"Official Page"})}),e("td",{width:"190",children:e("strong",{children:"Genre"})}),e("td",{width:"23",children:e("strong",{children:"S"})}),e("td",{width:"110",children:e("strong",{children:"Hiatus"})})]})}),e("tbody",{children:r&&r.map(t=>{var a,s,o,c,g,f;return l("tr",{children:[e("td",{children:t.imdb?e("a",{href:t.imdb,target:"_blank",children:t.name}):t.name}),l("td",{children:[t.startDate&&x(t.startDate)===t.startDate?v(Date.parse(x(t.startDate))).format("MMM.D"):(((a=t.startDate)==null?void 0:a.charAt(0).toUpperCase())||"")+((s=t.startDate)==null?void 0:s.slice(1)),t.startDateUncertain?"?":""]}),e("td",{children:(o=t.page)!=null&&o.link?e("a",{href:(c=t.page)==null?void 0:c.link,target:"_blank",children:(g=t.page)==null?void 0:g.title}):(f=t.page)==null?void 0:f.title}),e("td",{children:t.genre}),e("td",{children:t.season}),l("td",{children:[t.endDate&&v(Date.parse(t.endDate)).format("MMM.D")," ",w[t.status]?`(${w[t.status]})`:""]})]},t.name)})})]})})}const q={margin:"1em 0"};function at(){const[n,r]=d.exports.useState(),[i,t]=d.exports.useState(),[a,s]=d.exports.useState(),[o,c]=d.exports.useState(),[g,f]=d.exports.useState(),h=T(p=>p.jsonfiles.dataUrls);return d.exports.useEffect(()=>{(async()=>{try{const p=await K(h);R(p)?c(p):f(R.errors)}catch(p){f(p.message)}})()},[]),d.exports.useEffect(()=>{var J;const p=[],m=[],C=[],E=new Date,re=v().add(-2,"month");if(o){for(const u of o){const P=u.seasons.slice(-1)[0].runningPeriods.slice(-1)[0].endDate||"";if((u.status==="canceled"||u.status==="finished")&&P&&new Date(P)<E){C.push({genre:u.genre,name:u.name,page:u.page,imdb:u.imdb,status:u.status,statusUncertain:u.statusUncertain,nbSeasons:u.seasons.length,studio:(J=u.seasons[0])==null?void 0:J.studio,finale:P});continue}let O,M;for(const y of u.seasons)if(y.runningPeriods)for(const D of y.runningPeriods){const F=new Date(x(D.startDate)),N=D.endDate?new Date(D.endDate):void 0;if(F<=E&&(!y.days||y.days[0]!=="Binge"||F>=re.toDate())&&(!N||E<=N)){O={days:y.days,genre:u.genre,name:u.name,page:y.page,imdb:u.imdb,status:u.status,statusUncertain:u.statusUncertain,season:y.num,studio:y.studio,startDate:D.startDate,endDate:D.endDate,startDateUncertain:D.startDateUncertain,endDateUncertain:D.endDateUncertain};break}else F>=E&&(M={genre:u.genre,name:u.name,page:y.page,imdb:u.imdb,status:u.status,statusUncertain:u.statusUncertain,season:y.num,studio:y.studio,startDate:D.startDate,endDate:D.endDate,startDateUncertain:D.startDateUncertain,endDateUncertain:D.endDateUncertain})}O?p.push(O):M&&m.push(M)}r(p),t(m),s(C)}},[o]),e(S,{sx:{marginTop:"4em"},children:l(S,{sx:z,children:[l(S,{component:"header",sx:{background:"#333333 url(https://www.blogblog.com/1kt/transparent/header_gradient_shade.png) repeat-x scroll top left",padding:"1em",color:"white",borderRadius:"1em"},children:[e("div",{children:e("h1",{children:"Fantasy/Sci-Fi TV Show Start Dates 2021-22"})}),e("div",{children:e("p",{children:e("span",{children:"Premiere and Finale dates for all current and upcoming genre tv shows."})})})]}),e("main",{children:l("div",{children:[e(rt,{}),g&&g.length>0&&e(U,{sx:{fontSize:"2em",color:"red"},children:"Errors loading data URL: "+JSON.stringify(g)}),l("div",{children:[n&&n.length>0&&e(b,{children:e(et,{data:n})}),i&&i.length>0&&l(b,{children:[e(A,{sx:q}),e(nt,{data:i})]}),a&&a.length>0&&l(b,{children:[e(A,{sx:q}),e(tt,{data:a})]})]})]})})]})})}function st(){const[n,r]=d.exports.useState(!1);return l(b,{children:[e(S,{sx:{display:"flex",justifyContent:"flex-end"},children:e(W,{onClick:()=>r(!n),color:"primary","aria-label":"Settings",size:"large",sx:{backgroundColor:"white"},children:e(ke,{})})}),n?e(Ze,{}):e(at,{})]})}const it=Le({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:Ae.A400}}});je.render(e(Re.StrictMode,{children:e(Te,{store:$,children:e(Pe,{persistor:Oe($),children:l(Me,{theme:it,children:[e(Fe,{}),e(st,{})]})})})}),document.getElementById("root"));
