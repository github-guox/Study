(function(){var h={},mt={},c={id:"fa218a3ff7179639febdb15e372f411c",dm:["leetcode-cn.com","lingkou.com"],js:"tongji.baidu.com/hm-web/js/",etrk:[],cetrk:[],icon:'',ctrk:true,align:0,nv:0,vdur:1800000,age:31536000000,rec:0,rp:[],trust:0,vcard:0,qiao:0,lxb:0,kbtrk:0,pt:0,spa:0,aet:'',hca:'079D9C3AE32736FA',conv:0,med:0,cvcc:'',cvcf:[],apps:''};var r=void 0,s=!0,u=null,w=!1;mt.cookie={};mt.cookie.set=function(b,a,e){var d;e.N&&(d=new Date,d.setTime(d.getTime()+e.N));document.cookie=b+"="+a+(e.domain?"; domain="+e.domain:"")+(e.path?"; path="+e.path:"")+(d?"; expires="+d.toGMTString():"")+(e.wc?"; secure":"")};mt.cookie.get=function(b){return(b=RegExp("(^| )"+b+"=([^;]*)(;|$)").exec(document.cookie))?b[2]:u};
mt.cookie.Tb=function(b,a){try{var e="Hm_ck_"+ +new Date;mt.cookie.set(e,"is-cookie-enabled",{domain:b,path:a,N:r});var d="is-cookie-enabled"===mt.cookie.get(e)?"1":"0";mt.cookie.set(e,"",{domain:b,path:a,N:-1});return d}catch(f){return"0"}};mt.lang={};mt.lang.e=function(b,a){return"[object "+a+"]"==={}.toString.call(b)};mt.lang.va=function(b){return mt.lang.e(b,"Number")&&isFinite(b)};mt.lang.ca=function(b){return mt.lang.e(b,"String")};
mt.lang.g=function(b){return b.replace?b.replace(/'/g,"'0").replace(/\*/g,"'1").replace(/!/g,"'2"):b};mt.lang.trim=function(b){return b.replace(/^\s+|\s+$/g,"")};mt.lang.K=function(b,a){var e=w;if(b==u||!mt.lang.e(b,"Array")||a===r)return e;if(Array.prototype.indexOf)e=-1!==b.indexOf(a);else for(var d=0;d<b.length;d++)if(b[d]===a){e=s;break}return e};
(function(){var b=mt.lang;mt.f={};mt.f.Ja=function(a){return document.getElementById(a)};mt.f.yb=function(a){if(!a)return u;try{a=String(a);if(0===a.indexOf("!HMCC!"))return document.querySelector(a.substring(6,a.length));for(var b=a.split(">"),d=document.body,f=b.length-1;0<=f;f--)if(-1<b[f].indexOf("#")){var l=b[f].split("#")[1];(d=document.getElementById(l))||(d=document.getElementById(decodeURIComponent(l)));b=b.splice(f+1,b.length-(f+1));break}for(a=0;d&&a<b.length;){var k=String(b[a]).toLowerCase();
if(!("html"===k||"body"===k)){var f=0,m=b[a].match(/\[(\d+)\]/i),l=[];if(m)f=m[1]-1,k=k.split("[")[0];else if(1!==d.childNodes.length){for(var q=0,y=0,t=d.childNodes.length;y<t;y++){var n=d.childNodes[y];1===n.nodeType&&n.nodeName.toLowerCase()===k&&q++;if(1<q)return u}if(1!==q)return u}for(q=0;q<d.childNodes.length;q++)1===d.childNodes[q].nodeType&&d.childNodes[q].nodeName.toLowerCase()===k&&l.push(d.childNodes[q]);if(!l[f])return u;d=l[f]}a++}return d}catch(x){return u}};mt.f.ra=function(a,b){var d=
[],f=[];if(!a)return f;for(;a.parentNode!=u;){for(var l=0,k=0,m=a.parentNode.childNodes.length,q=0;q<m;q++){var y=a.parentNode.childNodes[q];if(y.nodeName===a.nodeName&&(l++,y===a&&(k=l),0<k&&1<l))break}if((m=""!==a.id)&&b){d.unshift("#"+encodeURIComponent(a.id));break}else m&&(m="#"+encodeURIComponent(a.id),m=0<d.length?m+">"+d.join(">"):m,f.push(m)),d.unshift(encodeURIComponent(String(a.nodeName).toLowerCase())+(1<l?"["+k+"]":""));a=a.parentNode}f.push(d.join(">"));return f};mt.f.Ma=function(a){return(a=
mt.f.ra(a,s))&&a.length?String(a[0]):""};mt.f.Fb=function(a){return mt.f.ra(a,w)};mt.f.vb=function(a){var b;for(b="A";(a=a.parentNode)&&1==a.nodeType;)if(a.tagName==b)return a;return u};mt.f.xb=function(a){return 9===a.nodeType?a:a.ownerDocument||a.document};mt.f.Db=function(a){var b={top:0,left:0};if(!a)return b;var d=mt.f.xb(a).documentElement;"undefined"!==typeof a.getBoundingClientRect&&(b=a.getBoundingClientRect());return{top:b.top+(window.pageYOffset||d.scrollTop)-(d.clientTop||0),left:b.left+
(window.pageXOffset||d.scrollLeft)-(d.clientLeft||0)}};mt.f.getAttribute=function(a,b){var d=a.getAttribute&&a.getAttribute(b)||u;if(!d&&a.attributes&&a.attributes.length)for(var f=a.attributes,l=f.length,k=0;k<l;k++)f[k].nodeName===b&&(d=f[k].nodeValue);return d};mt.f.$=function(a){var b="document";a.tagName!==r&&(b=a.tagName);return b.toLowerCase()};mt.f.Hb=function(a){var e="";a.textContent?e=b.trim(a.textContent):a.innerText&&(e=b.trim(a.innerText));e&&(e=e.replace(/\s+/g," ").substring(0,255));
return e};mt.f.Ka=function(a,e){var d=mt.f.$(a);"input"===d&&e&&("button"===a.type||"submit"===a.type)?d=b.trim(a.value)||"":"input"===d&&!e&&"password"!==a.type?d=b.trim(a.value)||"":"img"===d?(d=mt.f.getAttribute,d=d(a,"alt")||d(a,"title")||d(a,"src")):d="body"===d||"html"===d?["(hm-default-content-for-",d,")"].join(""):mt.f.Hb(a);return String(d).substring(0,255)};(function(){(mt.f.$b=function(){function a(){if(!a.ba){a.ba=s;for(var d=0,b=f.length;d<b;d++)f[d]()}}function b(){try{document.documentElement.doScroll("left")}catch(d){setTimeout(b,
1);return}a()}var d=w,f=[],l;document.addEventListener?l=function(){document.removeEventListener("DOMContentLoaded",l,w);a()}:document.attachEvent&&(l=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",l),a())});(function(){if(!d)if(d=s,"complete"===document.readyState)a.ba=s;else if(document.addEventListener)document.addEventListener("DOMContentLoaded",l,w),window.addEventListener("load",a,w);else if(document.attachEvent){document.attachEvent("onreadystatechange",
l);window.attachEvent("onload",a);var f=w;try{f=window.frameElement==u}catch(m){}document.documentElement.doScroll&&f&&b()}})();return function(d){a.ba?d():f.push(d)}}()).ba=w})();return mt.f})();mt.event={};mt.event.d=function(b,a,e){b.attachEvent?b.attachEvent("on"+a,function(a){e.call(b,a)}):b.addEventListener&&b.addEventListener(a,e,w)};mt.event.preventDefault=function(b){b.preventDefault?b.preventDefault():b.returnValue=w};
(function(){var b=mt.event;mt.h={};mt.h.ua=/msie (\d+\.\d+)/i.test(navigator.userAgent);mt.h.Bb=function(){if(document.documentMode)return document.documentMode;var a=/msie (\d+\.\d+)/i.exec(navigator.userAgent);return a?+a[1]||0:0};mt.h.cookieEnabled=navigator.cookieEnabled;mt.h.javaEnabled=navigator.javaEnabled();mt.h.language=navigator.language||navigator.browserLanguage||navigator.systemLanguage||navigator.userLanguage||"";mt.h.dc=(window.screen.width||0)+"x"+(window.screen.height||0);mt.h.colorDepth=
window.screen.colorDepth||0;mt.h.Q=function(){var a;a=a||document;return parseInt(window.pageYOffset||a.documentElement.scrollTop||a.body&&a.body.scrollTop||0,10)};mt.h.J=function(){var a=document;return parseInt(window.innerHeight||a.documentElement.clientHeight||a.body&&a.body.clientHeight||0,10)};mt.h.orientation=0;(function(){function a(){var a=0;window.orientation!==r&&(a=window.orientation);screen&&(screen.orientation&&screen.orientation.angle!==r)&&(a=screen.orientation.angle);mt.h.orientation=
a}a();b.d(window,"orientationchange",a)})();return mt.h})();mt.o={};mt.o.parse=function(b){return(new Function("return ("+b+")"))()};
mt.o.stringify=function(){function b(a){/["\\\x00-\x1f]/.test(a)&&(a=a.replace(/["\\\x00-\x1f]/g,function(a){var d=e[a];if(d)return d;d=a.charCodeAt();return"\\u00"+Math.floor(d/16).toString(16)+(d%16).toString(16)}));return'"'+a+'"'}function a(a){return 10>a?"0"+a:a}var e={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return function(d){switch(typeof d){case "undefined":return"undefined";case "number":return isFinite(d)?String(d):"null";case "string":return b(d);case "boolean":return String(d);
default:if(d===u)return"null";if(d instanceof Array){var f=["["],l=d.length,k,e,q;for(e=0;e<l;e++)switch(q=d[e],typeof q){case "undefined":case "function":case "unknown":break;default:k&&f.push(","),f.push(mt.o.stringify(q)),k=1}f.push("]");return f.join("")}if(d instanceof Date)return'"'+d.getFullYear()+"-"+a(d.getMonth()+1)+"-"+a(d.getDate())+"T"+a(d.getHours())+":"+a(d.getMinutes())+":"+a(d.getSeconds())+'"';k=["{"];e=mt.o.stringify;for(l in d)if(Object.prototype.hasOwnProperty.call(d,l))switch(q=
d[l],typeof q){case "undefined":case "unknown":case "function":break;default:f&&k.push(","),f=1,k.push(e(l)+":"+e(q))}k.push("}");return k.join("")}}}();mt.localStorage={};mt.localStorage.ia=function(){if(!mt.localStorage.l)try{mt.localStorage.l=document.createElement("input"),mt.localStorage.l.type="hidden",mt.localStorage.l.style.display="none",mt.localStorage.l.addBehavior("#default#userData"),document.getElementsByTagName("head")[0].appendChild(mt.localStorage.l)}catch(b){return w}return s};
mt.localStorage.set=function(b,a,e){var d=new Date;d.setTime(d.getTime()+e||31536E6);try{window.localStorage?(a=d.getTime()+"|"+a,window.localStorage.setItem(b,a)):mt.localStorage.ia()&&(mt.localStorage.l.expires=d.toUTCString(),mt.localStorage.l.load(document.location.hostname),mt.localStorage.l.setAttribute(b,a),mt.localStorage.l.save(document.location.hostname))}catch(f){}};
mt.localStorage.get=function(b){if(window.localStorage){if(b=window.localStorage.getItem(b)){var a=b.indexOf("|"),e=b.substring(0,a)-0;if(e&&e>(new Date).getTime())return b.substring(a+1)}}else if(mt.localStorage.ia())try{return mt.localStorage.l.load(document.location.hostname),mt.localStorage.l.getAttribute(b)}catch(d){}return u};
mt.localStorage.remove=function(b){if(window.localStorage)window.localStorage.removeItem(b);else if(mt.localStorage.ia())try{mt.localStorage.l.load(document.location.hostname),mt.localStorage.l.removeAttribute(b),mt.localStorage.l.save(document.location.hostname)}catch(a){}};mt.sessionStorage={};mt.sessionStorage.set=function(b,a){try{window.sessionStorage&&window.sessionStorage.setItem(b,a)}catch(e){}};
mt.sessionStorage.get=function(b){try{return window.sessionStorage?window.sessionStorage.getItem(b):u}catch(a){return u}};mt.sessionStorage.remove=function(b){try{window.sessionStorage&&window.sessionStorage.removeItem(b)}catch(a){}};mt.Va={};mt.Va.log=function(b,a){var e=new Image,d="mini_tangram_log_"+Math.floor(2147483648*Math.random()).toString(36);window[d]=e;e.onload=function(){e.onload=u;e=window[d]=u;a&&a(b)};e.src=b};mt.Aa={};
mt.Aa.Ib=function(){var b="";if(navigator.plugins&&navigator.mimeTypes.length){var a=navigator.plugins["Shockwave Flash"];a&&a.description&&(b=a.description.replace(/^.*\s+(\S+)\s+\S+$/,"$1"))}else if(window.ActiveXObject)try{if(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(b=a.GetVariable("$version"))&&(b=b.replace(/^.*\s+(\d+),(\d+).*$/,"$1.$2"))}catch(e){}return b};
mt.Aa.sc=function(b,a,e,d,f){return'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="'+b+'" width="'+e+'" height="'+d+'"><param name="movie" value="'+a+'" /><param name="flashvars" value="'+(f||"")+'" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="'+b+'" width="'+e+'" height="'+d+'" src="'+a+'" flashvars="'+(f||"")+'" allowscriptaccess="always" /></object>'};mt.url={};
mt.url.m=function(b,a){var e=b.match(RegExp("(^|&|\\?|#)("+a+")=([^&#]*)(&|$|#)",""));return e?e[3]:u};mt.url.tc=function(b){return(b=b.match(/^(https?:)\/\//))?b[1]:u};mt.url.Ab=function(b){return(b=b.match(/^(https?:\/\/)?([^\/\?#]*)/))?b[2].replace(/.*@/,""):u};mt.url.P=function(b){return(b=mt.url.Ab(b))?b.replace(/:\d+$/,""):b};mt.url.ra=function(b){return(b=b.match(/^(https?:\/\/)?[^\/]*(.*)/))?b[2].replace(/[\?#].*/,"").replace(/^$/,"/"):u};
(function(){function b(){for(var a=w,b=document.getElementsByTagName("script"),d=b.length,d=100<d?100:d,f=0;f<d;f++){var l=b[f].src;if(l&&0===l.indexOf("https://hm.baidu.com/h")){a=s;break}}return a}return h.ub=b})();var A=h.ub;
h.w={uc:"http://tongji.baidu.com/hm-web/welcome/ico",za:"hm.baidu.com/hm.gif",eb:/^(tongji|hmcdn).baidu.com$/,Xa:"tongji.baidu.com",Nb:"hmmd",Ob:"hmpl",oc:"utm_medium",Mb:"hmkw",qc:"utm_term",Kb:"hmci",nc:"utm_content",Pb:"hmsr",pc:"utm_source",Lb:"hmcu",mc:"utm_campaign",L:0,H:Math.round(+new Date/1E3),protocol:"https:"===document.location.protocol?"https:":"http:",ea:A()||"https:"===document.location.protocol?"https:":"http:",vc:0,mb:6E5,Ub:6E5,ec:5E3,nb:5,M:1024,lb:1,U:2147483647,Wa:"hca kb cc cf ci ck cl cm cp cu cw ds vl ep et fl ja ln lo lt rnd si su v cv lv api sn p ct u tt hh".split(" "),
R:s,Ga:["a","input","button"],gb:{id:"data-hm-id",ma:"data-hm-class",Da:"data-hm-xpath",content:"data-hm-content",Ba:"data-hm-tag",link:"data-hm-link"},Fa:"data-hm-enabled",Ea:"data-hm-disabled",Yb:"https://hmcdn.baidu.com/static/tongji/plugins/",Ra:["UrlChangeTracker"]};(function(){var b={C:{},d:function(a,b){this.C[a]=this.C[a]||[];this.C[a].push(b)},I:function(a,b){this.C[a]=this.C[a]||[];for(var d=this.C[a].length,f=0;f<d;f++)this.C[a][f](b)}};return h.B=b})();
(function(){function b(b,d){var f=document.createElement("script");f.charset="utf-8";a.e(d,"Function")&&(f.readyState?f.onreadystatechange=function(){if("loaded"===f.readyState||"complete"===f.readyState)f.onreadystatechange=u,d()}:f.onload=function(){d()});f.src=b;var l=document.getElementsByTagName("script")[0];l.parentNode.insertBefore(f,l)}var a=mt.lang;return h.load=b})();
(function(){var b=mt.cookie,a=mt.localStorage,e=mt.sessionStorage,d={getData:function(d){try{return b.get(d)||e.get(d)||a.get(d)}catch(l){}},setData:function(f,l,k){try{b.set(f,l,{domain:d.O(),path:d.Z(),N:k}),k?a.set(f,l,k):e.set(f,l)}catch(m){}},bc:function(f){try{b.set(f,"",{domain:d.O(),path:d.Z(),N:-1}),e.remove(f),a.remove(f)}catch(l){}},S:function(a,d){a="."+a.replace(/:\d+/,"");d="."+d.replace(/:\d+/,"");var b=a.indexOf(d);return-1<b&&b+d.length===a.length},da:function(a,d){a=a.replace(/^https?:\/\//,
"");return 0===a.indexOf(d)},O:function(){for(var a=document.location.hostname,b=0,e=c.dm.length;b<e;b++)if(d.S(a,c.dm[b]))return c.dm[b].replace(/(:\d+)?[/?#].*/,"");return a},Z:function(){for(var a=0,b=c.dm.length;a<b;a++){var e=c.dm[a];if(-1<e.indexOf("/")&&d.da(document.location.href,e))return e.replace(/^[^/]+(\/.*)/,"$1")+"/"}return"/"}};return h.na=d})();
(function(){var b=mt.lang,a=mt.o,e=h.na,d={pageview:{},session:{},autoEventTracking:{},customEvent:{},user:{}},f={user:1,session:2,pageview:3,autoEventTracking:3,customEvent:3,others:3},l=["session","user"],k="Hm_up_"+c.id,m={init:function(){m.Rb()},Rb:function(){try{var f=a.parse(decodeURIComponent(e.getData(k)));b.e(f,"Object")&&(d.user=f)}catch(l){}},D:function(a){var b={};d[a]!==r&&(b=d[a]);a=this.sa();for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f]);return a},sa:function(){for(var a={},b,f=l.length-
1;0<=f;f--){b=d[l[f]];for(var n in b)b.hasOwnProperty(n)&&(a[n]=b[n])}return a},setProperty:function(f,e,l){var n=d[f];if(b.e(n,"Object")&&b.e(e,"Object")){for(var k in e)if(e.hasOwnProperty(k)){var g=b.g(String(k));if(l||!((/^_/.test(g)||/_$/.test(g))&&"_iden"!==g)){var p=e[k];if(p==u)delete n[g];else{if(b.e(p,"Object")||b.e(p,"Array"))p=a.stringify(p);p=b.g(String(p));m.Sb(f,g,p)&&(n[g]={value:p,scope:m.Na(f)})}}}"user"===f&&m.xa()}},s:function(a){a!==r&&("userId"===a&&b.e(d.user,"Object")?(delete d.user.uid_,
m.xa()):"user"===a&&b.e(d.user,"Object")?(a=d.user.uid_,d.user=a===r?{}:{uid_:a},m.xa()):d[a]!==r&&(d[a]={}))},xa:function(){try{e.setData(k,encodeURIComponent(a.stringify(d.user)),c.age)}catch(b){}},Sb:function(a,b,f){var n=s,e=d[a];if(256<encodeURIComponent(String(b)).length||256<encodeURIComponent(String(f)).length)n=w;else{var g=e[b];e[b]={value:f,scope:m.Na(a)};a=m.W(m.D(a));2048<encodeURIComponent(a).length&&(g!==r?e[b]=g:delete e[b],n=w)}return n},W:function(a){var b=[],d,f;for(f in a)a.hasOwnProperty(f)&&
(d=[f,a[f].value],(1===a[f].scope||2===a[f].scope)&&d.push(a[f].scope),b.push(d.join("*")));return b.join("!")},Na:function(a){a=f[a];return a!==r?a:f.others}};return h.Y=m})();
(function(){var b=mt.lang,a=mt.f,e={X:function(b,f){return function(l){var k=l.target||l.srcElement;if(k){var m=k.getAttribute(b.ha);l=l.clientX+":"+l.clientY;if(m&&m===l)k.removeAttribute(b.ha);else if(f&&0<f.length&&(k=a.Fb(k))&&k.length)if(m=k.length,l=k[k.length-1],1E4>m*l.split(">").length)for(l=0;l<m;l++)e.Ua(b,k[l]);else e.Ua(b,l)}}},Ua:function(a,f){for(var e={},k=String(f).split(">").length,m=0;m<k;m++)e[f]="",f=f.substring(0,f.lastIndexOf(">"));a&&(b.e(a,"Object")&&a.Ha)&&a.Ha(e)},ac:function(a,
b){return function(e){(e.target||e.srcElement).setAttribute(a.ha,e.clientX+":"+e.clientY);a&&a.r&&(b?a.r(b):a.r("#"+encodeURIComponent(this.id),e.type))}}};return h.pa=e})();
(function(){var b=mt.f,a=mt.o,e=mt.event,d=mt.lang,f=h.pa,l=h.Y,k=l.W,m={ha:"HM_ce",Za:function(){if(c.cetrk&&c.cetrk.length){e.d(document,"click",f.X(m,c.cetrk));for(var d=0,l=c.cetrk.length;d<l;d++){var k;try{k=a.parse(decodeURIComponent(String(c.cetrk[d])))}catch(n){k={}}var x=k.p||"";-1===x.indexOf(">")&&(0===x.indexOf("#")&&(x=x.substring(1)),(x=b.Ja(x))&&e.d(x,"click",f.ac(m,k)))}}},Ha:function(b){if(c.cetrk&&c.cetrk.length)for(var d=0,f=c.cetrk.length;d<f;d++){var e;try{e=a.parse(decodeURIComponent(String(c.cetrk[d])))}catch(k){e=
{}}b.hasOwnProperty(e.p)&&m.r(e)}},r:function(a){h.c.b.et=7;var f=a&&a.k||"",f=d.g(f),e={};if(a&&a.a&&d.e(a.a,"Object"))for(var n in a.a)if(a.a.hasOwnProperty(n)){var m=b.yb(a.a[n]||""),m=m?b.Ka(m,w):"";e[n]=m}e._iden=f;l.setProperty("customEvent",e);h.c.b.ep="";h.c.b.p=k(l.D("customEvent"));h.c.i();h.c.b.p="";l.s("customEvent")}};h.B.d("pv-b",m.Za);return m})();
(function(){var b=mt.f,a=mt.lang,e=mt.event,d=mt.h,f=h.w,l=h.B,k=[],m={Ya:function(){c.ctrk&&(e.d(document,"mouseup",m.jb()),e.d(window,"unload",function(){m.fa()}),setInterval(function(){m.fa()},f.mb))},jb:function(){return function(a){a=m.wb(a);if(""!==a){var b=(f.ea+"//"+f.za+"?"+h.c.Ta().replace(/ep=[^&]*/,"ep="+encodeURIComponent(a))).length;b+(f.U+"").length>f.M||(b+encodeURIComponent(k.join("!")+(k.length?"!":"")).length+(f.U+"").length>f.M&&m.fa(),k.push(a),(k.length>=f.nb||/\*a\*/.test(a))&&
m.fa())}}},wb:function(e){var k=e.target||e.srcElement;if(0===f.lb){var n=(k.tagName||"").toLowerCase();if("embed"==n||"object"==n)return""}var l;d.ua?(l=Math.max(document.documentElement.scrollTop,document.body.scrollTop),n=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),n=e.clientX+n,l=e.clientY+l):(n=e.pageX,l=e.pageY);e=m.Cb(e,k,n,l);var g=window.innerWidth||document.documentElement.clientWidth||document.body.offsetWidth;switch(c.align){case 1:n-=g/2;break;case 2:n-=g}g=
[];g.push(n);g.push(l);g.push(e.Vb);g.push(e.Wb);g.push(e.Zb);g.push(a.g(e.Xb));g.push(e.rc);g.push(e.Jb);(k="a"===(k.tagName||"").toLowerCase()?k:b.vb(k))?(g.push("a"),g.push(a.g(encodeURIComponent(k.href)))):g.push("b");return g.join("*")},Cb:function(f,e,k,l){f=b.Ma(e);var g=0,p=0,z=0,v=0;if(e&&(g=e.offsetWidth||e.clientWidth,p=e.offsetHeight||e.clientHeight,v=b.Db(e),z=v.left,v=v.top,a.e(e.getBBox,"Function")&&(p=e.getBBox(),g=p.width,p=p.height),"html"===(e.tagName||"").toLowerCase()))g=Math.max(g,
e.clientWidth),p=Math.max(p,e.clientHeight);return{Vb:Math.round(100*((k-z)/g)),Wb:Math.round(100*((l-v)/p)),Zb:d.orientation,Xb:f,rc:g,Jb:p}},fa:function(){0!==k.length&&(h.c.b.et=2,h.c.b.ep=k.join("!"),h.c.i(),k=[])}},q={bb:function(){c.ctrk&&setInterval(q.fc,f.ec)},fc:function(){var a=d.Q()+d.J();0<a-h.c.b.vl&&(h.c.b.vl=a)}};l.d("pv-b",m.Ya);l.d("pv-b",q.bb);return m})();
(function(){var b=mt.lang,a=mt.f,e=mt.event,d=mt.h,f=h.w,l=h.B,k=h.Y,m=k.W,q=+new Date,y=[],t={X:function(){return function(d){if(h.c&&h.c.R&&c.aet&&c.aet.length){var e=d.target||d.srcElement;if(e){var g=h.c.Ga,p=a.getAttribute(e,f.Fa)!=u?s:w;if(a.getAttribute(e,f.Ea)==u)if(p)t.ka(t.qa(e,d));else{var z=a.$(e);if(b.K(g,"*")||b.K(g,z))t.ka(t.qa(e,d));else for(;e.parentNode!=u;){var p=e.parentNode,z=a.$(p),v="a"===z&&b.K(g,"a")?s:w,z="button"===z&&b.K(g,"button")?s:w,B=a.getAttribute(p,f.Fa)!=u?s:w;
if(a.getAttribute(p,f.Ea)==u&&(v||z||B)){t.ka(t.qa(p,d));break}e=e.parentNode}}}}}},qa:function(e,k){var g={},p=f.gb;g.id=a.getAttribute(e,p.id)||a.getAttribute(e,"id")||"";g.ma=a.getAttribute(e,p.ma)||a.getAttribute(e,"class")||"";g.Da=a.getAttribute(e,p.Da)||a.Ma(e);g.content=a.getAttribute(e,p.content)||a.Ka(e,s);g.Ba=a.getAttribute(e,p.Ba)||a.$(e);g.link=a.getAttribute(e,p.link)||a.getAttribute(e,"href")||"";g.type=k.type||"click";p=b.va(e.offsetTop)?e.offsetTop:0;"click"===k.type?p=d.ua?k.clientY+
Math.max(document.documentElement.scrollTop,document.body.scrollTop):k.pageY:"touchend"===k.type&&(k.wa&&b.e(k.wa.changedTouches,"Array")&&k.wa.changedTouches.length)&&(p=k.wa.changedTouches[0].pageY);g.lc=p;return g},ka:function(a){var d=b.g;a=[+new Date-(h.c.F!==r?h.c.F:q),d(a.id),d(a.ma),d(a.Ba),d(a.Da),d(a.link),d(a.content),a.type,a.lc].join("*");t.la(a);b.e(this.V(),"Function")&&this.V()()},la:function(a){a.length>f.M||(encodeURIComponent(y.join("!")+a).length>f.M&&(t.r(y.join("!")),y=[]),y.push(a))},
r:function(a){h.c.b.et=5;h.c.b.ep=a;h.c.b.p=m(k.D("autoEventTracking"));h.c.i();h.c.b.p=""},V:function(){return function(){y&&y.length&&(t.r(y.join("!")),y=[])}}};b.ca(c.aet)&&""!==c.aet&&l.d("pv-b",function(){e.d(document,"click",t.X());"ontouchend"in document&&e.d(window,"touchend",t.X());e.d(window,"unload",t.V())});return t})();
(function(){var b=mt.event,a=mt.h,e=h.w,d=h.B,f=+new Date,l=[],k=u,m={qb:function(){return function(){h.c&&(h.c.R&&c.aet&&c.aet.length)&&(window.clearTimeout(k),k=window.setTimeout(function(){m.ab(a.Q()+a.J())},150))}},ab:function(a){m.la([+new Date-(h.c.F!==r?h.c.F:f),a].join("*"))},la:function(a){if(encodeURIComponent(l.join("!")+a).length>e.M||3<l.length)m.r(l.join("!")),l=[];l.push(a)},r:function(b){h.c.b.et=6;h.c.b.vh=a.J();h.c.b.ep=b;h.c.i()},V:function(){return function(){l&&l.length&&(m.r(l.join("!")),
l=[])}}};mt.lang.ca(c.aet)&&""!==c.aet&&d.d("pv-b",function(){b.d(window,"scroll",m.qb());b.d(window,"unload",m.V())});return m})();
(function(){function b(){return function(){h.c.b.nv=0;h.c.b.st=4;h.c.b.et=3;h.c.b.ep=h.oa.Eb()+","+h.oa.zb();h.c.i()}}function a(){clearTimeout(v);var b;p&&(b="visible"==document[p]);z&&(b=!document[z]);m="undefined"==typeof b?s:b;if((!k||!q)&&m&&y)g=s,n=+new Date;else if(k&&q&&(!m||!y))g=w,x+=+new Date-n;k=m;q=y;v=setTimeout(a,100)}function e(a){var p=document,b="";if(a in p)b=a;else for(var d=["webkit","ms","moz","o"],e=0;e<d.length;e++){var v=d[e]+a.charAt(0).toUpperCase()+a.slice(1);if(v in p){b=
v;break}}return b}function d(p){if(!("focus"==p.type||"blur"==p.type)||!(p.target&&p.target!=window))y="focus"==p.type||"focusin"==p.type?s:w,a()}var f=mt.event,l=h.B,k=s,m=s,q=s,y=s,t=+new Date,n=t,x=0,g=s,p=e("visibilityState"),z=e("hidden"),v;a();(function(){var b=p.replace(/[vV]isibilityState/,"visibilitychange");f.d(document,b,a);f.d(window,"pageshow",a);f.d(window,"pagehide",a);"object"==typeof document.onfocusin?(f.d(document,"focusin",d),f.d(document,"focusout",d)):(f.d(window,"focus",d),
f.d(window,"blur",d))})();h.oa={Eb:function(){return+new Date-t},zb:function(){return g?+new Date-n+x:x}};l.d("pv-b",function(){f.d(window,"unload",b())});l.d("duration-send",b());l.d("duration-done",function(){n=t=+new Date;x=0});return h.oa})();
(function(){var b=mt.lang,a=h.w,e=h.load,d={Qb:function(d){if((window._dxt===r||b.e(window._dxt,"Array"))&&"undefined"!==typeof h.c){var l=h.c.O();e([a.protocol,"//datax.baidu.com/x.js?si=",c.id,"&dm=",encodeURIComponent(l)].join(""),d)}},kc:function(a){if(b.e(a,"String")||b.e(a,"Number"))window._dxt=window._dxt||[],window._dxt.push(["_setUserId",a])}};return h.ob=d})();
(function(){function b(a,b,d,e){if(!(a===r||b===r||e===r)){if(""===a)return[b,d,e].join("*");a=String(a).split("!");for(var f,g=w,k=0;k<a.length;k++)if(f=a[k].split("*"),String(b)===f[0]){f[1]=d;f[2]=e;a[k]=f.join("*");g=s;break}g||a.push([b,d,e].join("*"));return a.join("!")}}function a(b){for(var e in b)if({}.hasOwnProperty.call(b,e)){var v=b[e];d.e(v,"Object")||d.e(v,"Array")?a(v):b[e]=String(v)}}var e=mt.url,d=mt.lang,f=mt.o,l=mt.h,k=h.w,m=h.B,q=h.ob,y=h.load,t=h.na,n=h.Y,x=n.W,g={T:[],ga:0,Qa:w,
A:{Ca:"",page:""},init:function(){g.j=0;n.init();m.d("pv-b",function(){g.pb();g.rb()});m.d("pv-d",function(){g.tb();g.A.page=""});m.d("stag-b",function(){h.c.b.api=g.j||g.ga?g.j+"_"+g.ga:"";h.c.b.ct=[decodeURIComponent(t.getData("Hm_ct_"+c.id)||""),g.A.Ca,g.A.page].join("!")});m.d("stag-d",function(){h.c.b.api=0;g.j=0;g.ga=0})},pb:function(){var a=window._hmt||[];if(!a||d.e(a,"Array"))window._hmt={id:c.id,cmd:{},push:function(){for(var a=window._hmt,b=0;b<arguments.length;b++){var p=arguments[b];
d.e(p,"Array")&&(a.cmd[a.id].push(p),"_setAccount"===p[0]&&(1<p.length&&/^[0-9a-f]{32}$/.test(p[1]))&&(p=p[1],a.id=p,a.cmd[p]=a.cmd[p]||[]))}}},window._hmt.cmd[c.id]=[],window._hmt.push.apply(window._hmt,a)},rb:function(){var a=window._hmt;if(a&&a.cmd&&a.cmd[c.id])for(var b=a.cmd[c.id],d=/^_track(Event|MobConv|Order|RTEvent)$/,e=0,f=b.length;e<f;e++){var k=b[e];d.test(k[0])?g.T.push(k):g.ya(k)}a.cmd[c.id]={push:g.ya}},tb:function(){if(0<g.T.length)for(var a=0,b=g.T.length;a<b;a++)g.ya(g.T[a]);g.T=
u},ya:function(a){var b=a[0];if(g.hasOwnProperty(b)&&d.e(g[b],"Function"))g[b](a)},_setAccount:function(a){1<a.length&&/^[0-9a-f]{32}$/.test(a[1])&&(g.j|=1)},_setAutoPageview:function(a){if(1<a.length&&(a=a[1],w===a||s===a))g.j|=2,h.c.Oa=a},_trackPageview:function(a){if(1<a.length&&a[1].charAt&&"/"===a[1].charAt(0)){g.j|=4;h.c.b.sn=h.c.La();h.c.b.et=0;h.c.b.ep="";h.c.b.vl=l.Q()+l.J();h.c.b.kb=0;h.c.ta?(h.c.b.nv=0,h.c.b.st=4):h.c.ta=s;var b=h.c.b.u,d=h.c.b.su;h.c.b.u=k.protocol+"//"+document.location.host+
a[1];g.Qa||(h.c.b.su=document.location.href);h.c.b.p=x(n.D("pageview"));h.c.i();h.c.b.u=b;h.c.b.su=d;h.c.b.p="";h.c.F=+new Date;n.s("pageview")}},_trackEvent:function(a){2<a.length&&(g.j|=8,h.c.b.nv=0,h.c.b.st=4,h.c.b.et=4,h.c.b.ep=d.g(a[1])+"*"+d.g(a[2])+(a[3]?"*"+d.g(a[3]):"")+(a[4]?"*"+d.g(a[4]):""),h.c.b.p=x(n.sa()),h.c.i(),h.c.b.p="")},_setCustomVar:function(a){if(!(4>a.length)){var b=a[1],e=a[4]||3;if(0<b&&6>b&&0<e&&4>e){g.ga++;for(var f=(h.c.b.cv||"*").split("!"),k=f.length;k<b-1;k++)f.push("*");
f[b-1]=e+"*"+d.g(a[2])+"*"+d.g(a[3]);h.c.b.cv=f.join("!");a=h.c.b.cv.replace(/[^1](\*[^!]*){2}/g,"*").replace(/((^|!)\*)+$/g,"");""!==a?t.setData("Hm_cv_"+c.id,encodeURIComponent(a),c.age):t.bc("Hm_cv_"+c.id)}}},_setUserTag:function(a){if(!(3>a.length)){var e=d.g(a[1]);a=d.g(a[2]);if(e!==r&&a!==r){var v=decodeURIComponent(t.getData("Hm_ct_"+c.id)||""),v=b(v,e,1,a);t.setData("Hm_ct_"+c.id,encodeURIComponent(v),c.age)}}},_setVisitTag:function(a){if(!(3>a.length)){var e=d.g(a[1]);a=d.g(a[2]);if(e!==
r&&a!==r){var v=g.A.Ca,v=b(v,e,2,a);g.A.Ca=v}}},_setPageTag:function(a){if(!(3>a.length)){var e=d.g(a[1]);a=d.g(a[2]);if(e!==r&&a!==r){var v=g.A.page,v=b(v,e,3,a);g.A.page=v}}},_setReferrerOverride:function(a){1<a.length&&(h.c.b.su=a[1].charAt&&"/"===a[1].charAt(0)?k.protocol+"//"+window.location.host+a[1]:a[1],g.Qa=s)},_trackOrder:function(b){b=b[1];d.e(b,"Object")&&(a(b),g.j|=16,h.c.b.nv=0,h.c.b.st=4,h.c.b.et=94,h.c.b.ep=f.stringify(b),h.c.b.p=x(n.sa()),h.c.i(),h.c.b.p="")},_trackMobConv:function(a){if(a=
{webim:1,tel:2,map:3,sms:4,callback:5,share:6}[a[1]])g.j|=32,h.c.b.et=93,h.c.b.ep=a,h.c.i()},_setDataxId:function(a){a=a[1];q.Qb();q.kc(a)},_setUserId:function(a){a=a[1];if(a!==r&&(d.ca(a)||d.va(a))){var b=n.D("user").uid_;if(!(b&&b.value===d.g(String(a)))){var b=h.c.b.p,e=h.c.b.ep;h.c.b.et=8;h.c.b.ep="";h.c.b.p="uid_*"+d.g(String(a));h.c.i();var f={};f.uid_=a;n.setProperty("user",f,s);h.c.b.p=b;h.c.b.ep=e}}},_clearUserId:function(a){1<a.length&&s===a[1]&&n.s("userId")},_setUserProperty:function(a){a=
a[1];d.e(a,"Object")&&n.setProperty("user",a)},_clearUserProperty:function(a){1<a.length&&s===a[1]&&n.s("user")},_setSessionProperty:function(a){a=a[1];d.e(a,"Object")&&n.setProperty("session",a)},_clearSessionProperty:function(a){1<a.length&&s===a[1]&&n.s("session")},_setPageviewProperty:function(a){a=a[1];d.e(a,"Object")&&n.setProperty("pageview",a)},_clearPageviewProperty:function(a){1<a.length&&s===a[1]&&n.s("pageview")},_setAutoEventTrackingProperty:function(a){a=a[1];d.e(a,"Object")&&n.setProperty("autoEventTracking",
a)},_clearAutoEventTrackingProperty:function(a){1<a.length&&s===a[1]&&n.s("autoEventTracking")},_setAutoTracking:function(a){if(1<a.length&&(a=a[1],w===a||s===a))h.c.Pa=a},_setAutoEventTracking:function(a){if(1<a.length&&(a=a[1],w===a||s===a))h.c.R=a},_trackPageDuration:function(a){1<a.length?(a=a[1],2===String(a).split(",").length&&(h.c.b.et=3,h.c.b.ep=a,h.c.i())):m.I("duration-send");m.I("duration-done")},_require:function(a){1<a.length&&(a=a[1],k.eb.test(e.P(a))&&y(a))},_providePlugin:function(a){if(1<
a.length){var b=window._hmt,e=a[1];a=a[2];if(d.K(k.Ra,e)&&d.e(a,"Function")&&(b.plugins=b.plugins||{},b.G=b.G||{},b.plugins[e]=a,b.z=b.z||[],a=b.z.slice(),e&&a.length&&a[0][1]===e))for(var f=0,g=a.length;f<g;f++){var l=a[f][2]||{};if(b.plugins[e]&&!b.G[e])b.G[e]=new b.plugins[e](l),b.z.shift();else break}}},_requirePlugin:function(a){if(1<a.length){var b=window._hmt,e=a[1],f=a[2]||{};if(d.K(k.Ra,e))if(b.plugins=b.plugins||{},b.G=b.G||{},b.plugins[e]&&!b.G[e])b.G[e]=new b.plugins[e](f);else{b.z=b.z||
[];for(var f=0,l=b.z.length;f<l;f++)if(b.z[f][1]===e)return;b.z.push(a);g._require([u,k.Yb+e+".js"])}}},_trackCustomEvent:function(a){if(1<a.length){var b=a[1];a=a[2];d.e(a,"Object")&&(a._iden=b,n.setProperty("customEvent",a));h.c.b.et=7;h.c.b.ep="";h.c.b.p=x(n.D("customEvent"));h.c.i();h.c.b.p="";n.s("customEvent")}}};g.init();h.fb=g;return h.fb})();
(function(){function b(){"undefined"===typeof window["_bdhm_loaded_"+c.id]&&(window["_bdhm_loaded_"+c.id]=s,this.b={},this.Pa=this.Oa=s,this.R=g.R,this.Ga=f.ca(c.aet)&&0<c.aet.length?c.aet.split(","):"",this.ta=w,this.init())}var a=mt.url,e=mt.Va,d=mt.Aa,f=mt.lang,l=mt.cookie,k=mt.h,m=mt.sessionStorage,q=mt.o,y=mt.event,t=h.na,n=h.Y,x=n.W,g=h.w,p=h.load,z=h.B;b.prototype={S:function(a,b){a="."+a.replace(/:\d+/,"");b="."+b.replace(/:\d+/,"");var d=a.indexOf(b);return-1<d&&d+b.length===a.length},da:function(a,
b){a=a.replace(/^https?:\/\//,"");return 0===a.indexOf(b)},aa:function(b){for(var d=0;d<c.dm.length;d++)if(-1<c.dm[d].indexOf("/")){if(this.da(b,c.dm[d]))return s}else{var e=a.P(b);if(e&&this.S(e,c.dm[d]))return s}return w},O:function(){for(var a=document.location.hostname,b=0,d=c.dm.length;b<d;b++)if(this.S(a,c.dm[b]))return c.dm[b].replace(/(:\d+)?[/?#].*/,"");return a},Z:function(){for(var a=0,b=c.dm.length;a<b;a++){var d=c.dm[a];if(-1<d.indexOf("/")&&this.da(document.location.href,d))return d.replace(/^[^/]+(\/.*)/,
"$1")+"/"}return"/"},Gb:function(){if(!document.referrer)return g.H-g.L>c.vdur?1:4;var b=w;this.aa(document.referrer)&&this.aa(document.location.href)?b=s:(b=a.P(document.referrer),b=this.S(b||"",document.location.hostname));return b?g.H-g.L>c.vdur?1:4:3},ic:function(){var a,b,d,e,f;g.L=t.getData("Hm_lpvt_"+c.id)||0;13===g.L.length&&(g.L=Math.round(g.L/1E3));b=this.Gb();a=4!==b?1:0;if(d=t.getData("Hm_lvt_"+c.id)){e=d.split(",");for(f=e.length-1;0<=f;f--)13===e[f].length&&(e[f]=""+Math.round(e[f]/
1E3));for(;2592E3<g.H-e[0];)e.shift();f=4>e.length?2:3;for(1===a&&e.push(g.H);4<e.length;)e.shift();d=e.join(",");e=e[e.length-1]}else d=g.H,e="",f=1;t.setData("Hm_lvt_"+c.id,d,c.age);t.setData("Hm_lpvt_"+c.id,g.H);d=l.Tb(this.O(),this.Z());if(0===c.nv&&this.aa(document.location.href)&&(""===document.referrer||this.aa(document.referrer)))a=0,b=4;this.b.nv=a;this.b.st=b;this.b.cc=d;this.b.lt=e;this.b.lv=f},Ta:function(){for(var a=[],b=this.b.et,d=+new Date,e=0,f=g.Wa.length;e<f;e++){var k=g.Wa[e],
l=this.b[k];"undefined"!==typeof l&&""!==l&&("tt"!==k||"tt"===k&&0===b)&&(("ct"!==k||"ct"===k&&0===b)&&("kb"!==k||"kb"===k&&3===b))&&a.push(k+"="+encodeURIComponent(l))}switch(b){case 0:this.b.rt&&a.push("rt="+encodeURIComponent(this.b.rt));break;case 5:a.push("_lpt="+this.F);a.push("_ct="+d);break;case 6:a.push("_lpt="+this.F);a.push("_ct="+d);break;case 90:this.b.rt&&a.push("rt="+this.b.rt)}return a.join("&")},jc:function(){this.ic();this.b.si=c.id;this.b.sn=this.La();this.b.su=document.referrer;
this.b.hh=window.location.hash;this.b.ds=k.dc;this.b.cl=k.colorDepth+"-bit";this.b.ln=String(k.language).toLowerCase();this.b.ja=k.javaEnabled?1:0;this.b.ck=k.cookieEnabled?1:0;this.b.lo="number"===typeof _bdhm_top?1:0;this.b.fl=d.Ib();this.b.v="1.2.61";this.b.cv=decodeURIComponent(t.getData("Hm_cv_"+c.id)||"");this.b.tt=document.title||"";this.b.vl=k.Q()+k.J();var b=document.location.href;this.b.cm=a.m(b,g.Nb)||"";this.b.cp=a.m(b,g.Ob)||a.m(b,g.oc)||"";this.b.cw=a.m(b,g.Mb)||a.m(b,g.qc)||"";this.b.ci=
a.m(b,g.Kb)||a.m(b,g.nc)||"";this.b.cf=a.m(b,g.Pb)||a.m(b,g.pc)||"";this.b.cu=a.m(b,g.Lb)||a.m(b,g.mc)||""},init:function(){try{this.jc(),0===this.b.nv?this.hc():this.Ia(),h.c=this,this.ib(),this.hb(),z.I("pv-b"),this.gc()}catch(a){var b=[];b.push("si="+c.id);b.push("n="+encodeURIComponent(a.name));b.push("m="+encodeURIComponent(a.message));b.push("r="+encodeURIComponent(document.referrer));e.log(g.ea+"//"+g.za+"?"+b.join("&"))}},gc:function(){function a(){z.I("pv-d")}this.Oa?(this.ta=s,this.b.et=
0,this.b.ep="",this.b.p=x(n.D("pageview")),this.b.vl=k.Q()+k.J(),this.i(a),this.b.p=""):a();this.F=+new Date;n.s("pageview")},i:function(a){if(this.Pa){var b=this;b.b.rnd=Math.round(Math.random()*g.U);z.I("stag-b");var d=g.ea+"//"+g.za+"?"+b.Ta();z.I("stag-d");b.cb(d);e.log(d,function(d){b.Sa(d);f.e(a,"Function")&&a.call(b)})}},ib:function(){var b=document.location.hash.substring(1),d=RegExp(c.id),e=a.P(document.referrer)===g.Xa?1:0,f=a.m(b,"jn"),k=/^heatlink$|^select$|^pageclick$/.test(f);b&&(d.test(b)&&
e&&k)&&(this.b.rnd=Math.round(Math.random()*g.U),b=document.createElement("script"),b.setAttribute("type","text/javascript"),b.setAttribute("charset","utf-8"),b.setAttribute("src",g.protocol+"//"+c.js+f+".js?"+this.b.rnd),f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(b,f))},hb:function(){if(window.postMessage&&window.self!==window.parent){var b=this;y.d(window,"message",function(d){if(a.P(d.origin)===g.Xa){d=d.data||{};var e=d.jn||"",f=/^customevent$/.test(e);if(RegExp(c.id).test(d.sd||
"")&&f)b.b.rnd=Math.round(Math.random()*g.U),p(g.protocol+"//"+c.js+e+".js?"+b.b.rnd)}});window.parent.postMessage({id:c.id,url:document.location.href,status:"__Messenger__hmLoaded"},"*")}},cb:function(a){var b;try{b=q.parse(m.get("Hm_unsent_"+c.id)||"[]")}catch(d){b=[]}var e=this.b.u?"":"&u="+encodeURIComponent(document.location.href);b.push(a.replace(/^https?:\/\//,"")+e);m.set("Hm_unsent_"+c.id,q.stringify(b))},Sa:function(a){var b;try{b=q.parse(m.get("Hm_unsent_"+c.id)||"[]")}catch(d){b=[]}if(b.length){a=
a.replace(/^https?:\/\//,"");for(var e=0;e<b.length;e++)if(a.replace(/&u=[^&]*/,"")===b[e].replace(/&u=[^&]*/,"")){b.splice(e,1);break}b.length?m.set("Hm_unsent_"+c.id,q.stringify(b)):this.Ia()}},Ia:function(){m.remove("Hm_unsent_"+c.id)},hc:function(){var a=this,b;try{b=q.parse(m.get("Hm_unsent_"+c.id)||"[]")}catch(d){b=[]}if(b.length)for(var f=function(b){e.log(g.ea+"//"+b,function(b){a.Sa(b)})},k=0;k<b.length;k++)f(b[k])},La:function(){return Math.round(+new Date/1E3)%65535}};return new b})();
(function(){var b=mt.event,a=mt.lang,e=h.w;if(c.kbtrk&&"undefined"!==typeof h.c){h.c.b.kb=a.va(h.c.b.kb)?h.c.b.kb:0;var d=function(){h.c.b.et=85;h.c.b.ep=h.c.b.kb;h.c.i()};b.d(document,"keyup",function(){h.c.b.kb++});b.d(window,"unload",function(){d()});setInterval(d,e.Ub)}})();var C=h.w,D=h.load;c.pt&&D([C.protocol,"//ada.baidu.com/phone-tracker/insert_bdtj?sid=",c.pt].join(""));
(function(){var b=mt.h,a=mt.lang,e=mt.event,d=mt.o;if("undefined"!==typeof h.c&&(c.med||(!b.ua||7<b.Bb())&&c.cvcc)){var f,l,k,m,q=function(a){if(a.item){for(var b=a.length,d=Array(b);b--;)d[b]=a[b];return d}return[].slice.call(a)},y=function(a,b){for(var d in a)if(a.hasOwnProperty(d)&&b.call(a,d,a[d])===w)return w},t=function(b,e){var g={};g.n=f;g.t="clk";g.v=b;if(e){var l=e.getAttribute("href"),m=e.getAttribute("onclick")?""+e.getAttribute("onclick"):u,n=e.getAttribute("id")||"";k.test(l)?(g.sn=
"mediate",g.snv=l):a.e(m,"String")&&k.test(m)&&(g.sn="wrap",g.snv=m);g.id=n}h.c.b.et=86;h.c.b.ep=d.stringify(g);h.c.i();for(g=+new Date;400>=+new Date-g;);};if(c.med)l="/zoosnet",f="swt",k=/swt|zixun|call|chat|zoos|business|talk|kefu|openkf|online|\/LR\/Chatpre\.aspx/i,m={click:function(){for(var a=[],b=q(document.getElementsByTagName("a")),b=[].concat.apply(b,q(document.getElementsByTagName("area"))),b=[].concat.apply(b,q(document.getElementsByTagName("img"))),d,e,f=0,g=b.length;f<g;f++)d=b[f],e=
d.getAttribute("onclick"),d=d.getAttribute("href"),(k.test(e)||k.test(d))&&a.push(b[f]);return a}};else if(c.cvcc){l="/other-comm";f="other";k=c.cvcc.q||r;var n=c.cvcc.id||r;m={click:function(){for(var a=[],b=q(document.getElementsByTagName("a")),b=[].concat.apply(b,q(document.getElementsByTagName("area"))),b=[].concat.apply(b,q(document.getElementsByTagName("img"))),d,e,f,g=0,l=b.length;g<l;g++)d=b[g],k!==r?(e=d.getAttribute("onclick"),f=d.getAttribute("href"),n?(d=d.getAttribute("id"),(k.test(e)||
k.test(f)||n.test(d))&&a.push(b[g])):(k.test(e)||k.test(f))&&a.push(b[g])):n!==r&&(d=d.getAttribute("id"),n.test(d)&&a.push(b[g]));return a}}}if("undefined"!==typeof m&&"undefined"!==typeof k){var x;l+=/\/$/.test(l)?"":"/";var g=function(b,d){if(x===d)return t(l+b,d),w;if(a.e(d,"Array")||a.e(d,"NodeList"))for(var e=0,f=d.length;e<f;e++)if(x===d[e])return t(l+b+"/"+(e+1),d[e]),w};e.d(document,"mousedown",function(b){b=b||window.event;x=b.target||b.srcElement;var d={};for(y(m,function(b,e){d[b]=a.e(e,
"Function")?e():document.getElementById(e)});x&&x!==document&&y(d,g)!==w;)x=x.parentNode})}}})();(function(){var b=mt.f,a=mt.lang,e=mt.event,d=mt.o;if("undefined"!==typeof h.c&&a.e(c.cvcf,"Array")&&0<c.cvcf.length){var f={$a:function(){for(var a=c.cvcf.length,d,m=0;m<a;m++)(d=b.Ja(decodeURIComponent(c.cvcf[m])))&&e.d(d,"click",f.pa())},pa:function(){return function(){h.c.b.et=86;var a={n:"form",t:"clk"};a.id=this.id;h.c.b.ep=d.stringify(a);h.c.i()}}};b.$b(function(){f.$a()})}})();
(function(){var b=mt.event,a=mt.o;if(c.med&&"undefined"!==typeof h.c){var e={n:"anti",sb:0,kb:0,clk:0},d=function(){h.c.b.et=86;h.c.b.ep=a.stringify(e);h.c.i()};b.d(document,"click",function(){e.clk++});b.d(document,"keyup",function(){e.kb=1});b.d(window,"scroll",function(){e.sb++});b.d(window,"load",function(){setTimeout(d,5E3)})}})();c.spa!==r&&"1"===String(c.spa)&&(window._hmt=window._hmt||[],window._hmt.push(["_requirePlugin","UrlChangeTracker"]));})();
