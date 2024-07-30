(()=>{"use strict";(()=>{let t=0;function e(t,e){return t.getBoundingClientRect().top<=e}function n(t,e){let n,s,o=!1;return function r(){if(o)return n=arguments,void(s=this);t.apply(this,arguments),o=!0,setTimeout((function(){o=!1,n&&(r.apply(s,n),n=s=null)}),e)}}function s(t,n,s){let o={};t.forEach((r=>{if(!r.classList.contains("scrolled-in")){if(e(r,n)){const t=r.classList[0];if(t in o?(setTimeout((()=>{r.classList.add("scrolled-in")}),100*o[t]),o[t]+=1):(o[t]=1,r.classList.add("scrolled-in")),r.classList.contains("promo__statistics")&&r.querySelectorAll(".promo__statistics-description").forEach((t=>{!function(t,e){const n=parseInt(t.innerHTML.replace(" ",""),10);let s;const o=e=>{void 0===s&&(s=e);const r=parseFloat(Math.min((e-s)/2500,1).toFixed(2));t.innerHTML=Math.floor(r*n).toLocaleString("ru-RU",{useGrouping:!0})+"+",r<1&&window.requestAnimationFrame(o)};window.requestAnimationFrame(o)}(t)})),r.classList.contains("animate-childs")){const t=r.children;for(let e of t)e.classList.add("scrolled-in")}}s>document.documentElement.scrollHeight-1.2*document.documentElement.clientHeight&&t[t.length-1].classList.add("scrolled-in")}}))}function o(t,e,n){const s=document.createElementNS("http://www.w3.org/2000/svg","polygon");return s.setAttribute("class","steps__track-arrow"),s.setAttribute("style","opacity: 0;"),s.setAttribute("points",`${t-n/2},${e} ${t},${e+Math.sqrt(3)/2*n} ${t+n/2},${e}`),s}let r={startY:"",endY:"",pathLength:""};function i(t,e,n,s,o){const r=document.querySelector(".steps__main-track"),i=n-e;let l=s*(1-(window.scrollY-t)/i);l<0&&(l=0),r.setAttribute("stroke-dashoffset",l),function(t,e,n,s){const o=n-s,r=e.getPointAtLength(0),i=e.getPointAtLength(o),l=t.getAttribute("points").match(/\S+,(\S+)\s.\S+,(\S+)/),a=e.getPointAtLength(o+(l[2]-l[1])),c=(Math.atan2(a.y-i.y,a.x-i.x)-Math.atan2(0,i.x+1))*(180/Math.PI)-90;t.setAttribute("transform",`translate(${i.x-r.x}, ${i.y-r.y}) rotate(${c} ${r.x} ${r.y})`),t.setAttribute("style","opacity: 1;")}(document.querySelector(".steps__track-arrow"),r,s,l)}function l(t,e,n,s,o){const r=document.querySelector(".steps__track-mask"),i=n-e;let l=-s*((window.scrollY-t)/i);l<-s&&(l=-s),r.setAttribute("stroke-dashoffset",l),function(t,e,n,s){const o=-n,r=e.getPointAtLength(0),i=e.getPointAtLength(o);t.setAttribute("transform",`translate(${i.x-r.x}, ${i.y-r.y})`),t.setAttribute("style","opacity: 1;")}(document.querySelector(".steps__track-arrow"),r,l,document.querySelector(".steps__main-track"))}const a=document.querySelectorAll("picture"),c=(t,e)=>{t.forEach((t=>{t.isIntersecting&&(function(t){const e=t.querySelector("img"),n=t.querySelectorAll("source");e.onload=()=>{t.dataset.loaded=!0},e.onerror=()=>{t.dataset.loaded=!1},n.forEach((t=>{t.srcset=t.dataset.srcset,t.sizes=t.dataset.sizes})),e.srcset=e.dataset.srcset,e.sizes=e.dataset.sizes;const s=e.dataset.srcset.split(" ");e.src=s[s.length-2]}(t.target),e.unobserve(t.target))}))},d=`${document.querySelector(".page-header").offsetHeight}px`;document.querySelector(":root").style.setProperty("--header-hight",`${d}`);const u=document.querySelector(".page-header__burger-button"),p=document.querySelector(".slider__slides-list"),h=parseInt(getComputedStyle(document.querySelector(".hero__slider")).gridTemplateColumns.split(" ")[0],10),m=parseInt(getComputedStyle(p).gap),y=p.children,g=y[0].offsetWidth,f=2*g+m-h,_=g+m,b="0.3s",S="translate(-12.5%, calc(12.5% - 16px)) scale(1.25)",w=document.querySelector(".slider-button_left"),A=document.querySelector(".slider-button_right");let $=!1;const L=document.querySelector(".feedback__list"),k=L.children,q=document.querySelector(".feedback >.slider-button_left"),x=document.querySelector(".feedback > .slider-button_right");let E=!1;const C=document.querySelector(".page-main").offsetWidth;!function(){const t=new IntersectionObserver(c);a.forEach((e=>{t.observe(e)}))}(),window.addEventListener("load",(()=>{const a=document.querySelector(".preloader");a.ontransitionend=()=>{a.ontransitionend=null,document.documentElement.classList.remove("stop-scroll"),a.remove(),C<=1300?function(){const t=document.querySelector(".steps"),e=parseInt(window.getComputedStyle(t.querySelector(".steps__list")).getPropertyValue("gap")),n=t.getBoundingClientRect().x,s=t.getBoundingClientRect().y+window.scrollY;let i=[];const l=[],a=document.querySelector(".marker").getBoundingClientRect();i.push(a);const c=a.height/2-5,d=document.querySelector(".steps__item:last-child >.marker").getBoundingClientRect();i.push(d),i.forEach((t=>{l.push({x:t.x-n+t.width/2,y:t.y-s+t.height/2+window.scrollY})})),r.startY=l[0].y+s,r.endY=l[l.length-1].y+s,console.log(n,s,i,l);const u="http://www.w3.org/2000/svg",p=document.createElementNS(u,"svg");p.setAttribute("class","steps__track");const h=document.createElementNS(u,"path");let m=`M ${l[0].x} ${l[0].y} L ${l[1].x} ${l[1].y}`;const y=document.querySelectorAll(".steps__item");let g=[0];const f=e-c;y.forEach(((t,e)=>{const n=parseInt(window.getComputedStyle(t).getPropertyValue("height"));0===e?g.push(n):g.push(n+c),g.push(f)})),h.setAttribute("class","steps__main-track"),h.setAttribute("d",m),h.setAttribute("fill","none"),r.pathLength=Math.round(h.getTotalLength()),h.setAttribute("stroke-dasharray",g.join(" ")),p.appendChild(h);const _=document.createElementNS(u,"path");_.setAttribute("class","steps__track-mask"),_.setAttribute("d",m),_.setAttribute("fill","none"),_.setAttribute("stroke-dasharray",r.pathLength),_.setAttribute("stroke-dashoffset",0),p.appendChild(_),p.appendChild(o(l[0].x,l[0].y,15));const b=document.createElementNS(u,"path");b.setAttribute("class","steps__triangle-mask"),b.setAttribute("d",m),b.setAttribute("fill","none"),b.setAttribute("stroke-width","20px"),b.setAttribute("stroke-dasharray",g.slice(1).join(" ")),b.setAttribute("stroke-dashoffset",0),p.appendChild(b),t.appendChild(p)}():function(){const t=document.querySelector(".steps"),e=t.getBoundingClientRect().x,n=t.getBoundingClientRect().y+window.scrollY,s=document.querySelectorAll(".marker"),i=[];s.forEach((t=>{const s=t.getBoundingClientRect();let o={};o.x=s.x-e+s.width/2,o.y=s.y-n+s.height/2+window.scrollY,i.push(o)})),r.startY=i[0].y+n,r.endY=i[i.length-1].y+n;const l="http://www.w3.org/2000/svg",a=document.createElementNS(l,"svg");a.setAttribute("class","steps__track");const c=document.createElementNS(l,"path");c.setAttribute("class","steps__main-track");let d=`M ${i[0].x} ${i[0].y}`;for(let t=1;t<i.length;t++)d+=`C${i[t-1].x} ${i[t-1].y+533} ${i[t].x} ${i[t].y-533} ${i[t].x} ${i[t].y}`;c.setAttribute("d",d),c.setAttribute("fill","none"),r.pathLength=Math.round(c.getTotalLength()),c.setAttribute("stroke-dasharray",r.pathLength),c.setAttribute("stroke-dashoffset",r.pathLength),a.appendChild(c),a.appendChild(o(i[0].x,i[0].y,15)),t.appendChild(a)}(),C<=1250&&function(t){u.addEventListener("click",(e=>{console.log("клик на кнопку в обработчике кнопки");const n=t<=680?document.querySelector(".page-header__menu"):document.querySelector(".page-header__nav");document.addEventListener("click",(t=>{console.log("событие click в обработчике документа"),t.target.closest(".page-header__burger-button")||n.classList.contains(`${n.classList[0]}_open`)?(u.classList.toggle("page-header__burger-button_open"),document.documentElement.classList.toggle("stop-scroll"),n.classList.toggle(`${n.classList[0]}_open`),t.target.closest(".page-header__nav-list")&&(console.log("клик на ссылку в меню"),t.preventDefault(),document.querySelector(t.target.getAttribute("href")).scrollIntoView({behavior:"smooth"}))):console.log("клик не на кнопку при закрытом меню")}))}),{once:!0})}(C),C>1200&&function(){const t=k[0].offsetWidth,e=L.offsetWidth,n=e/100*parseFloat(getComputedStyle(L).gap),s=Math.floor(e/(t+n)),o=4*t+3*n;L.style.transform=`translateX(${-o}px)`,x.onclick=()=>{E||(E=!0,function(t,e,n){L.ontransitionend=()=>{L.ontransitionend=null,L.style.transition="none";for(let e=0;e<t;e++)L.append(k[0]);L.style.transform=`translateX(${-e}px)`,E=!1},L.style.transition="1s",L.style.transform=`translateX(${2*-e-n}px)`}(s,o,n))},q.onclick=()=>{E||(E=!0,function(t,e,n){L.ontransitionend=()=>{L.ontransitionend=null,L.style.transition="none";for(let e=0;e<t;e++)L.prepend(L.lastElementChild);L.style.transform=`translateX(${-e}px)`,E=!1},L.style.transition="1s",L.style.transform=`translateX(${n}px)`}(s,o,n))}}(),C>800&&(p.style.transform=`translateX(${-f}px)`,y[0].style.opacity=0,y[1].style.transform=S,w.onclick=()=>{$||($=!0,function(t,e){t.ontransitionend=()=>{t.ontransitionend=null,t.style.transition="none",y[1].removeAttribute("style"),t.lastElementChild.style.opacity=0,t.prepend(t.lastElementChild),t.style.transform=`translateX(${-f}px)`,$=!1},t.style.transition=b,t.style.transform=`translateX(${e-f}px)`,y[0].style.transition=b,y[0].style.opacity=1,y[0].style.transform=S,y[0].style.transitionTimingFunction="ease-in",y[1].style.transition=b,y[1].style.transform="translate(0) scale(1)",y[1].style.transitionTimingFunction="cubic-bezier(0,.75,.02,1)"}(p,_))},A.onclick=()=>{$||($=!0,function(t,e){t.ontransitionend=()=>{t.ontransitionend=null,t.style.transition="none",y[0].removeAttribute("style"),t.append(y[0]),t.style.transform=`translateX(${-f}px)`,$=!1},t.style.transition=b,t.style.transform=`translateX(${-e-f}px)`,y[1].style.transition=b,y[1].style.opacity=0,y[1].style.transform="translate(0)",y[2].style.transition=b,y[2].style.transform=S,y[2].style.transitionTimingFunction="cubic-bezier(.72,.07,.95,.7)"}(p,_))});const c=document.querySelectorAll(".animate"),d=.8*document.documentElement.clientHeight;s(c,d);const h=C<=1300?l:i,m=n((()=>{const o=function(){let e={position:window.scrollY,direction:""};return e.direction=e.position>t?"down":"up",t=e.position,e}();"down"===o.direction&&n(s(c,d,o.position),100),e(document.querySelector(".line-start"),d)&&(console.log("Сработал start-lite"),h(r.startY-d,r.startY,r.endY,r.pathLength))}),50);window.addEventListener("scroll",m)},a.classList.add("preloader_hide")}))})()})();