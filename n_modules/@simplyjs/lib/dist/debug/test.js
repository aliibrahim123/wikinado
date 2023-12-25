var R=Object.defineProperty;var a=(t,e)=>R(t,"name",{value:e,configurable:!0});var v=a((t,e)=>{if(typeof t!="string")throw new TypeError(`test: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr"),n=a((t,e)=>{if(!Array.isArray(t))throw new TypeError(`test: ${e} of type (${t?.constructor?.name}), expected (Array)`)},"checkarr"),c=a((t,e)=>{if(typeof t!="function")throw new TypeError(`test: ${e} of type (${t?.constructor?.name}), expected (Function)`)},"checkfn"),H=a((t,e)=>{if(typeof t!="number")throw new TypeError(`test: ${e} of type (${t?.constructor?.name}), expected (Number)`);if(!Number.isInteger(t)||t<=0)throw new TypeError(`test: ${e} is (${t}), expected positive integer`)},"checkpInt");var d=class{constructor(e,r,s,o){typeof s=="function"&&(o=s,s={});var{tags:f,setup:h,cleanup:E,skipIf:u,mayReturnError:k}={tags:[],setup:()=>{},cleanup:()=>{},skipIf:()=>{},mayReturnError:!0,...s};v(r,"name"),this.name=r,this.path=e.path+"/"+r,c(o,"fn"),this.fn=o,this.suite=e,c(h,"setup"),this.setupHandler=h,c(E,"cleanup"),this.cleanupHandler=E,c(u,"skipIf"),this.skipIfHandler=u,n(f,"tags"),this.tags=f,this.mayReturnError=k}setup(e){c(e,"setup"),this.setupHandler=e}cleanup(e){c(e,"cleanup"),this.cleanupHandler=e}skipIf(e){c(e,"skepIf"),this.skipIfHandler=e}};a(d,"Test");var l=class{constructor(e,r,s=()=>{},o={}){var{tests:f,suites:h,beforeAll:E,afterAll:u,beforeEach:k,afterEach:p}={tests:[],suites:[],beforeAll:[],beforeEach:[],afterAll:[],afterEach:[],...o};v(r,"name"),this.name=r,this.path=e?(e.path?e.path+"/":"")+r:"",this.parent=e,this.tests=[],this.suites={},n(f,"tests"),f.forEach(i=>this.test(i?.name,i,i?.fn)),n(h,"suites"),h.forEach(i=>this.suite(i?.name,i?.fn,i)),this.beforeAllHooks=[],this.beforeEachHooks=[],this.afterAllHooks=[],this.afterEachHooks=[],n(E,"opts.beforeAll"),E.forEach(i=>this.beforeAll(i)),n(k,"opts.beforeEach"),k.forEach(i=>this.beforeEach(i)),n(u,"opts.afterAll"),u.forEach(i=>this.afterAll(i)),n(p,"opts.afterEach"),p.forEach(i=>this.afterEach(i)),c(s,"callback"),s(this)}test(e,r,s){var o=new d(this,e,r,s);return this.tests.push(o),o}suite(e,r,s){var o=new l(this,e,r,s);return this.suites[e]=o,o}beforeAll(e){return c(e,"hook"),this.beforeAllHooks.push(e),this}beforeEach(e){return c(e,"hook"),this.beforeEachHooks.push(e),this}afterAll(e){return c(e,"hook"),this.afterAllHooks.push(e),this}afterEach(e){return c(e,"hook"),this.afterEachHooks.push(e),this}injectIntoContext(){return{suite:this.suite.bind(this),test:this.test.bind(this),beforeAll:this.beforeAll.bind(this),beforeEach:this.beforeEach.bind(this),afterAll:this.afterAll.bind(this),afterEach:this.afterEach.bind(this)}}};a(l,"Suite");var b=new l(void 0,"root");var x=a(t=>(v(t,"path"),t===""?b:(t=t.split("/"),t.reduce((e,r,s)=>{if(e=e.suites[r],e)return e;throw new ReferenceError(`test: undefined suite at path (${t.slice(0,s+1).join("/")})`)},b))),"getSuite");var C=a(()=>({total:0,started:0,executed:0,passed:0,failed:0,suites:[],tests:[],errors:[],testsPerSuite:new Map,runnedTests:new Map,testPromisesMap:new Map,testInd:0,onPatch:()=>{},onComplete:()=>{}}),"createOperation"),P=a((t,e)=>{t=t.map(x);var r=C();return t.forEach(s=>I(s,r,e)),r.total=r.tests.length,r},"gather"),I=a((t,e,r)=>{var s=0;e.suites.push(t),e.testPromisesMap.set(t,[]),e.runnedTests.set(t,0),t.tests.forEach(o=>{r.every(f=>o.tags.includes(f))&&!o.skipIfHandler()&&(e.tests.push(o),s++)}),e.testsPerSuite.set(t,s);for(let o in t.suites)I(t.suites[o],e,r)},"handleSuite");var M=a((t=[""],e={},r=()=>{})=>{n(t,"suites");var{tags:s,interval:o}={tags:[],interval:20,...e};n(s,"tags"),H(o,"interval"),c(r,"logger");var f=P(t,s);return r(f),y(f,o),f},"run"),y=a((t,e)=>{var{total:r,started:s,executed:o,tests:f,runnedTests:h,testPromisesMap:E,testInd:u}=t;if(r===o)return t.onComplete(t);if(s===r)return setTimeout(()=>y(t,e),e);for(var k=Date.now();Date.now()-k<=e;){let p=f[u],i=p.suite;h.get(i).length===0&&i.beforeAllHooks.forEach(g=>g()),i.beforeEachHooks.forEach(g=>g(p));let w=p.setupHandler();if(w instanceof Promise?w.then(()=>T(t,p)):T(t,p),s++,u++,u===r)break}t.testInd=u,t.started=s,t.onPatch(t),setTimeout(()=>y(t,e),1)},"handleExecute"),T=a((t,e)=>{var r,s,o=e.suite;try{r=e.fn()}catch(h){s=h}if(r instanceof Promise)r.then(h=>$(t,e,h),h=>S(t,e,h));else{if(s)return S(t,e,s);$(t,e,r)}t.testPromisesMap.get(o).push(r);var f=t.testPromisesMap.get(o);f.length===t.testsPerSuite.get(o)&&Promise.all(f.map(h=>h?.catch?.(()=>{}))).then(()=>o.afterAllHooks.forEach(h=>h()))},"handleTest"),$=a((t,e,r)=>{if(r instanceof Error&&e.mayReturnError)return t.failed++,t.errors.push({test:e,error:r}),A(t,e);t.passed++,A(t,e)},"handlePass"),S=a((t,e,r)=>{t.failed++,t.errors.push({test:e,error:r}),A(t,e)},"handleFail"),A=a((t,e)=>{t.executed++,e.cleanupHandler(),e.suite.afterEachHooks.forEach(r=>r(e))},"handleFinish");var m={Suite:l,Test:d,rootSuite:b,getSuite:x,run:M,suite(t,e,r){return this.rootSuite.suite(t,e,r)},test(t,e,r){return this.rootSuite.test(t,e,r)}};for(let t in m)typeof m[t]=="function"&&(m[t]=m[t].bind(m));var fe=m.suite,ce=m.test;var ne=m;export{l as Suite,d as Test,ne as default,x as getSuite,M as run,fe as suite,ce as test};
