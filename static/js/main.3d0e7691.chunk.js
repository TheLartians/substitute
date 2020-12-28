(this.webpackJsonpsubstitute=this.webpackJsonpsubstitute||[]).push([[0],{103:function(e,t){},105:function(e,t){},112:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(1),i=n.n(o),c=n(29),s=(n(69),n(4)),a=n(49),u=a.default,l=a.ThemeProvider,d=a.useTheme,f={blue:"rgb(98,135,161)",black:"black",white:"white",dark:"#111111",darkBlue:"#0a6bab",lightGray:"#CCCCCC",red:"red"},b={palette:f,colors:{foreground:f.lightGray,background:f.dark},elementSizes:{icon:44,scrubbar:30,scrubCursor:2,content:1024,logo:150},spacings:{xxs:1,xs:2,s:5,m:10,ml:20,l:50,xl:100,xxl:250},fontSizes:{xxs:10,xs:12,s:14,m:16,ml:20,l:24,xl:32,xxl:48},fontWeights:{normal:"normal",bold:"bold",lighter:"lighter"},breakpoints:{mobileM:750,mobileS:350}},h=function(e,t){return t&&"".concat(e.spacings[t],"px")};function j(e,t){for(var n=0,r=e.length;n<r;){var o=Math.floor((r+n)/2);t(e[o])?r=o:n=o+1}return n}var v=function(e){return Math.abs(e)<10?"0".concat(e):e.toString()},g=function(e){return{padding:h(e.theme,e.padding),paddingTop:h(e.theme,e.verticalPadding),paddingBottom:h(e.theme,e.verticalPadding),paddingLeft:h(e.theme,e.horizontalPadding),paddingRight:h(e.theme,e.horizontalPadding),margin:h(e.theme,e.margin),marginLeft:h(e.theme,e.horizontalMargin),marginRight:h(e.theme,e.horizontalMargin),marginTop:h(e.theme,e.verticalMargin),marginBottom:h(e.theme,e.verticalMargin)}},O=function(e,t,n,r){return"rgba(0,0,0,".concat(n,") 0px ").concat(h(r,e)," ").concat(h(r,t))},x=u("span")((function(e){var t,n;return[g(e),{fontWeight:e.theme.fontWeights[null!==(t=e.fontWeight)&&void 0!==t?t:"normal"],color:e.theme.colors.foreground,fontSize:e.theme.fontSizes[null!==(n=e.fontSize)&&void 0!==n?n:"m"]}]})),m=u("span")((function(e){return{fontWeight:e.theme.fontWeights.bold}})),p=u("span")((function(e){return{fontFamily:"monospace"}})),k=(u(x)((function(e){var t,n,r;return{textShadow:O(null!==(t=e.shadowOffset)&&void 0!==t?t:"xs",null!==(n=e.shadowSpread)&&void 0!==n?n:"xs",null!==(r=e.shadowOpacity)&&void 0!==r?r:.5,e.theme)}})),n(53)),y=n(54),w=(n(63),function(e){var t,n=!0;return t=requestAnimationFrame((function r(){n&&(e(),t=requestAnimationFrame(r))})),function(){n=!1,cancelAnimationFrame(t)}}),S=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;Object(k.a)(this,e),this.t0=t,this.v=n,this.t=void 0,this.running=!1,this.stopCallback=void 0,this.observers=new Set,this.t=t}return Object(y.a)(e,[{key:"broadcast",value:function(){var e=this.t;this.observers.forEach((function(t){return t(e)}))}},{key:"start",value:function(){var e=this;if(!this.running){this.running=!0;var t=Date.now();this.stopCallback=w((function(){e.t=(Date.now()-t)*e.v+e.t0,e.broadcast()}))}}},{key:"pause",value:function(){var e,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];null===(e=this.stopCallback)||void 0===e||e.call(this),this.stopCallback=void 0,this.running=!1,this.t0=this.t,t&&this.broadcast()}},{key:"set",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.v;this.t=e,this.v=t,this.running?(this.pause(!1),this.start()):(this.t0=e,this.broadcast())}},{key:"observe",value:function(e){var t=this;return this.observers.add(e),function(){t.observers.delete(e)}}}]),e}(),C=Object(o.createContext)(new S),E=C.Provider,z=function(){return Object(o.useContext)(C)},R=Object(o.memo)((function(){var e=z(),t=Object(o.useState)(e.t),n=Object(s.a)(t,2),i=n[0],c=n[1];return Object(o.useEffect)((function(){return e.observe(c)}),[e]),Object(r.jsx)(x,{fontSize:"m",children:Object(r.jsxs)(p,{children:[v(Math.floor(i/36e5)),":",v(Math.floor(i/6e4%60)),":",v(Math.floor(i/1e3%100))]})})})),M=n(55),L=n(5),D=u("div")((function(e){return Object(L.a)(Object(L.a)({},g(e)),{},{display:"flex",flexDirection:"column"})})),A=u(D)((function(e){return{backgroundColor:e.theme.colors.background,borderRadius:h(e.theme,e.borderRadius),overflow:"hidden"}})),N=(u(A)((function(e){var t,n,r;return{boxShadow:O(null!==(t=e.shadowOffset)&&void 0!==t?t:"xs",null!==(n=e.shadowSpread)&&void 0!==n?n:"xs",null!==(r=e.shadowOpacity)&&void 0!==r?r:.5,e.theme)}})),function(e){var t=e.max,n=d(),i=n.palette,c=n.elementSizes,a=z(),u=Object(o.useState)(0),l=Object(s.a)(u,2),f=l[0],b=l[1];return Object(o.useEffect)((function(){return a.observe((function(e){return b(e/t)}))}),[a,t]),Object(r.jsx)("div",{style:{position:"absolute",left:"".concat(100*f,"%"),top:0,height:"100%",width:c.scrubCursor,backgroundColor:i.red}})}),I=Object(o.memo)((function(e){var t,n,i=e.cues,c=d(),s=c.colors,a=c.elementSizes,u=null!==(t=null===(n=i[i.length-1])||void 0===n?void 0:n.end)&&void 0!==t?t:0,l=Object(o.useRef)(null),f=z(),b=Object(o.useCallback)((function(e){e.width=e.offsetWidth,e.height=e.offsetHeight;var t=e.getContext("2d");if(t){t.clearRect(0,0,e.width,e.height);var n=e.width/u;t.fillStyle=s.foreground;var r,o=Object(M.a)(i);try{for(o.s();!(r=o.n()).done;){var c=r.value;t.fillRect(c.start*n,0,(c.end-c.start)*n,e.height)}}catch(a){o.e(a)}finally{o.f()}}}),[i,s,u]);return Object(o.useEffect)((function(){var e=l.current;if(e){b(e);var t=function(t){if(1===t.buttons){var n=e.getBoundingClientRect(),r=(t.clientX-n.left)/e.offsetWidth;f.set(r*u)}},n=function(t){var n=e.getBoundingClientRect(),r=(t.touches[0].clientX-n.left)/e.offsetWidth;f.set(Math.min(Math.max(r,0),1)*u)},r=function(){return b(e)};return window.addEventListener("resize",r),e.addEventListener("mousemove",t),e.addEventListener("mousedown",t),e.addEventListener("touchmove",n),e.addEventListener("touchstart",n),function(){window.removeEventListener("resize",r),e.removeEventListener("mousemove",t),e.removeEventListener("mousedown",t),e.removeEventListener("touchstart",n),e.removeEventListener("touchmove",n)}}}),[b,f,u]),Object(r.jsxs)(A,{borderRadius:"m",style:{position:"relative",width:"100%",overflow:"hidden",cursor:"pointer"},children:[Object(r.jsx)("canvas",{height:a.scrubbar,style:{display:"block"},ref:l}),Object(r.jsx)(N,{max:u})]})})),T=n(8),B=n.n(T),P=function(e,t){var n=e.foreground,r=e.background,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;switch(t){case"NONE":return{background:r,foreground:n};case"INVERT":return{background:n,foreground:r};case"DARKEN_BACKGROUND":return{foreground:n,background:B()(r).darken(.25*o).desaturate(.5*o).toString()};case"LIGHTEN_BACKGROUND":return{foreground:n,background:B()(r).lighten(.4*o).saturate(.1*o).toString()};case"MAKE_TRANSPARENT":return{foreground:B()(n).alpha(.5*o).toString(),background:B()(r).alpha(.5*o).toString()}}},W=function(e){var t=e.children,n=e.mode,i=void 0===n?"INVERT":n,c=e.strength,s=void 0===c?1:c,a=d(),u=Object(o.useMemo)((function(){return Object(L.a)(Object(L.a)({},a),{},{colors:P(a.colors,i,s)})}),[a,i,s]);return Object(r.jsx)(l,{theme:u,children:t})},F=n(20);function G(){var e=Object(F.a)(["\n  transition: 0.25s;\n  opacity: ",";\n  pointer-events: ",";\n  :hover {\n    cursor: pointer;\n    color: ",";\n  }\n  :active {\n    transition: 0s;\n    color: ",";\n  }\n"]);return G=function(){return e},e}function K(){var e=Object(F.a)(["\n  transition: 0.25s;\n  border: none;\n  border-radius: ",";\n  outline-width: 0;\n  background-color: ",";\n  opacity: ",";\n  pointer-events: ",";\n  box-shadow: ",";\n  :hover {\n    cursor: pointer;\n    background-color: ",";\n  }\n  :active {\n    transition: 0s;\n    background-color: ",";\n  }\n"]);return K=function(){return e},e}var U=function(e){var t=B()(e);return t.isDark()?t.lighten(.1).string():t.darken(.1).string()},_=function(e){var t=B()(e);return t.isDark()?t.lighten(.25).string():t.darken(.25).string()},H=u(x).attrs({as:"button"})(K(),(function(e){return h(e.theme,"m")}),(function(e){return e.theme.colors.background}),(function(e){return e.disabled?.5:1}),(function(e){return e.disabled?"none":"initial"}),(function(e){return O("xxs","xs",.5,e.theme)}),(function(e){return U(e.theme.colors.background)}),(function(e){return _(e.theme.colors.background)})),V=u(x)(G(),(function(e){return e.disabled?.5:1}),(function(e){return e.disabled?"none":"initial"}),(function(e){return U(e.theme.colors.foreground)}),(function(e){return _(e.theme.colors.foreground)})),q=n(15),J=function(e){var t=e.cues,n=Object(o.useState)(""),i=Object(s.a)(n,2),c=i[0],a=i[1],u=z();return Object(o.useEffect)((function(){return u.observe((function(e){var n=t[j(t,(function(t){return e<t.end}))];a(n&&e>=n.start?n.text:"")}))}),[u,t]),Object(r.jsx)(x,{style:{textAlign:"center"},fontSize:"xxl",children:c})},X=n(56),Q=n.n(X),Y=n(31),Z=function(e){var t=e.children,n=e.background,o=e.foreground,i=d(),c=Object(L.a)(Object(L.a)({},i),{},{colors:Object(L.a)(Object(L.a)({},i.colors),{},{background:n?i.palette[n]:i.colors.background,foreground:o?i.palette[o]:i.colors.foreground})});return Object(r.jsx)(l,{theme:c,children:t})},$=u(x).attrs((function(e){var t;return{as:null!==(t=e.as)&&void 0!==t?t:"input"}}))((function(e){return{background:"transparent",border:"none",outlineWidth:0,color:e.theme.colors.foreground}})),ee=function(e){var t=e.speed,n=z(),i=Object(o.useState)(!1),c=Object(s.a)(i,2),a=c[0],u=c[1],l=Object(o.useState)(""),f=Object(s.a)(l,2),b=f[0],h=f[1],j=Object(o.useState)(t),v=Object(s.a)(j,2),g=v[0],O=v[1],x=d(),m=Object(o.useRef)(null);return Object(o.useEffect)((function(){g!==t&&(O(t),u(!1))}),[g,t]),Object(o.useEffect)((function(){var e=m.current;if(e){e.style.width="".concat(e.scrollWidth,"px");var t=function(e){if("Enter"===e.key){var t=Number.parseFloat(b);isFinite(t)&&n.set(n.t,t),u(!1)}};return e.addEventListener("keyup",t),function(){return e.removeEventListener("keyup",t)}}}),[b,n]),a?Object(r.jsx)($,{ref:m,style:{fontFamily:"monospace",width:3*x.fontSizes.m},onChange:function(e){h(e.currentTarget.value)},value:b}):Object(r.jsx)(p,{onClick:function(){u(!0),h(t.toPrecision(4))},children:t.toPrecision(4)})},te=u(D).attrs({verticalMargin:"m",horizontalMargin:"m"})((function(e){return{paddingLeft:"env(safe-area-inset-left)",paddingRight:"env(safe-area-inset-right)",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)"}})),ne=function(e){var t=e.subtitles,n=e.close,i=z(),c=Object(o.useState)(i.running),a=Object(s.a)(c,2),u=a[0],l=a[1],d=Object(o.useState)(i.v),f=Object(s.a)(d,2),b=f[0],h=f[1],v=Object(o.useState)(!1),g=Object(s.a)(v,2),O=g[0],p=g[1],k=Object(o.useState)(!1),y=Object(s.a)(k,2),w=y[0],S=y[1],C=Object(o.useRef)(),E=Object(o.useMemo)((function(){return t.filter((function(e){return"cue"===e.type})).map((function(e){return e.data}))}),[t]);Object(o.useEffect)((function(){var e=new Q.a;return document.addEventListener("click",(function t(){document.removeEventListener("click",t,!1),e.enable()}),!1),function(){e.disable()}}),[]),Object(o.useEffect)((function(){var e=E[E.length-1].end;return i.observe((function(t){l(i.running),h(i.v),i.running&&t>=e&&i.pause()}))}),[i,E]);var M=Object(o.useCallback)((function(){if(O&&u)if(C.current){var e=(i.t-C.current[1])/(Date.now()-C.current[0]);e>0&&i.set(i.t,e)}else C.current=[Date.now(),i.t];else C.current=void 0}),[O,u,i]),L=Object(o.useCallback)((function(){i.set(i.t,1),C.current=void 0,M()}),[M,i]);Object(o.useEffect)(M,[M]);var N=Object(o.useCallback)((function(){var e=i.t,t=E[Math.min(E.length-1,j(E,(function(t){return e<t.start})))];i.set(t.start),M()}),[E,i,M]),T=Object(o.useCallback)((function(){var e=i.t,t=E[Math.max(0,j(E,(function(t){return e<t.end}))-1)];i.set(t.start),M()}),[E,i,M]);return Object(o.useEffect)((function(){var e=function(e){switch(e.key){case"ArrowLeft":T();break;case"ArrowRight":N();break;case" ":i.running?i.pause():i.start()}};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}}),[N,T,i]),Object(r.jsx)(Z,{background:w?"black":void 0,children:Object(r.jsx)(A,{style:{flex:1},children:Object(r.jsx)(te,{style:{flex:1},children:Object(r.jsxs)(D,{style:{flex:1,minHeight:w?"100vh":void 0},children:[w?Object(r.jsx)(V,{style:{alignSelf:"flex-end"},onClick:function(){return S(!1)},fontSize:"xl",children:Object(r.jsx)(Y.b,{})}):Object(r.jsxs)(D,{style:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},children:[Object(r.jsx)(V,{onClick:n,fontSize:"xl",children:Object(r.jsx)(q.a,{})}),Object(r.jsx)(V,{onClick:T,fontSize:"xl",children:Object(r.jsx)(q.c,{})}),Object(r.jsx)(V,{onClick:function(){return i.running?i.pause():i.start()},fontSize:"xl",children:u?Object(r.jsx)(q.d,{}):Object(r.jsx)(q.e,{})}),Object(r.jsx)(V,{onClick:N,fontSize:"xl",children:Object(r.jsx)(q.b,{})}),Object(r.jsx)(V,{onClick:function(){S(!0)},fontSize:"xl",children:Object(r.jsx)(Y.a,{})})]}),Object(r.jsx)(Z,{foreground:"white",children:Object(r.jsx)(D,{style:{flex:1,justifyContent:"center"},children:Object(r.jsx)(J,{cues:E})})}),!w&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(D,{verticalMargin:"m",style:{flexDirection:"row",justifyContent:"space-between"},children:[Object(r.jsx)(R,{}),Object(r.jsxs)(D,{style:{flexDirection:"row",alignItems:"center"},children:[Object(r.jsxs)(x,{children:["Speed: ",Object(r.jsx)(ee,{speed:b})]}),Object(r.jsx)(V,{horizontalMargin:"m",onClick:function(){return p(!O)},style:{textDecoration:O?void 0:"line-through"},fontSize:"s",children:Object(r.jsx)(m,{children:"Adaptive"})}),Object(r.jsx)(V,{onClick:L,fontSize:"s",children:Object(r.jsx)(m,{children:"Reset"})})]})]}),Object(r.jsx)(W,{mode:"DARKEN_BACKGROUND",children:Object(r.jsx)(I,{cues:E})})]})]})})})})},re=n(57),oe=n(62),ie=function(e){var t=Object(o.useState)(),n=Object(s.a)(t,2),i=n[0],c=n[1],a=Object(oe.a)({onDrop:function(t){c(void 0);var n=new FileReader;n.onload=function(t){try{var n;e.onLoad(Object(re.a)(null===(n=t.target)||void 0===n?void 0:n.result))}catch(i){c(String(i))}},n.readAsText(t[0])}}),u=a.getRootProps,l=a.getInputProps,d=a.isDragActive;return Object(r.jsxs)(D,{style:{alignItems:"center"},children:[Object(r.jsxs)("div",Object(L.a)(Object(L.a)({},u()),{},{children:[Object(r.jsx)("input",Object(L.a)({},l())),Object(r.jsx)(W,{mode:d?"INVERT":"LIGHTEN_BACKGROUND",strength:5,children:Object(r.jsx)(H,{padding:"ml",children:Object(r.jsx)(x,{children:Object(r.jsx)(m,{children:"Drop or select subtitle here"})})})})]})),Object(r.jsx)(Z,{foreground:"red",children:Object(r.jsx)(x,{margin:"m",children:i})})]})};function ce(){var e=Object(F.a)(["\n  color: ",";\n  text-decoration: none;\n  transition: 0.5s;\n  :hover {\n    transition: 0.5s;\n    cursor: pointer;\n    color: ",";\n    text-decoration: none;\n  }\n  :active {\n    transition: 0s;\n    color: ",";\n  }\n"]);return ce=function(){return e},e}var se=u("a")(ce(),(function(e){return e.theme.colors.foreground}),(function(e){return function(e){var t=B()(e);return t.isDark()?t.lighten(.25).string():t.darken(.25).string()}(e.theme.colors.foreground)}),(function(e){return function(e){var t=B()(e);return t.isDark()?t.lighten(.5).string():t.darken(.5).string()}(e.theme.colors.foreground)})),ae=n.p+"static/media/icon.6c28fcdb.svg",ue=function(e){var t=e.setSubtitles,n=d().elementSizes;return Object(r.jsx)(A,{style:{flex:1},children:Object(r.jsx)(te,{style:{flex:1,zIndex:1},children:Object(r.jsxs)(D,{style:{flex:1,justifyContent:"space-around",alignItems:"center"},children:[Object(r.jsxs)(D,{style:{width:"100%",alignItems:"center"},children:[Object(r.jsx)("img",{width:n.logo,alt:"project logo",src:ae}),Object(r.jsxs)(x,{style:{textAlign:"center"},padding:"ml",fontSize:"xl",children:[Object(r.jsx)(m,{children:"Subs"}),"titute"]}),Object(r.jsx)(x,{style:{textAlign:"center"},fontSize:"ml",children:"An external subtitle player for the browser"})]}),Object(r.jsx)(ie,{onLoad:t}),Object(r.jsxs)(D,{style:{alignItems:"flex-start"},children:[Object(r.jsx)(x,{verticalMargin:"m",fontSize:"ml",children:Object(r.jsx)(m,{children:"Usage"})}),Object(r.jsxs)(x,{verticalMargin:"xs",children:["1. Select a subtitle file (e,g, from"," ",Object(r.jsx)(se,{href:"https://www.opensubtitles.org",children:"OpenSubtitles.org"}),")"]}),Object(r.jsx)(x,{verticalMargin:"xs",children:"2. Use the controls to synchronize the subtitles with the movie"}),Object(r.jsx)(x,{verticalMargin:"xs",children:"3. If necessary, adjust the speed or choose adaptive, to respond in real-time"})]})]})})})};var le=function(){var e=Object(o.useState)(),t=Object(s.a)(e,2),n=t[0],i=t[1],c=Object(o.useMemo)((function(){return n?new S:void 0}),[n]);return Object(r.jsx)(l,{theme:b,children:n?Object(r.jsx)(E,{value:c,children:Object(r.jsx)(ne,{close:function(){return i(void 0)},subtitles:n})}):Object(r.jsx)(ue,{setSubtitles:i})})},de=document.getElementById("root"),fe=Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(le,{})});de.hasChildNodes()?Object(c.hydrate)(fe,de):Object(c.render)(fe,de)},69:function(e,t,n){},83:function(e,t){},85:function(e,t){}},[[112,1,2]]]);
//# sourceMappingURL=main.3d0e7691.chunk.js.map