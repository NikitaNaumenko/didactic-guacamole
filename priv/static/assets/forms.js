import{r as s,m as h,j as n}from"./main.js";import{c as l}from"./button.js";import{L as f}from"./label.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:c="",children:a,iconNode:m,...d},u)=>s.createElement("svg",{ref:u,...w,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:i("lucide",c),...d},[...m.map(([x,p])=>s.createElement(x,p)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(t,e)=>{const r=s.forwardRef(({className:o,...c},a)=>s.createElement(y,{ref:a,iconNode:e,className:i(`lucide-${g(t)}`,o),...c}));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M7 2h10",key:"nczekb"}],["path",{d:"M5 6h14",key:"u2x4p"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2",key:"l0tzu3"}]],L=b("GalleryVerticalEnd",j),N=({children:t,initialValues:e={},handleSubmit:r})=>{const{data:o,setData:c,errors:a}=h(e);return n.jsx("form",{onSubmit:r,children:n.jsx(k.Provider,{value:{data:o,setData:c,errors:a},children:t})})},k=s.createContext(null),A=({name:t,children:e})=>n.jsx(C.Provider,{value:{name:t},children:e}),C=s.createContext(null),$=({className:t,children:e})=>n.jsx("div",{className:l("grid gap-2",t),children:e}),G=({className:t,htmlFor:e,...r})=>n.jsx(f,{className:l("text-gray-700 dark:text-gray-300",t),htmlFor:e,...r}),I=({className:t,error:e})=>e?n.jsx("p",{className:l("text-red-500 text-sm",t),children:e}):null;export{N as F,L as G,A as a,$ as b,G as c,I as d};
