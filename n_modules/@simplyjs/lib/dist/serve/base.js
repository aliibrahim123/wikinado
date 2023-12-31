var b=Object.defineProperty;var s=(o,e)=>b(o,"name",{value:e,configurable:!0});var M=(o,e)=>{for(var t in e)b(o,t,{get:e[t],enumerable:!0})};var d=class extends Error{constructor(e="serve: empty"){var t=e.indexOf(":");super(e.slice(t+1).trim()),this.name=e.slice(0,t)}};s(d,"ServerError");var P=s((o,e)=>{if(!Array.isArray(o))throw new d(`serve: ${e} of type (${o?.constructor?.name}), expected (Array)`)},"checkarr"),f=s((o,e)=>{if(typeof o!="function")throw new d(`serve: ${e} of type (${o?.constructor?.name}), expected (Function)`)},"checkfn"),x=s((o,e="str")=>{if(typeof o!="string")throw new d(`serve: ${e} of type (${o?.constructor?.name}), expected (String)`)},"checkstr");var w=s((o,e,t,r,n,u)=>(x(o,"path"),o.split("/").reduce((i,p,l,y)=>{var v=l===y.length-1;if(p[0]==="["){if(i.routes["[PARAM]"]){let a=i.routes["[PARAM]"];if(a.name!==p.slice(1,-1))throw new d(`serve: accessing parametric route (${a.path}) with name (${p})`);return a}return i.routes["[PARAM]"]=new u(t,i,v&&r,p,n)}return i.routes[p]?i.routes[p]:i.routes[p]=new u(t,i,v&&r,p,n)},e)),"addRoute");var T=["connect","delete","get","head","options","patch","post","put","trace"],h=class{constructor(e,t,r,n="",u={}){if(x(n,"name"),this.name=n.startsWith("[")?n.slice(1,-1):n,this.path=t?t.path+"/"+n:"",this.router=e,this.parent=t,this.handler={},!r)this.handler=null;else if(typeof r=="function")this.handler=r;else if(typeof r=="object")for(let p in r)this.method(p,r[p]);else throw new d(`serve: handler at path (${this.path}) of type (${r?.constructor?.name}), expected (Function) or (Object)`);var{portal:i}={portal:!1,...u};this.portal=i,this.routes={}}method(e,t){if(x(e,"method"),f(t,"handler"),this.handler===null)this.handler={};else if(typeof this.handler=="function")throw new d(`serve: adding methed (${e}) for (${this.path}) in presence of (all) handler`);if(T.includes(e))this.handler[e]=t;else throw new d(`serve: unsupported http method (${e}) at path (${this.path})`);return this}route(e,t,r={}){return w(e,this,this.router,t,r,h)}all(e,t){if(typeof e=="function"){if(f(e,"handler"),this.handler)throw new d(`can not add handler in presence of other at path (${this.path})`);return this.handler=e,this}return this.route(e,t)}connect(e,t){return typeof e=="function"?this.method("connect",e):this.route(e).method("connect",t)}delete(e,t){return typeof e=="function"?this.method("delete",e):this.route(e).method("delete",t)}get(e,t){return typeof e=="function"?this.method("get",e):this.route(e).method("get",t)}head(e,t){return typeof e=="function"?this.method("head",e):this.route(e).method("head",t)}options(e,t){return typeof e=="function"?this.method("options",e):this.route(e).method("options",t)}patch(e,t){return typeof e=="function"?this.method("patch",e):this.route(e).method("patch",t)}post(e,t){return typeof e=="function"?this.method("post",e):this.route(e).method("post",t)}put(e,t){return typeof e=="function"?this.method("put",e):this.route(e).method("put",t)}trace(e,t){return typeof e=="function"?this.method("trace",e):this.route(e).method("trace",t)}};s(h,"Route");var N={};M(N,{errorSymbol:()=>c,no_handler:()=>A,request_close:()=>C,request_error:()=>E,undefined_method:()=>S,undefined_route:()=>g});var c=Symbol("error"),g=Symbol("undefined_route"),A=Symbol("no_handler"),S=Symbol("undefined_method"),C=Symbol("request_close"),E=Symbol("request_error");var k={};M(k,{Accepted:()=>H,Already_Reported:()=>K,Bad_Gateway:()=>Ce,Bad_Request:()=>ie,Conflict:()=>he,Continue:()=>I,Created:()=>D,Early_Hints:()=>O,Expectation_Failed:()=>ye,Failed_Dependency:()=>Se,Forbidden:()=>se,Found:()=>X,Gateway_Timeout:()=>Ie,Gone:()=>le,HTTP_Version_Not_Supported:()=>Le,IM_Used:()=>W,Im_a_teapot:()=>we,Insufficient_Storage:()=>Oe,Internal_Server_Error:()=>Fe,Length_Required:()=>fe,Locked:()=>Ae,Loop_Detected:()=>qe,Method_Not_Allowed:()=>$,Misdirected_Request:()=>Re,Moved_Permanently:()=>Q,Multi_Status:()=>z,Multiple_Choices:()=>J,Network_Authentication_Required:()=>He,No_Content:()=>G,Non_Authoritative_Information:()=>j,Not_Acceptable:()=>pe,Not_Extended:()=>De,Not_Found:()=>R,Not_Implemented:()=>Te,Not_Modified:()=>Z,OK:()=>q,Partial_Content:()=>V,Payload_Too_Large:()=>ve,Payment_Required:()=>ae,Permanent_Redirect:()=>oe,Precondition_Failed:()=>ce,Precondition_Required:()=>Me,Processing:()=>U,Proxy_Authentication_Required:()=>de,Range_Not_Satisfiable:()=>_e,Request_Header_Fields_Too_Large:()=>Ne,Request_Timeout:()=>ue,Reset_Content:()=>B,See_Other:()=>Y,Service_Unavailable:()=>Ee,Switching_Protocols:()=>L,Temporary_Redirect:()=>re,Too_Early:()=>$e,Too_Many_Requests:()=>Pe,URI_Too_Long:()=>me,Unauthorized:()=>ne,Unavailable_For_Legal_Reasons:()=>ke,Unprocessable_Content:()=>ge,Unsupported_Media_Type:()=>xe,Upgrade_Required:()=>be,Use_Proxy:()=>ee,Variant_Also_Negotiates:()=>Ue,unused:()=>te});var I=100,L=101,U=102,O=103,q=200,D=201,H=202,j=203,G=204,B=205,V=206,z=207,K=208,W=226,J=300,Q=301,X=302,Y=303,Z=304,ee=305,te=306,re=307,oe=308,ie=400,ne=401,ae=402,se=403,R=404,$=405,pe=406,de=407,ue=408,he=409,le=410,fe=411,ce=412,ve=413,me=414,xe=415,_e=416,ye=417,we=418,Re=421,ge=422,Ae=423,Se=424,$e=425,be=426,Me=428,Pe=429,Ne=431,ke=451,Fe=500,Te=501,Ce=502,Ee=503,Ie=504,Le=505,Ue=506,Oe=507,qe=508,De=510,He=511;var F=s(async(o,e,t,r)=>{var n=r.params={};r.router=o;var u=e.url.split("/"),i=o.root;for(let a=1;a<u.length;a++){let m=u[a];if(e.url==="/")break;if(i.routes[m])i=i.routes[m];else if(i.routes["[PARAM]"])i=i.routes["[PARAM]"],n[i.name]=m;else if(i.portal){r.path=u.slice(a);break}else return o.error(g,R,e,t)}i.portal&&!r.path&&(r.path=[]);var p=e.method.toLowerCase(),l=i.handler;if(!l)return o.error(A,R,e,t,i);if(typeof l=="object")if(l[p])l=l[p];else return o.error(S,$,e,t,p);var y=o.middlewares,v=o.postMiddlewares;for(let a=0;a<y.length;a++)if(await y[a](e,t,r)===c)return;await l(e,t,r);for(let a=0;a<v.length;a++)if(await v[a](e,t,r)===c)return;o.sendOnDone&&t.end()},"handleRoute");var _=class{constructor(e=[],t={}){this.middlewares=[],this.postMiddlewares=[],P(e,"middlewares"),e.forEach((n,u)=>{f(n,`middleware at index (${u})`),n.isPost?this.postMiddlewares.push(n):this.middlewares.push(n)});var{sendOnDone:r}={sendOnDone:!0,...t};this.sendOnDone=r,this.root=new h,this.listener=this.handle.bind(this),this.errors={}}handle(e,t,r={}){F(this,e,t,r)}use(...e){e.forEach((t,r)=>f(t,`middleware at index (${r})`)),this.middlewares.push(...e)}error(e,t,r,n,...u){return this.errors[e]?this.errors[e](t,r,n,...u):(n.writeHead(t),n.end()),c}route(e,t,r={}){return w(e,this.root,this,t,r,h)}all(e,t){return this.route(e,t)}connect(e,t){return this.route(e).method("connect",t)}delete(e,t){return this.route(e).method("delete",t)}get(e,t){return this.route(e).method("get",t)}head(e,t){return this.route(e).method("head",t)}options(e,t){return this.route(e).method("options",t)}patch(e,t){return this.route(e).method("patch",t)}post(e,t){return this.route(e).method("post",t)}put(e,t){return this.route(e).method("put",t)}trace(e,t){return this.route(e).method("trace",t)}};s(_,"Router");var je=s(o=>new _(o),"make"),_t=je;export{H as Accepted,K as Already_Reported,Ce as Bad_Gateway,ie as Bad_Request,he as Conflict,I as Continue,D as Created,O as Early_Hints,ye as Expectation_Failed,Se as Failed_Dependency,se as Forbidden,X as Found,Ie as Gateway_Timeout,le as Gone,Le as HTTP_Version_Not_Supported,W as IM_Used,we as Im_a_teapot,Oe as Insufficient_Storage,Fe as Internal_Server_Error,fe as Length_Required,Ae as Locked,qe as Loop_Detected,$ as Method_Not_Allowed,Re as Misdirected_Request,Q as Moved_Permanently,z as Multi_Status,J as Multiple_Choices,He as Network_Authentication_Required,G as No_Content,j as Non_Authoritative_Information,pe as Not_Acceptable,De as Not_Extended,R as Not_Found,Te as Not_Implemented,Z as Not_Modified,q as OK,V as Partial_Content,ve as Payload_Too_Large,ae as Payment_Required,oe as Permanent_Redirect,ce as Precondition_Failed,Me as Precondition_Required,U as Processing,de as Proxy_Authentication_Required,_e as Range_Not_Satisfiable,Ne as Request_Header_Fields_Too_Large,ue as Request_Timeout,B as Reset_Content,h as Route,_ as Router,Y as See_Other,d as ServerError,Ee as Service_Unavailable,L as Switching_Protocols,re as Temporary_Redirect,$e as Too_Early,Pe as Too_Many_Requests,me as URI_Too_Long,ne as Unauthorized,ke as Unavailable_For_Legal_Reasons,ge as Unprocessable_Content,xe as Unsupported_Media_Type,be as Upgrade_Required,ee as Use_Proxy,Ue as Variant_Also_Negotiates,_t as default,N as errorCodes,c as errorSymbol,k as httpStatus,je as make,A as no_handler,C as request_close,E as request_error,S as undefined_method,g as undefined_route,te as unused};
