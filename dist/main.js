!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);var o=document.getElementById("loader");o.style.display="none";var a,r=document.getElementById("runner"),i=document.getElementById("score"),l=document.getElementById("streak"),c=document.getElementById("clock"),u=document.getElementById("clock-label");!function(){c.textContent||(u.style.display="none");a=void 0,e=40-Math.random(),n=-99+Math.random(),l={lat:e,lng:n},t=new google.maps.Map(document.getElementById("map"),{center:l,zoom:7+Math.random(),disableDoubleClickZoom:!0,cursor:"url(/dist/images/clear.png), auto !important",draggableCursor:"url(/dist/images/clear.png), auto !important",draggingCursor:"url(/dist/images/clear.png), auto !important"}),google.maps.event.addListener(t,"dblclick",(function(t){var l,u;e=t.latLng.lat(),n=t.latLng.lng(),document.getElementById("latitude").textContent,document.getElementById("longitude").textContent,document.getElementById("latitude").textContent=e,document.getElementById("longitude").textContent=n,document.getElementById("body").style.backgroundImage="url('https://thumbs.gfycat.com/GargantuanMammothFrogmouth-size_restricted.gif')",l=e,u=n,o.style.display="block",fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(l,"&lon=").concat(u,"&appid=bd9ea9b48f291160192d69ca01301a7f")).then((function(t){return t.json()})).then((function(t){var e,n,l;console.log(t),e=t,n=document.getElementById("latitude").textContent,l=document.getElementById("longitude").textContent,function(t,e,n,l,u){document.getElementById("latitude").textContent,document.getElementById("longitude").textContent;var m,g=n.weather[0],h=g.description,y=g.main;fetch("https://us1.locationiq.com/v1/reverse.php?key=9819a97aea2239&lat=".concat(t,"&lon=").concat(e,"&format=json")).then((function(t){return t.json()})).then((function(t){m=t,console.log(t);var e=m.address,n=e.city,o=e.state;if(h.includes("rain")||h.includes("shower")||y.includes("rain")||y.includes("shower")){document.getElementById("body").style.backgroundImage="url('https://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-32.gif')",alert("You got caught in the rain!");var l=i.textContent;i.textContent=0,r.textContent="You got caught in the rain! Double click the map anywhere to play again.",a=void 0,c.textContent="",d(l)}else if(void 0===a||a===o&&void 0!==o&&void 0!==m)a=s[Math.floor(Math.random()*s.length)],i.textContent=parseInt(i.textContent)+1,r.textContent="The weather is nice here in ".concat(n,", ").concat(o,", isn't it? Now find some nice weather in ").concat(a,"."),d(i.textContent);else{alert("Wrong state, mate!"),r.textContent="Wrong state, mate! Double click the map anywhere to play again.";var u=i.textContent;i.textContent=0,a=void 0,c.textContent="",d(u)}})).catch((function(t){return console.log(t)})),o.style.display="none"}(n,l,e),o.style.display="none"})).catch((function(t){return console.log(t)})),c.textContent=10})),r.textContent="Follow my instructions, watch the clock and see if you can beat the weather...before the weather beats you! Double click the map anywhere to begin.";var t,e,n,l}();var s=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];function d(t){parseInt(t)>parseInt(l.textContent)&&(l.textContent=parseInt(t))}document.getElementById("fetch-weather").textContent="Fetching weather...";setInterval((function(){if(c.textContent&&(u.style.display="block"),parseInt(c.textContent)>0&&"none"===o.style.display)c.textContent=parseInt(c.textContent)-1;else if(0===parseInt(c.textContent)){alert("Out of time!"),r.textContent="You ran out of time! Double click the map anywhere to play again.";var t=i.textContent;i.textContent=0,a=void 0,d(t),c.textContent=""}}),1e3)},function(t,e,n){}]);
//# sourceMappingURL=main.js.map