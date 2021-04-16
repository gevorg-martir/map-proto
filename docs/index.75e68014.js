import{m as e}from"./vendor.0b109b73.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const a=new URL(e,location),o=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,s)=>{const c=new URL(e,a);if(self[n].moduleMap[c])return t(self[n].moduleMap[c]);const r=new Blob([`import * as m from '${c}';`,`${n}.moduleMap['${c}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){s(new Error(`Failed to import: ${e}`)),o(i)},onload(){t(self[n].moduleMap[c]),o(i)}});document.head.appendChild(i)})),self[n].moduleMap={}}}("./");const n="pk.eyJ1IjoiZ2V2b3JnLW1hcnRpciIsImEiOiJja25ocWJ6emkwMDA4MnF1d20xM2J1MHV6In0.UViekLwm6Om2HQAFQ3nJ_A",t=[-73.96879951090524,40.77796727433872];(a=>{a.innerHTML='\n    <div id="map"></div>\n    <div class="bar">\n      <div class="info"></div>\n      <button class="search">Search</button>\n    </div>\n  ';const o=e=>{var n,t;document.querySelector(".info").innerHTML=`\n      ${(null==e?void 0:e.address)||(null==(n=e.properties)?void 0:n.address)?`\n        <h3>Address</h3>\n        <p>${(null==e?void 0:e.address)||(null==(t=e.properties)?void 0:t.address)}</p>\n      `:""}\n      <h3>Text</h3>\n      <p>${e.text}</p>\n      ${e.context.map((e=>`\n        <h3>${e.id.split(".")[0]}</h3>\n        <p>${e.text}</p>\n      `)).toString().replaceAll(",","")}\n      <textarea>${e.place_name}</textarea>\n    `},s=async(e,t)=>{const a=await(async(e,t)=>await(await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e},${t}.json?access_token=${n}`)).json())(e,t),{features:s}=a;o(s[0])};e.accessToken=n;const c=new e.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:t,zoom:13}),r=((n,t,a="#FFFFFF")=>new e.Marker({color:a,draggable:!0}).setLngLat([n,t]).addTo(c))(t[0],t[1]);s(t[0],t[1]),r.on("dragend",(async e=>{const n=e.target.getLngLat();s(n.lng,n.lat)})),c.on("click",(async e=>{const{lngLat:n}=e;r.setLngLat(n),s(n.lng,n.lat)})),document.querySelector(".search").addEventListener("click",(async()=>{(async e=>{const t=await(await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.toLowerCase()}.json?access_token=${n}`)).json(),{features:a}=t;c.setCenter(a[0].center),r.setLngLat(a[0].center),o(a[0])})(document.querySelector(".info textarea").value)}))})(document.querySelector("#app"));
