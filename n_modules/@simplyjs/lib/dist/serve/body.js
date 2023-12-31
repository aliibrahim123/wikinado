var w=Object.defineProperty;var t=(r,e)=>w(r,"name",{value:e,configurable:!0});var A=(r,e)=>{for(var o in e)w(r,o,{get:e[o],enumerable:!0})};var a=class extends Error{constructor(e="serve: empty"){var o=e.indexOf(":");super(e.slice(o+1).trim()),this.name=e.slice(0,o)}};t(a,"ServerError");var S=t((r,e,o=!1)=>{if(typeof r!="number")throw new a(`serve: ${e} of type (${r?.constructor?.name}), expected (Number)`);if(!Number.isInteger(r)||r<(o?0:1))throw new a(`serve: ${e} is (${r}), expected positive integer`)},"checkpInt");var E=Symbol("error"),k=Symbol("undefined_route"),q=Symbol("no_handler"),H=Symbol("undefined_method"),N=Symbol("request_close"),P=Symbol("request_error");var u={};A(u,{above_limit:()=>v});var v=Symbol("above_limit");var l=400;var m=413;var T=t((r={})=>(r={limit:1028*1028*1028,compression:!0,...r},S(r.limit,"limit",!1),(e,o,x)=>I(r,e,o,x)),"baseBody"),I=t((r,e,o,x)=>new Promise(p=>{var{compression:C,limit:n}=r,i=x.router,_=0,f=e.method.toLowerCase();if(f==="get"||f==="head")return p();var y=Number.parseInt(e.headers["content-length"],10);y>n&&p(i.error(v,m,e,o,n,y));var d=[];e.on("data",h),e.on("end",b),e.on("error",R),e.on("close",g);var h=t(c=>{_+=c.length,d.push(c),_>n&&p(i.error(v,m,e,o,n,_))},"onData"),b=t(c=>{s(),d=Buffer.concat(d)},"onEnd"),R=t(()=>{s(),p(i.error(P,l,e,o,error))},"onError"),g=t(()=>{s(),p(i.error(N,l,e,o))},"onClose"),s=t(()=>{e.off("data",h),e.off("end",b),e.off("error",R),e.off("close",g)},"cleanUp")}),"baseBodyHandler");var W={baseBody:T,errors:u};export{v as above_limit,T as baseBody,W as default};
