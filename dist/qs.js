var e,n,t,r=(t=Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))).filter(function(e){return!e.indexOf("on")&&(null==document[e]||"function"==typeof document[e])}).map(function(e){return e.substr(2)}),e=t.length>0?t:["click","mouseover"],n={set:function(e){var n=e.elements;return function(e){return n.forEach(e),n}},get:function(e){var n=e.elements;return function(e){return n.map(function(n){return e(n)})}},only:function(e){var n=e.elements;return function(e){return r([n[e]])}},filter:function(e){var n=e.elements,t=e.methodName;return function(e){return r([][t].call(n,e))}}},function(t){var r={},c={};return e.forEach(function(e){o(r,e,u,{elements:t,event:e}),c[e]=function(e){var n=e.elements,t=e.event;return function(e){return console.log("Removing",t,n),n.forEach(function(n){n.removeEventListener(t,e)}),n}}({elements:t,event:e})}),r.remove={value:c},Object.entries(n).forEach(function(e){var n=e[0];o(r,n,e[1],{elements:t,methodName:n})}),Object.defineProperties(t,r)});function o(e,n,t,r){e[n]={value:t(r)}}function u(e){var n=e.elements,t=e.event;return function(e){return n.forEach(function(n){n.addEventListener(t,e)}),n}}function c(e,n){return Array.isArray(e)&&e.every(i)?e:Array.isArray(e)&&Array.isArray(n)?""===e.join()&&n.every(i)?n:e.map(function(e,t){return(e||"")+(n[t]||"")}).join("")||null:"string"==typeof e||e instanceof String?e:null}function i(e){return e instanceof Element||e instanceof HTMLDocument}module.exports=function(e){var n=c(e,[].slice.call(arguments,1));if(!n||0===n.length||"[object Object]"===n)return null;if(Array.isArray(n))return r(n);var t=Array.from(document.querySelectorAll(n));return t.length>0?r(t):[]};
//# sourceMappingURL=qs.js.map
