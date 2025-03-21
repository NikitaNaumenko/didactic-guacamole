import{j as e,L as n,$ as a}from"./main.js";import{u as x,B as i}from"./button.js";import{C as m,a as c,b as l,c as h}from"./card.js";import{u as o}from"./use-current-user.js";function v({auth:j,monitor:s}){const{t}=x();return o()?e.jsxs(e.Fragment,{children:[e.jsx(n,{title:t("monitors.show")}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsxs(m,{children:[e.jsx(c,{children:e.jsxs(l,{className:"flex justify-between items-center",children:[e.jsx("span",{children:s.name}),e.jsx("span",{className:`px-2 py-1 text-xs rounded-full ${s.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:s.is_active?t("monitors.active"):t("monitors.inactive")})]})}),e.jsxs(h,{children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.description")}),e.jsx("p",{className:"mt-1 text-sm text-gray-900",children:s.description||t("monitors.no_description")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.url")}),e.jsx("p",{className:"mt-1 text-sm text-gray-900",children:s.url})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.method")}),e.jsx("p",{className:"mt-1 text-sm text-gray-900",children:s.method})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.interval")}),e.jsxs("p",{className:"mt-1 text-sm text-gray-900",children:[s.interval_seconds,"s"]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.timeout")}),e.jsxs("p",{className:"mt-1 text-sm text-gray-900",children:[s.timeout_seconds,"s"]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.expected_status")}),e.jsx("p",{className:"mt-1 text-sm text-gray-900",children:s.expected_status_code})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.retry_count")}),e.jsx("p",{className:"mt-1 text-sm text-gray-900",children:s.retry_count})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.retry_interval")}),e.jsxs("p",{className:"mt-1 text-sm text-gray-900",children:[s.retry_interval_seconds,"s"]})]}),s.body&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.body")}),e.jsx("pre",{className:"mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md overflow-x-auto",children:s.body})]}),Object.keys(s.headers).length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:t("monitors.headers")}),e.jsx("div",{className:"mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md",children:Object.entries(s.headers).map(([r,d])=>e.jsxs("div",{className:"mb-1",children:[e.jsxs("span",{className:"font-medium",children:[r,":"]})," ",d]},r))})]})]}),e.jsxs("div",{className:"mt-6 flex justify-end space-x-2",children:[e.jsx(a,{href:route("monitors.edit",s.id),children:e.jsx(i,{variant:"outline",children:t("monitors.edit")})}),e.jsx(a,{href:route("monitors.index"),children:e.jsx(i,{variant:"outline",children:t("monitors.back")})})]})]})]})})})]}):null}export{v as default};
