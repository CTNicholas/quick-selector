!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n="undefined"!=typeof globalThis?globalThis:n||self).qs=e()}(this,(function(){"use strict";function n(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(n)))return;var t=[],r=!0,o=!1,u=void 0;try{for(var i,f=n[Symbol.iterator]();!(r=(i=f.next()).done)&&(t.push(i.value),!e||t.length!==e);r=!0);}catch(n){o=!0,u=n}finally{try{r||null==f.return||f.return()}finally{if(o)throw u}}return t}(n,e)||t(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(n){return function(n){if(Array.isArray(n))return r(n)}(n)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(n)||t(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n,e){if(n){if("string"==typeof n)return r(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(n,e):void 0}}function r(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}var o,u,i,f,c,a=(i=Object.getOwnPropertyNames(Object.getPrototypeOf(document))||[],f=Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))||[],c=i.concat(f).filter((function(n){return!n.indexOf("on")&&(null==document[n]||"function"==typeof document[n])})).map((function(n){return n.substr(2)})),o=c.length>0?c:[],u={set:v,get:d,only:p,filter:s},function(e){var t={},r={};return o.forEach((function(n){y(t,n,m,{elements:e,event:n}),r[n]=function(n){var e=n.elements,t=n.event;return function(n){return e.forEach((function(e){e.removeEventListener(t,n)})),e}}({elements:e,event:n})})),t.remove={value:r},Object.entries(u).forEach((function(r){var o=n(r,2),u=o[0],i=o[1];y(t,u,i,{elements:e,methodName:u})})),Object.defineProperties(e,t)});function l(n){var e=Array.from(document.querySelectorAll(n));return e.length>0?a(e):[]}function y(n,e,t,r){n[e]={value:t(r)}}function m(n){var e=n.elements,t=n.event;return function(n){return e.forEach((function(e){e.addEventListener(t,n)})),e}}function s(n){var e=n.elements,t=n.methodName;return function(n){return a([][t].call(e,n))}}function v(n){var e=n.elements;return function(n){return e.forEach(n),e}}function d(n){var e=n.elements;return function(n){return e.map((function(e){return n(e)}))}}function p(n){var e=n.elements;return function(n){return a([e[n]])}}function b(n,t){return g(n)&&h.apply(void 0,e(n))?n:g(n,t)?""===n.join()&&h.apply(void 0,e(t))?t:function(n,e){return n.map((function(n,t){return(n||"")+(e[t]||"")})).join("")}(n,t)||null:function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return e.every((function(n){return"string"==typeof n||n instanceof String}))}(n)?n:null}function h(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return e.every((function(n){return n instanceof Element||n instanceof HTMLDocument}))}function g(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return e.every((function(n){return Array.isArray(n)}))}function j(n){return!n||0===n.length||"[object Object]"===n}return function(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];var o=b(n,t);return j(o)?null:g(o)?a(o):l(o)}}));//# sourceMappingURL=qs.js.map
