import{j as e,m as g}from"./main.js";import{u as f,c as o,B as w}from"./button.js";import{I as d}from"./label.js";import{G as v,F as N,a as c,b as x,c as p,d as u}from"./forms.js";function b({className:l,...t}){const{data:a,setData:n,post:h,processing:m,errors:s}=g({email:"",password:""}),{t:i}=f("translation",{keyPrefix:"auth.sign_in"});console.log(s);function j(r){r.preventDefault(),h("/sign_in")}return e.jsx("div",{className:o("flex flex-col gap-6",l),...t,children:e.jsx(N,{handleSubmit:j,initialValues:a,children:e.jsxs("div",{className:o("flex flex-col gap-6",l),...t,children:[e.jsx("div",{className:"grid gap-3",children:e.jsx(c,{name:"email",children:e.jsxs(x,{children:[e.jsx(p,{className:s.email&&"text-red-500",htmlFor:"email",children:i("email")}),e.jsx(d,{id:"email",placeholder:"email@example.com",value:a.email,className:s.email&&"border-red-500",onChange:r=>n({...a,email:r.target.value}),disabled:m})," ",e.jsx(u,{error:s.email})]})})}),e.jsx("div",{className:"grid gap-3",children:e.jsx(c,{name:"password",children:e.jsxs(x,{children:[e.jsx(p,{className:s.password&&"text-red-500",htmlFor:"password",children:i("password")}),e.jsx(d,{id:"password",type:"password",placeholder:"********",value:a.password,className:s.password&&"border-red-500",onChange:r=>n({...a,password:r.target.value}),disabled:m})," ",e.jsx(u,{error:s.password})]})})}),e.jsx(w,{type:"submit",className:"w-full",children:i("submit")})]})})})}function _(){const{t:l}=f("translation",{keyPrefix:"auth.sign_in"});return e.jsx("div",{className:"flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10",children:e.jsxs("div",{className:"flex w-full max-w-sm flex-col gap-6",children:[e.jsxs("a",{href:"#",className:"flex items-center gap-2 self-center font-medium",children:[e.jsx("div",{className:"flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground",children:e.jsx(v,{className:"size-4"})}),"Sentinel"]}),e.jsx(b,{})]})})}export{b as LoginForm,_ as default};
