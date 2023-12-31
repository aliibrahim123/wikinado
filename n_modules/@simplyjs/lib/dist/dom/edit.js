var W=Object.defineProperty;var c=(e,t)=>W(e,"name",{value:t,configurable:!0});var d=c((e,t)=>{if(!(e instanceof Element))throw new TypeError(`edit: ${t} of type (${e?.constructor?.name}), expected (Element)`)},"checkel"),v=c((e,t)=>{if(!(e instanceof Node))throw new TypeError(`edit: ${t} of type (${e?.constructor?.name}), expected (Node)`)},"checknode"),l=c((e,t)=>{if(typeof e!="string")throw new TypeError(`edit: ${t} of type (${e?.constructor?.name}), expected (String)`)},"checkstr"),E=c((e,t)=>{if(typeof e!="function")throw new TypeError(`edit: ${t} of type (${e?.constructor?.name}), expected (Function)`)},"checkfn"),C=c((e,t)=>{if(!Array.isArray(e))throw new TypeError(`edit: ${t} of type (${e?.constructor?.name}), expected (Array)`)},"checkarr");var p=c(e=>{d(e,"element"),e.after(...e.childNodes),e.remove()},"unwrap"),S=c(()=>{var e=getSelection();if(e.rangeCount){var t=e.getRangeAt(0),r=t.startContainer;for(r.nodeType!==r.ELEMENT_NODE&&(r=r.parentElement);!r.hasAttribute("contenteditable");){if(r===document.body)return;r=r.parentElement}return r}},"getContainer"),T=c((e,t,r)=>{d(e,"element"),t&&v(t,"offset element"),r&&d(r,"offset parent");var s=e.cloneNode(!1),i=Array.from(e.childNodes),n=!1;for(let o=0;o<i.length;o++){let a=i[o];(n||a===t)&&(n=!0,s.append(a))}return r?r.prepend(s):e.after(s),s},"splitEl"),f=c((e,t)=>{l(e,"tag"),t&&E(t,"function");var r=getSelection();if(r.rangeCount){var s=r.getRangeAt(0),i=S();if(i)for(var n=s.commonAncestorContainer;n!==i;){if(n.tagName===e.toUpperCase()&&(!t||t(n)))return n;n=n.parentElement}}},"getWrapped");var y=c((e,t,r=!0,s,i={})=>{d(e,"element"),l(t,"tag"),s&&E(s,"cleaner"),t=t.toLowerCase();var n=Array.from(e.getElementsByTagName(t));r&&e.tagName===t.toUpperCase()&&n.push(e),n=n.filter(o=>Array.from(o.classList).every(a=>a in g?g[a](o,i[a]):!0)),s&&(n=n.filter(s)),n.forEach(o=>p(o))},"clean"),k=c((e,t=[],r=[],s=[],i=new Set)=>{if(v(e,"node"),C(t,"doNotCleanTags"),e.nodeType===e.ELEMENT_NODE){var n=Array.from(e.childNodes),o=e.tagName.toLowerCase();if(s.includes(o))return;t.includes(o)||(e.childNodes.length===0?e.remove():r.includes(o)||(e.tagName===e.previousSibling?.tagName?(e.previousSibling.append(...n),e.remove()):i.has(o)&&!Array.from(e.classList).some(a=>a in g)&&(e.after(...n),e.remove()))),n.forEach(a=>k(a,t,r,s,new Set([...i,o])))}else e.nodeType===3&&(e.textContent===""?e.remove():e.previousSibling?.nodeType===e.TEXT_NODE&&(e.previousSibling.textContent+=e.textContent,e.remove()))},"cleanDom"),g={styled(e,t){if(!t)return!1;var[r,s]=t;return e.classList.contains(s+"-"+r)&&(e.classList.remove(s+"-"+r),e.style[r]=""),[].reduce.call(e.classList,(i,n)=>n.startsWith(s)?i+1:i,0)===1}};var R={unwrap:p,getContainer:S,splitEl:T,getWrapped:f,clean:y,cleanDom:k,cleanMap:g,isWrappedWith(e,t){return!!f(e,t)},surround(e,t=!0,r,s){d(e,"wrapper");var i=getSelection();if(!i.rangeCount)return{success:!1};var n=i.getRangeAt(0);return e.append(...n.cloneContents().childNodes),n.deleteContents(),t&&y(e,e.tagName,!1,r,s),n.insertNode(e),{success:!0,type:"surround",node:e}},undo(e,t,r){var s=getSelection();if(!s.rangeCount)return{success:!1};var i=s.getRangeAt(0),n=i.cloneContents();i.deleteContents();var o=document.createElement("span");o.append(n),y(o,e,!1,t,r),i.insertNode(o);var a=f(e,t);if(!a){var N=o.childNodes[0],x=o.childNodes[o.childNodes.length-1];return p(o),i.setStartBefore(N),i.setEndAfter(x),{success:!0,type:"undo"}}for(var h=o,m=[h];h!==a;)h=h.parentElement,m.unshift(h);var w;m.forEach((u,L)=>{u!==a&&(w=T(u.parentElement,u.nextSibling,w))});var b=m.reduce((u,L,$)=>{if($===m.length-1)return u;var A=L.cloneNode(!1);return u===a?u.after(A):u.append(A),A});b===a?a.after(o):b.append(o);var N=o.childNodes[0],x=o.childNodes[o.childNodes.length-1];return p(o),i.setStartBefore(N),i.setEndAfter(x),{success:!0,type:"undo"}},replace(e="",t="text",r=!1){l(t,"replace type");var s=getSelection();if(!s.rangeCount)return{success:!1};var i=s.getRangeAt(0);if(i.deleteContents(),t==="node")i.insertNode(e);else{l(e,"topaste");let n=document.createElement("span");if(t==="text")n.innerText=e;else if(t==="html")n.innerHTML=e;else throw new TypeError("edit: undefined replace type ("+t+")");i.insertNode(n),r&&r(n)}return{success:!0,type:"replace"}},applyCss(e,t,r="span",s="styled",i=!0,n){l(e,"property"),l(t,"value");var o=document.createElement(r);return o.classList.add(s),o.classList.add(s+"-"+e),o.style[e]=t,this.surround(o,i,n,{styled:[e,s]})},copy(){var e=getSelection();if(!e.rangeCount)return"";var t=e.getRangeAt(0),r=document.createElement("div");return r.append(t.cloneContents()),r.innerHTML},cut(){var e=getSelection();if(!e.rangeCount)return"";var t=e.getRangeAt(0),r=document.createElement("div");return r.append(t.extractContents()),r.innerHTML},delete(){var e=getSelection();if(!e.rangeCount)return{success:!1};var t=e.getRangeAt(0);return t.deleteContents(),{success:!0,type:"delete"}},insert(e,t="text",r=!1){l(t,"insert type");var s=getSelection();if(!s.rangeCount)return{success:!1};var i=s.getRangeAt(0);if(t==="node")i.insertNode(e);else{l(e,"toinsert");var n=document.createElement("span");if(t==="text")n.innerText=e;else if(t==="html")n.innerHTML=e;else throw new Error("edit: undefined insert type ("+t+")");i.insertNode(n),r&&r(n)}return{success:!0,type:"insert"}},toggle(e,t=0,r,s,i){var n;if(e?.nodeType?(n=e,e=e.tagName.toLowerCase()):n=document.createElement(e),t===0)return this.isWrappedWith(e)?this.undo(e,s,i):this.surround(n,r,s,i);if(t===1)return this.surround(n,r,s,i);if(t===2)return this.undo(e,s,i);throw new Error("edit: toggle type is ("+t+"), expected 0, 1, or 2")},removeFormat(e=["b","i","u","s","sup","sub","span","div"]){C(e,"tagNames");var t=getSelection();if(!t.rangeCount)return{success:!1};var r=t.getRangeAt(0),s=t.toString();return r.deleteContents(),r.insertNode(new Text(s)),e.forEach(i=>this.undo(i)),{success:!0,type:"remove-format"}},getSelectedElement(){var e=getSelection();if(e.rangeCount){var t=e.getRangeAt(0).commonAncestorContainer;return t.nodeType===3?t.parentNode:t}},selectParagraph(){var e=getSelection();if(!e.rangeCount)return{success:!1};var t=e.getRangeAt(0),r=f("p");return r?(t.selectNode(r),{success:!0,type:"select"}):this.selectAll()},selectAll(){var e=getSelection();if(!e.rangeCount)return{success:!1};var t=e.getRangeAt(0),r=this.getContainer();return t.setStartBefore(r.firstChild),t.setEndAfter(r.lastChild),{success:!0,type:"select"}},bold(e){return this.toggle("b",e)},underline(e){return this.toggle("u",e)},italic(e){return this.toggle("i",e)},strikeThrough(e){return this.toggle("s",e)},subscript(e){return this.toggle("sub",e)},superscript(e){return this.toggle("sup",e)},backColor(e){return this.applyCss("background-color",e||"")},fontColor(e){return this.applyCss("color",e||"")},fontName(e){return this.applyCss("font-family",e||"")},fontSize(e){return this.applyCss("font-size",e||"")},link(e,t=!1){l(e,"url");var r=document.createElement("a");return r.href=e,t&&this.isWrappedWith("a")?this.undo("a"):this.surround(r)},img(e){l(e,"url");var t=document.createElement("img");return t.src=e,this.insert(t,"node")},heading(e=1,t){return this.toggle("h"+e,t)},orderedList(){var e=this.surround(document.createElement("li")),t=document.createElement("ol");return e.node.before(t),t.append(e.node),e},unorderedList(){var e=this.surround(document.createElement("li")),t=document.createElement("ul");return e.node.before(t),t.append(e.node),e},block(e){return this.toggle("div",e)},inline(e){return this.toggle("span",e)},paragraph(){var e=f("p");return e?(p(e),{success:!0,type:"undo"}):this.surround(document.createElement("p"))},quote(e){return this.toggle("q",e)},indent(e){return this.selectParagraph(),this.applyCss("text-indent",e||"","div")},align(e){return this.selectParagraph(),this.applyCss("text-align",e||"","div")},direction(e){return this.applyCss("direction",e||"","div")},hr(){return this.insert(document.createElement("hr"),"node")}};globalThis.$edit=R;var J=R;export{J as default};
