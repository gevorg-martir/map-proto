import{m as e}from"./vendor.0b109b73.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const o=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,c)=>{const s=new URL(e,o);if(self[n].moduleMap[s])return t(self[n].moduleMap[s]);const r=new Blob([`import * as m from '${s}';`,`${n}.moduleMap['${s}']=m;`],{type:"text/javascript"}),p=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){c(new Error(`Failed to import: ${e}`)),a(p)},onload(){t(self[n].moduleMap[s]),a(p)}});document.head.appendChild(p)})),self[n].moduleMap={}}}("./");const n="pk.eyJ1IjoiZ2V2b3JnLW1hcnRpciIsImEiOiJja25ocWJ6emkwMDA4MnF1d20xM2J1MHV6In0.UViekLwm6Om2HQAFQ3nJ_A",t=[-73.96879951090524,40.77796727433872];(()=>{document.querySelector("#app").innerHTML='\n    <div id="map"></div>\n    <div class="info"><div>\n  ',e.accessToken=n;const o=new e.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:t,zoom:13}),a=async(e,t)=>{const o=await(async(e,t)=>await(await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e},${t}.json?access_token=${n}`)).json())(e,t),{features:a}=o;document.querySelector(".info").innerHTML=`\n      <h3>Address</h3>\n      <p>${a[0].address}</p>\n      <h3>Text</h3>\n      <p>${a[0].text}</p>\n      ${a[0].context.map((e=>`\n        <h3>${e.id.split(".")[0]}</h3>\n        <p>${e.text}</p>\n      `)).toString().replaceAll(",","")}\n      <textarea>${a[0].place_name}</textarea>\n    `},c=((n,t,a="#FFFFFF")=>new e.Marker({color:a,draggable:!0}).setLngLat([n,t]).addTo(o))(t[0],t[1]);a(t[0],t[1]),c.on("dragend",(async e=>{const n=e.target.getLngLat();a(n.lng,n.lat)})),o.on("click",(async e=>{const{lngLat:n}=e;c.setLngLat(n),a(n.lng,n.lat)}))})();