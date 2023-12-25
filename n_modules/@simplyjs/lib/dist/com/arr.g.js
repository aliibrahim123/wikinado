var W=Object.defineProperty;var n=(r,e)=>W(r,"name",{value:e,configurable:!0});var p=n((r,e="array")=>{if(!Array.isArray(r))throw new TypeError(`arr: ${e} of type (${r?.constructor?.name}), expected (Array)`);return!0},"checkarr"),c=n((r,e)=>{if(typeof r!="function")throw new TypeError(`arr: ${e} of type (${r?.constructor?.name}), expected (Function)`)},"checkfn"),a=n((r,e,t=!1)=>{if(typeof r!="number")throw new TypeError(`arr: ${e} of type (${r?.constructor?.name}), expected (Number)`);if(!Number.isInteger(r)||r<=(t?-1:0))throw new TypeError(`arr: ${e} is (${r}), expected positive integer`)},"checkpInt");var d=n(r=>p(r)&&r[0],"head"),y=n(r=>p(r)&&r[r.length-1],"last"),k=n(r=>p&&r.slice(0,r.length-1),"initial"),g=n(r=>p&&r.slice(1),"tail");var w=n((r,e=1)=>(a(e,"count"),p(r),r.slice(e)),"drop"),I=n((r,e=1)=>(a(e,"count"),p(r),r.slice(0,Math.max(0,r.length-e))),"dropRight"),A=n((r,e,t=!0)=>{p(r),c(e,"predicate");var o=r.findIndex(e);return r.slice(o+(t?0:1))},"dropUntil"),E=n((r,e,t=!0)=>{p(r),c(e,"predicate");var o=r.findLastIndex(e);return r.slice(0,o+(t?1:0))},"dropRightUntil");var $=n((r,e=1)=>(p(r),a(e,"count"),r.slice(0,e)),"take"),R=n((r,e=1)=>(p(r),a(e,"count"),r.slice(Math.max(0,r.length-e),r.length)),"takeRight"),T=n((r,e,t=!0)=>{p(r),c(e,"predicate");var o=r.findIndex(e);return r.slice(0,o+(t?1:0))},"takeUntil"),U=n((r,e,t=!0)=>{p(r),c(e,"predicate");var o=r.findLastIndex(e);return r.slice(o+(t?0:1))},"takeRightUntil");var m=n((r,e=1)=>{a(e,"size"),p(r);var t=[];for(let o=0;o<r.length;o+=e)t.push(r.slice(o,o+e));return t},"chunk"),M=n(r=>m(r,2),"pairs");var u=n((r,e,t=0)=>{a(e,"nth"),a(t,"from"),p(r);var o=[];for(let i=t;i<r.length;i+=e)o.push(r[i]);return o},"everyNth"),N=n(r=>u(r,2,1),"odd"),B=n(r=>u(r,2,0),"even");var L=n(r=>(p(r),r.filter(e=>e)),"compact");var D=n(r=>(p(r),Array.from(new Set(r))),"uniq");var S=n((r,e,...t)=>(p(r),a(e,"index",!0),r.splice(e,0,...t),r),"insert"),z=n((r,e,...t)=>{p(r),a(e,"index",!0);var o=Array.from(r);return o.splice(e,0,...t),o},"insertNew");var q=n((r,e,t=1)=>{var o=[];if(r<e)for(let i=r;i<e;i+=t)o.push(i);if(r>e)for(let i=r;i>e;i+=t)o.push(i);return o},"fromRange"),j=n((r,e)=>(p(r),p(e,"indices"),e.map(t=>r[t])),"fromIndexes"),F=n((r,e)=>{a(r,"length"),e&&c(e,"mapper");var t=[];if(e)for(let o=0;o<r;o++)t.push(e(o));else for(let o=0;o<r;o++)t.push(void 0);return t},"ofLength");var O=n(r=>{p(r);var e=[];return l(r,e,-1),e},"flatDeep"),P=n((r,e)=>{a(e,"depth"),p(r);var t=[];return l(r,t,e),t},"flatDepth"),l=n((r,e,t)=>{if(t===0)return e.push(r);r.forEach(o=>Array.isArray(o)?l(o,e,t-1):e.push(o))},"handle");var C=n((r,e)=>{p(r),a(e,"size");var t=[];for(let o=0;o<e;o++)t.push(r[Math.floor(Math.random()*r.length)]);return t},"sample"),G=n(r=>{p(r);var e=[...r];for(let t=0;t<r.length;t++){let o=Math.floor(Math.random()*r.length),i=e[t];e[t]=e[o],e[o]=i}return e},"shuffle");var H=n((r,e)=>{p(r),c(e,"grouper");var t={};return r.forEach((o,i,h)=>t[e(o,i,h)]=o),t},"keyBy"),J=n((r,e)=>{p(r),c(e,"grouper");var t={};return r.forEach((o,i,h)=>{var f=e(o,i,h);t[f]?t[f]++:t[f]=1}),t},"countBy"),K=n((r,e)=>{p(r),c(e,"grouper");var t={};return r.forEach((o,i,h)=>{var f=e(o,i,h);t[f]?t[f].push(o):t[f]=[o]}),t},"groupBy");var X=n((r,e)=>{if(!(Array.isArray(r)||e))throw new TypeError("arr: values of type ("+r?.constructor?.name+"), epected (Array) or (Set)")},"check"),Q=n((r,e)=>{p(r);var t=e instanceof Set;return X(e,t),t?r.filter(o=>!e.has(o)):r.filter(o=>!e.includes(o))},"without");var Y=n(r=>{if(!Array.isArray(r))throw new TypeError("arr: arrays of type ("+r?.constructor?.name+"), expected (Array)");r.forEach((e,t)=>{if(!Array.isArray(e))throw new TypeError("arr: array at index ("+t+") of type ("+e?.constructor?.name+"), expected (Array)")})},"check"),v=n(r=>{Y(r);var e=Math.max(...r.map(o=>o.length)),t=[];for(let o=0;o<e;o++)t.push(r.map(i=>i[o]));return t},"unzip"),V=n((...r)=>v(r),"zip");var Z=["fromRange","fromIndexes","ofLength"],_=n(()=>{var r=n(e=>function(...t){return e(this,...t)},"handle");for(let e in s)Z.includes(e)||Object.defineProperty(Array.prototype,"$"+e,{value:r(s[e]),enumerable:!1})},"extendNative"),s={head:d,last:y,tail:g,initial:k,drop:w,dropRight:I,dropUntil:A,dropRightUntil:E,take:$,takeRight:R,takeUntil:T,takeRightUntil:U,chunk:m,pairs:M,compact:L,insert:S,insertNew:z,fromRange:q,fromIndexes:j,ofLength:F,everyNth:u,odd:N,even:B,uniq:D,flatDeep:O,flatDepth:P,sample:C,shuffle:G,keyBy:H,countBy:J,groupBy:K,without:Q,zip:V,unzip:v,extendNative:_};var x=s;globalThis.$arr=x;var ce=x;export{m as chunk,L as compact,J as countBy,ce as default,w as drop,I as dropRight,E as dropRightUntil,A as dropUntil,B as even,u as everyNth,_ as extendNative,O as flatDeep,P as flatDepth,j as fromIndexes,q as fromRange,K as groupBy,d as head,k as initial,S as insert,z as insertNew,H as keyBy,y as last,N as odd,F as ofLength,M as pairs,C as sample,G as shuffle,g as tail,$ as take,R as takeRight,U as takeRightUntil,T as takeUntil,D as uniq,v as unzip,Q as without,V as zip};