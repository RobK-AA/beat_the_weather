!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);var o=document.getElementById("loader");o.style.display="none",o.style.position="relative";var a,i=document.getElementById("runner"),l=document.getElementById("score"),r=document.getElementById("streak"),s=localStorage.getItem("highScore")||"0";r.textContent=parseInt(s);var c=document.getElementById("clock"),d=document.getElementById("clock-label"),u=document.getElementById("modal-body"),m=document.getElementById("modal-header"),y=document.getElementById("modal-container");y.style.display="none";var p=document.getElementById("body"),g=document.getElementById("rain-background");!function(){c.textContent||(d.style.display="none");a=void 0,g.style.display="none",function(){var e,t=40-Math.random(),n=-99+Math.random(),o={lat:t,lng:n};e=new google.maps.Map(document.getElementById("map"),{center:o,zoom:7+Math.random(),disableDoubleClickZoom:!0,cursor:"url(/dist/images/clear.png), auto !important",draggableCursor:"url(/dist/images/clear.png), auto !important",draggingCursor:"url(/dist/images/clear.png), auto !important",styles:[{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels",stylers:[{visibility:"off"}]},{}]}),google.maps.event.addListener(e,"dblclick",(function(e){t=e.latLng.lat(),n=e.latLng.lng();var o=document.getElementById("latitude").textContent,a=document.getElementById("longitude").textContent;g.style.display="none",document.getElementById("latitude").textContent=t,document.getElementById("longitude").textContent=n,f(t,n,o,a),c.textContent=10}))}(),y.style.display="flex",y.style.flexDirection="column",m.textContent="Welcome to Beat the Weather!",u.textContent="This game was developed with JavaScript, HTML5, & CSS3. It utilizes the following API's: Google Maps, Open Weather Map and LocationIQ.",i.textContent="Follow my instructions, watch the clock and see if you can beat the weather...before the weather beats you! Double click the map anywhere to begin."}(),p.addEventListener("click",(function(){y.style.display="none"}));var h=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];function f(e,t,n,r){map.style.borderColor="gold",o.style.display="inline-block",fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(e,"&lon=").concat(t,"&appid=bd9ea9b48f291160192d69ca01301a7f")).then((function(e){return e.json()})).then((function(e){var t,n,r;t=e,n=document.getElementById("latitude").textContent,r=document.getElementById("longitude").textContent,function(e,t,n,r,s){var d;document.getElementById("latitude").textContent,document.getElementById("longitude").textContent,map.style.borderColor="black";var u=n.weather[0],m=u.description,y=u.main;fetch("https://us1.locationiq.com/v1/reverse.php?key=9819a97aea2239&lat=".concat(e,"&lon=").concat(t,"&format=json")).then((function(e){return e.json()})).then((function(e){var t=(d=e).address,n=t.city,o=t.state;if(m.includes("rain")||m.includes("shower")||y.includes("rain")||y.includes("shower")){g.style.display="block";var r=l.textContent;l.textContent=0,i.textContent="You got caught in the rain! Double click the map anywhere to play again.",a=void 0,c.textContent="",C(r)}else if(void 0===a||a===o&&void 0!==o&&void 0!==d)a=h[Math.floor(Math.random()*h.length)],l.textContent=parseInt(l.textContent)+1,i.textContent=n?"The weather is nice here in ".concat(n,", ").concat(o,", isn't it? Now find some nice weather in ").concat(a,"."):"The weather is nice here in ".concat(o,", isn't it? Now find some nice weather in ").concat(a,"."),C(l.textContent);else{i.textContent="Wrong state, mate! Double click the map anywhere to play again.";var s=l.textContent;l.textContent=0,a=void 0,c.textContent="",C(s)}})).catch((function(e){return console.log(e)})),o.style.display="none"}(n,r,t),o.style.display="none"})).catch((function(e){return console.log(e)}))}function C(e){parseInt(e)>parseInt(r.textContent)&&(r.textContent=parseInt(e),localStorage.setItem("highScore",parseInt(e)))}document.getElementById("fetch-weather").textContent="Fetching weather...";setInterval((function(){if(c.textContent&&(d.style.display="block"),parseInt(c.textContent)>0&&"none"===o.style.display)c.textContent=parseInt(c.textContent)-1;else if(0===parseInt(c.textContent)){i.textContent="You ran out of time! Double click the map anywhere to play again.";var e=l.textContent;l.textContent=0,a=void 0,C(e),c.textContent=""}}),1e3)},function(e,t,n){}]);
//# sourceMappingURL=main.js.map