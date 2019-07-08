!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=12)}([function(t,e,n){"use strict";var r,o,i,a=n(5),s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){i=!1}function u(t){if(t){if(t!==r){if(t.length!==s.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,n){return e!==n.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. These characters were not unique: "+e.join(", "));r=t,c()}}else r!==s&&(r=s,c())}function l(){return i||(i=function(){r||u(s);for(var t,e=r.split(""),n=[],o=a.nextValue();e.length>0;)o=a.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}t.exports={get:function(){return r||s},characters:function(t){return u(t),r},seed:function(t){a.seed(t),o!==t&&(c(),o=t)},lookup:function(t){return l()[t]},shuffled:l}},function(t){t.exports=[{id:"XWaQXcbk0",title:"JavaScript essentials",body:"Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",priority:2},{id:"pkXzyRp1P",title:"Refresh HTML and CSS",body:"Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",priority:1},{id:"QMom9q4Ku",title:"Get comfy with Frontend frameworks",body:"First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",priority:1},{id:"k2k0UrjZG",title:"Winter clothes",body:"Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",priority:0}]},function(t,e,n){},function(t,e,n){"use strict";t.exports=n(4)},function(t,e,n){"use strict";var r=n(0),o=n(6),i=n(10),a=n(11)||0;function s(){return o(a)}t.exports=s,t.exports.generate=s,t.exports.seed=function(e){return r.seed(e),t.exports},t.exports.worker=function(e){return a=e,t.exports},t.exports.characters=function(t){return void 0!==t&&r.characters(t),r.shuffled()},t.exports.isValid=i},function(t,e,n){"use strict";var r=1;t.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(t){r=t}}},function(t,e,n){"use strict";var r,o,i=n(7),a=(n(0),1459707606518),s=6;t.exports=function(t){var e="",n=Math.floor(.001*(Date.now()-a));return n===o?r++:(r=0,o=n),e+=i(s),e+=i(t),r>0&&(e+=i(r)),e+=i(n)}},function(t,e,n){"use strict";var r=n(0),o=n(8),i=n(9);t.exports=function(t){for(var e,n=0,a="";!e;)a+=i(o,r.get(),1),e=t<Math.pow(16,n+1),n++;return a}},function(t,e,n){"use strict";var r,o="object"==typeof window&&(window.crypto||window.msCrypto);r=o&&o.getRandomValues?function(t){return o.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},t.exports=r},function(t,e){t.exports=function(t,e,n){var r=(2<<Math.log(e.length-1)/Math.LN2)-1,o=Math.ceil(1.6*r*n/e.length);n=+n;for(var i="";;)for(var a=t(o),s=0;s<o;s++){var c=a[s]&r;if(e[c]&&(i+=e[c]).length===n)return i}}},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){return!(!t||"string"!=typeof t||t.length<6||new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t))}},function(t,e,n){"use strict";t.exports=0},function(t,e,n){"use strict";n.r(e);n(2);var r="edit",o="delete",i="expand_more",a="expand_less",s="delete-note",c="edit-note",u="increase-priority",l="decrease-priority",d=n(3);function f(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var p={noteList:document.querySelector(".note-list"),form:document.querySelector(".note-editor"),searchForm:document.querySelector(".search-form"),formTitleInput:document.querySelector('input[name="note_title"]'),formBodyInput:document.querySelector('textarea[name="note_body"]')},v=function(){var t=document.createElement("button");return t.classList.add("action"),t},y=function(t){var e=document.createElement("li");e.classList.add("note-list__item"),e.dataset.id=t.id;var n=document.createElement("div");n.classList.add("note");var d=function(t){var e=document.createElement("div");e.classList.add("note__content");var n=document.createElement("h2");n.classList.add("note__title"),n.textContent=t.title;var r=document.createElement("p");return r.classList.add("note__body"),r.textContent=t.body,e.appendChild(n),e.appendChild(r),e}(t),f=function(t){var e=document.createElement("footer");e.classList.add("note__footer");var n=document.createElement("section");n.classList.add("note__section");var d=v();d.dataset.action=l;var f=document.createElement("i");f.classList.add("material-icons","action__icon"),f.textContent=i;var p=v();p.dataset.action=u;var y=document.createElement("i");y.classList.add("material-icons","action__icon"),y.textContent=a;var m=document.createElement("span");m.classList.add("note__priority"),m.textContent="Priority: Low";var h=document.createElement("section");h.classList.add("note__section");var g=v();g.dataset.action=c;var b=document.createElement("i");b.classList.add("material-icons","action__icon"),b.textContent=r;var w=v();w.dataset.action=s;var x=document.createElement("i");return x.classList.add("material-icons","action__icon"),x.textContent=o,d.appendChild(f),p.appendChild(y),n.append(d,p,m),g.appendChild(b),w.appendChild(x),h.append(g,w),e.append(n,h),e}();return n.append(d,f),e.appendChild(n),e},m=function(t,e){var n=e.map(function(t){return y(t)});t.innerHTML="",t.append.apply(t,f(n))},h=n(1);function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var b,w,x,L=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._notes=e}var e,n,r;return e=t,(n=[{key:"findNoteById",value:function(t){var e=!0,n=!1,r=void 0;try{for(var o,i=this._notes[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var a=o.value;if(a.id===t)return a}}catch(t){n=!0,r=t}finally{try{e||null==i.return||i.return()}finally{if(n)throw r}}}},{key:"saveNote",value:function(t){return this._notes.push(t),t}},{key:"deleteNote",value:function(t){var e=this.findNoteById(t);e.id===t&&this._notes.splice(this._notes.indexOf(e),1)}},{key:"updateNoteContent",value:function(t,e){var n=this.findNoteById(t);if(n.id===t)return Object.assign(n,e),n}},{key:"updateNotePriority",value:function(t,e){var n=this.findNoteById(t);if(n.id===t)return n.priority=e,n}},{key:"filterNotesByQuery",value:function(t){t=t.toLowerCase();var e=[],n=!0,r=!1,o=void 0;try{for(var i,a=this._notes[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var s=i.value;(s.title.toLowerCase().includes(t)||s.body.toLowerCase().includes(t))&&e.push(s)}}catch(t){r=!0,o=t}finally{try{n||null==a.return||a.return()}finally{if(r)throw o}}return e}},{key:"filterNotesByPriority",value:function(t){var e=[],n=!0,r=!1,o=void 0;try{for(var i,a=this._notes[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var s=i.value;s.priority===t&&e.push(s)}}catch(t){r=!0,o=t}finally{try{n||null==a.return||a.return()}finally{if(r)throw o}}return e}},{key:"notes",get:function(){return this._notes}}])&&g(e.prototype,n),r&&g(e,r),t}();x={LOW:0,NORMAL:1,HIGH:2},(w="Priority")in(b=L)?Object.defineProperty(b,w,{value:x,enumerable:!0,configurable:!0,writable:!0}):b[w]=x;var C=new L(h);m(p.noteList,C.notes),p.form.addEventListener("submit",function(t){t.preventDefault();var e,n,r={};if(""===p.formTitleInput.value||""===p.formBodyInput.value)return alert("Необходимо заполнить все поля!");r.id=d.generate(),r.title=p.formTitleInput.value,r.body=p.formBodyInput.value,r.priority=L.Priority.LOW,C.saveNote(r),p.form.reset(),e=p.noteList,n=y(r),e.append(n)}),p.noteList.addEventListener("click",function(t){var e,n;"I"===t.target.nodeName&&"delete-note"===t.target.closest("button").dataset.action&&(e=t.target,n=e.closest("li"),C.deleteNote(n.dataset.id),n.remove(),console.log(C.notes))}),p.searchForm.addEventListener("input",function(t){var e=t.target,n=C.filterNotesByQuery(e.value.trim());m(p.noteList,n)})}]);
//# sourceMappingURL=bundle.js.map