(this.webpackJsonpgpc=this.webpackJsonpgpc||[]).push([[25,37],{258:function(e,t,n){"use strict";var a=n(29),c=n(30);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(n(0)),r=(0,a(n(31)).default)(i.createElement("path",{d:"M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"}),"Pageview");t.default=r},261:function(e,t,n){"use strict";var a=n(29),c=n(30);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(n(0)),r=(0,a(n(31)).default)(i.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=r},281:function(e,t,n){"use strict";n.r(t),n.d(t,"LandingMenu",(function(){return r}));var a=n(235),c=(n(89),n(57)),i=n(2),r=function(){var e=Object(c.b)().go;return Object(i.jsxs)("div",{className:"landing-page-menu",children:[Object(i.jsx)(a.a,{onClick:function(){return e("management-profiles")},children:"Profiles"}),Object(i.jsx)(a.a,{onClick:function(){return e("management-accounts")},children:"Accounts"})]})};t.default=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h3",{children:"Manage"}),Object(i.jsx)("p",{children:"Please select your task"}),Object(i.jsx)(r,{}),Object(i.jsx)("hr",{}),Object(i.jsx)("br",{})]})}},363:function(e,t,n){"use strict";n.r(t);var a=n(10),c=n(19),i=n(0),r=n(46),s=n(14),d=n.n(s),o=n(25),l=n(57),u=n(28),j=n(257),b=n(62),f=n(261),h=n.n(f),O=n(229),p=n(244),v=n(258),m=n.n(v),x=n(35),g=n(2),w=function(e){var t=e.refresh,n=Object(i.useContext)(r.a),a=Object(l.c)(),s=(Object(i.useContext)(x.c),Object(i.useState)(null)),f=Object(c.a)(s,2),v=f[0],w=f[1],C=function(){var e=Object(o.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.get("".concat("http://localhost:44084/api","/profile/list"));case 2:(t=e.sent).success&&w(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(e,t){var a,c;(null===(a=n.Get("management-profiles-setOpenProps"))||void 0===a?void 0:a.dispatch.bind(a))({data:e}),(null===(c=n.Get("management-profiles-setPageMode"))||void 0===c?void 0:c.dispatch.bind(c))(t)};Object(i.useEffect)((function(){C()}),[t]);var P=[{field:"id",headerName:"Id",width:90},{field:"fullname",headerName:"Name",width:300},{field:"nickName",headerName:"Name",width:150},{field:"genderStr",headerName:"Gender",width:150},{field:"civilStatusStr",headerName:"Civil Status",width:150},{field:"",filterable:!1,sortable:!1,disableColumnMenu:!0,flex:.3,cellClassName:"row-commands",renderCell:function(e){return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(p.a,{title:"View",children:Object(g.jsx)(O.a,{onClick:function(){return k(e.row,"view")},size:"small",children:Object(g.jsx)(m.a,{})})}),Object(g.jsx)(p.a,{title:"Edit",children:Object(g.jsx)(O.a,{onClick:function(){return k(e.row,"edit")},size:"small",children:Object(g.jsx)(h.a,{})})})]})}}];return Object(g.jsx)(g.Fragment,{children:v?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h4",{children:"Profile List"}),Object(g.jsxs)("small",{children:["As of ",Object(u.d)(t)]}),Object(g.jsx)("div",{style:{height:400,width:"100%"},children:Object(g.jsx)(j.a,{rows:v,columns:P,hideFooterPagination:!0,autoHeight:!0})})]}):Object(g.jsx)(b.a,{})})},C=n(235),k=n(303),P=n(255),M=function(e){var t=e.data,n=Object(i.useContext)(r.a),a=Object(l.c)(),c=Object(i.useContext)(x.c);if(!t)return Object(g.jsx)("div",{children:"No data provided"});var s=function(){var e=Object(o.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.processing.show(),e.next=3,a.post("".concat("http://localhost:44084/api","/profile/save"),t);case 3:(n=e.sent).success&&(c.snackbar.show("Record was successfully saved"),u(n.data)),c.processing.hide();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(e){var t,a;(null===(t=n.Get("management-profiles-setOpenProps"))||void 0===t?void 0:t.dispatch.bind(t))({data:e}),(null===(a=n.Get("management-profiles-setPageMode"))||void 0===a?void 0:a.dispatch.bind(a))("view")};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h4",{children:"Update Profile"}),Object(g.jsx)(k.a,{onSubmit:s,data:t}),Object(g.jsxs)(P.a,{children:[Object(g.jsx)(C.a,{variant:"contained",color:"default",onClick:function(){return u(t)},children:"Cancel"}),Object(g.jsx)(C.a,{variant:"contained",color:"primary",onClick:function(){var e;(null===(e=n.Get("common-profile-form-setExecSubmit"))||void 0===e?void 0:e.dispatch.bind(e))(new Date)},children:"Save"})]})]})},N=(n(42),n(256)),S=n(299),y=function(e){var t=e.data,n=Object(i.useContext)(r.a);if(!t)return Object(g.jsx)("div",{children:"No data provided"});return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h4",{children:"View Profile"}),Object(g.jsx)(N.f,{children:Object(g.jsx)(S.a,{data:t})}),Object(g.jsxs)(P.a,{children:[Object(g.jsx)(C.a,{variant:"contained",color:"default",onClick:function(){var e;(null===(e=n.Get("management-profiles-setPageMode"))||void 0===e?void 0:e.dispatch.bind(e))("list")},children:"Back to list"}),Object(g.jsx)(C.a,{variant:"contained",color:"primary",onClick:function(){var e,a;(null===(e=n.Get("management-profiles-setOpenProps"))||void 0===e?void 0:e.dispatch.bind(e))({data:t}),(null===(a=n.Get("management-profiles-setPageMode"))||void 0===a?void 0:a.dispatch.bind(a))("edit")},children:"Edit"})]})]})},G=n(281);t.default=function(){var e=Object(i.useState)("list"),t=Object(c.a)(e,2),n=t[0],s=t[1],d=Object(i.useState)({}),o=Object(c.a)(d,2),l=o[0],u=o[1],j=Object(i.useContext)(r.a);return j.Add({key:"management-profiles-setPageMode",dispatch:s}),j.Add({key:"management-profiles-setOpenProps",dispatch:u}),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(G.default,{}),"list"==n&&Object(g.jsx)(w,{refresh:new Date}),"edit"==n&&Object(g.jsx)(M,Object(a.a)({},l)),"view"==n&&Object(g.jsx)(y,Object(a.a)({},l))]})}}}]);
//# sourceMappingURL=25.e8ba29ac.chunk.js.map