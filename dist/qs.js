var n,e,r=(n=Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))).filter(function(n){return!n.indexOf("on")&&(null==document[n]||"function"==typeof document[n])}).map(function(n){return n.substr(2)}),e={set:function(n){var e=n.elements;return function(n){return e.forEach(n),e}},get:function(n){var e=n.elements;return function(n){return e.map(function(e){return n(e)})}}},function(r){var o={};return n.forEach(function(n){t(o,n,u,{elements:r,event:n})}),Object.entries(e).forEach(function(n){t(o,n[0],n[1],{elements:r})}),Object.defineProperties(r,o)});function t(n,e,r,t){n[e]={},n[e].value=r(t)}function u(n){var e=n.elements,r=n.event;return function(n){return e.forEach(function(t){t.addEventListener(r,function(r){n(r,e)})}),e}}function o(n,e){return console.log("here",n,e,e.length,Array.isArray(e)),Array.isArray(n)&&n.every(c)?n:Array.isArray(n)&&Array.isArray(e)?""===n.join()&&e.every(c)?e:n.map(function(n,r){return(n||"")+(e[r]||"")}).join()||null:"string"==typeof n||n instanceof String?n:null}function c(n){return n instanceof Element||n instanceof HTMLDocument}module.exports=function(n){var e=o(n,[].slice.call(arguments,1));if(null===e)return null;if(Array.isArray(e))return r(e);var t=Array.from(document.querySelectorAll(e));return t.length>0?r(t):null};
//# sourceMappingURL=qs.js.map
