(this.webpackJsonpgpc=this.webpackJsonpgpc||[]).push([[24,39],{256:function(e,t,n){"use strict";n.d(t,"d",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"f",(function(){return d})),n.d(t,"e",(function(){return j})),n.d(t,"b",(function(){return b})),n.d(t,"c",(function(){return h})),n.d(t,"g",(function(){return O}));var c=n(5),r=n(201),a=n(334),i=n(200),o=n(88),l=n(2),s=Object(c.a)((function(e){return Object(r.a)({badge:{right:-3,top:13,border:"2px solid ".concat(e.palette.background.paper),padding:"0 4px",backgroundColor:"gray",color:"white"}})}))(a.a),u=Object(c.a)((function(e){return Object(r.a)({badge:{right:-3,top:13,border:"2px solid ".concat(e.palette.background.paper),padding:"0 4px",backgroundColor:"green",color:"white"}})}))(a.a),d=function(e){var t=Object(i.a)((function(e){return Object(r.a)({root:{flexGrow:1},paper:{padding:e.spacing(2),color:e.palette.text.secondary,minHeight:400,position:"relative"}})}))();return Object(l.jsx)("div",{className:t.root,children:Object(l.jsx)(o.a,{className:t.paper,children:e.children})})},j=function(e){var t=e.height,n=e.maxWidth,c=e.children,a=Object(i.a)((function(e){return Object(r.a)({root:{fontSize:16,padding:"0 2px",borderBottom:"2px dotted #e0e0e0",height:null!==t&&void 0!==t?t:"initial",maxWidth:null!==n&&void 0!==n?n:300,minHeight:20}})}))();return Object(l.jsx)("div",{className:a.root,children:c})},b=function(e){var t=e.align,n=e.wrap,c=e.className,a=e.children,o=Object(i.a)((function(e){return Object(r.a)({root:{textAlign:t,whiteSpace:n?"initial":"nowrap","& > ul":{margin:0,paddingInlineStart:0},"& ul ul":{padding:"20px"},"& li":{listStyle:"none",display:"inline-block",verticalAlign:"top",margin:"left"==t?"0 10px 0 0":"center"==t?"0 5px 0 5px":"0 0 0 10px"}}})}))();return Object(l.jsx)("div",{className:"".concat(o.root," ").concat(null!==c&&void 0!==c?c:""),children:Object(l.jsx)("ul",{children:a})})},h=function(e){var t=e.align,n=e.width,c=e.children,a=Object(i.a)((function(e){return Object(r.a)({root:{textAlign:null!==t&&void 0!==t?t:"left",width:n?"".concat(n,"px"):"initial"}})}))();return Object(l.jsx)("li",{className:a.root,children:c})},O=Object(i.a)((function(e){return Object(r.a)({root:{"&, & *":{cursor:"pointer !important",color:"black !important"},"&:hover *":{color:"blue !important"}}})}))},277:function(e,t,n){"use strict";var c=n(29),r=n(30);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(31)).default)(a.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=i},279:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var c=n(19),r=n(0),a=n(200),i=n(201),o=n(28),l=n(230),s=n(232),u=n(233),d=n(234),j=n(235),b=n(372),h=n(256),O=n(35),p=n(288),f=n(2),x=function(e){var t=e.onChange,n=e.period,a=Object(r.useState)(!0),i=Object(c.a)(a,2),l=i[0],s=i[1];return Object(f.jsx)(f.Fragment,{children:Object(f.jsx)(p.a,{open:l,toggle:function(){return s(!l)},initialDateRange:n,closeOnClickOutside:!1,onChange:function(e){t(new o.i(e.startDate,e.endDate))}})})},g=function(e){var t=e.title,n=e.period,a=e.onSelectionConfirmed,i=e.open,o=e.setOpen,b=Object(r.useContext)(O.c),h=Object(r.useState)(null),p=Object(c.a)(h,2),g=p[0],m=p[1],v=function(){return o(!1)};return Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(l.a,{onClose:v,open:i,disableBackdropClick:!0,disableEscapeKeyDown:!0,maxWidth:"lg",children:[Object(f.jsx)(s.a,{children:"".concat(t)}),Object(f.jsx)(u.a,{children:Object(f.jsx)("div",{style:{width:"720px"},children:Object(f.jsx)(x,{period:n,onChange:function(e){return m(e)}})})}),Object(f.jsxs)(d.a,{children:[Object(f.jsx)(j.a,{onClick:v,variant:"contained",color:"default",children:"Cancel"}),Object(f.jsx)(j.a,{onClick:function(){var e=function(){var e=[];return(null===g||void 0===g?void 0:g.IsValid)||e.push("Invalid period"),e}();e.length>0?b.snackbar.show(e,"warning"):(g&&a(g),o(!1))},variant:"contained",color:"primary",children:"Ok"})]})]})})},m=function(e){var t=e.title,n=e.period,l=e.onSelectionConfirmed,s=Object(a.a)((function(e){return Object(i.a)({root:{display:"inline-block",cursor:"pointer",padding:"8px","& *":{cursor:"pointer !important",color:"black !important"},"&:hover":{color:"gray"}}})}))(),u=Object(h.g)(),d=Object(r.useState)(!1),j=Object(c.a)(d,2),O=j[0],p=j[1],x=Object(r.useState)(n),m=Object(c.a)(x,2),v=m[0],w=m[1],S=Object(r.useState)(""),C=Object(c.a)(S,2),k=C[0],N=C[1];return Object(r.useEffect)((function(){!function(e){var t=Object(o.f)(e.startDate,e.endDate);N(t)}(v)}),[v]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("div",{onClick:function(){p(!0)},children:Object(f.jsx)(b.a,{className:"".concat(s.root," ").concat(u.root),disabled:!0,label:t,value:k})}),Object(f.jsx)(g,{title:t,period:v,onSelectionConfirmed:function(e){w(e),l(e)},open:O,setOpen:p})]})}},301:function(e,t,n){"use strict";n.r(t),n.d(t,"LandingMenu",(function(){return i}));var c=n(235),r=(n(89),n(57)),a=n(2),i=function(){var e=Object(r.b)().go;return Object(a.jsx)("div",{className:"landing-page-menu",children:Object(a.jsx)(c.a,{onClick:function(){return e("payout-report")},children:"Payout"})})};t.default=function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h3",{children:"Reports"}),Object(a.jsx)("p",{children:"Please select your task"}),Object(a.jsx)(i,{}),Object(a.jsx)("hr",{})]})}},368:function(e,t,n){"use strict";n.r(t);var c=n(19),r=n(0),a=n(46),i=n(301),o=n(14),l=n.n(o),s=n(25),u=n(200),d=n(201),j=n(337),b=n(339),h=n(257),O=n(10),p=n(57),f=n(62),x=n(235),g=n(230),m=n(35),v=n(193),w=n(238),S=n(239),C=n(229),k=n(56),N=n(277),y=n.n(N),F=n(2),A=Object(u.a)((function(e){return Object(d.a)({appBar:{position:"relative"},title:{marginLeft:e.spacing(2),flex:1}})})),D=Object(r.forwardRef)((function(e,t){return Object(F.jsx)(v.a,Object(O.a)({direction:"up",ref:t},e))})),P=function(e){e.date;var t=e.onChange,n=Object(p.c)(),a=Object(r.useState)(null),i=Object(c.a)(a,2),o=i[0],u=i[1],d=function(){var e=Object(s.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.get("".concat("http://localhost:44084/api","/gpcaccount/list"));case 2:(t=e.sent).success&&u(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){d()}),[]);var j=Object(r.useState)([]),b=Object(c.a)(j,2),O=b[0],x=b[1];return Object(F.jsx)(F.Fragment,{children:o?Object(F.jsx)(h.a,{rows:o,columns:[{field:"id",headerName:"Id",width:90},{field:"name",headerName:"Name",width:300,valueGetter:function(e){return e.row.profile.name}},{field:"accountNo",headerName:"Account No.",width:170},{field:"upline",headerName:"Upline",width:300,valueGetter:function(e){var t=e.row;return t.upline?t.upline.profile.name:"[No upline]"}}],hideFooterPagination:!0,autoHeight:!0,checkboxSelection:!0,selectionModel:O,onSelectionModelChange:function(e){x(e.selectionModel);var n=o.filter((function(t){return e.selectionModel.find((function(e){return e==t.id}))}));t(n)}}):Object(F.jsx)(f.a,{})})},M=function(e){var t=e.date,n=e.open,a=e.setOpen,i=e.onSelectionConfirmed,o=A(),u=Object(r.useContext)(m.c),d=Object(r.useState)([]),j=Object(c.a)(d,2),b=j[0],h=j[1],O=function(){return a(!1)},p=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=b.length){e.next=4;break}return e.next=3,u.msgbox.show("No item selected","Select Stocks");case 3:return e.abrupt("return");case 4:i(b),a(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(F.jsx)(F.Fragment,{children:Object(F.jsxs)(g.a,{open:n,onClose:O,fullScreen:!0,TransitionComponent:D,children:[Object(F.jsx)(w.a,{className:o.appBar,children:Object(F.jsxs)(S.a,{children:[Object(F.jsx)(C.a,{edge:"start",color:"inherit",onClick:O,"aria-label":"close",children:Object(F.jsx)(y.a,{})}),Object(F.jsx)(k.a,{variant:"h6",className:o.title,children:"Select Accounts"}),Object(F.jsx)(x.a,{onClick:O,color:"inherit",children:"Cancel"}),Object(F.jsx)(x.a,{onClick:p,color:"inherit",children:"Apply"})]})}),Object(F.jsx)(P,{date:t,onChange:function(e){return h(e)}})]})})},G=n(279),B=n(256),E=n(28),I=Object(u.a)((function(e){return Object(d.a)({root:{marginTop:16,paddingBottom:6,borderBottom:"1px dotted gray"}})})),L=function(){var e=Object(p.c)(),t=I(),n=Object(B.g)(),a=Object(r.useState)(new E.i(void 0,void 0,"month")),i=Object(c.a)(a,2),o=i[0],u=i[1],d=Object(r.useState)(null),O=Object(c.a)(d,2),x=O[0],g=O[1],m=Object(r.useState)([]),v=Object(c.a)(m,2),w=v[0],S=v[1],C=Object(r.useState)(new Date),k=Object(c.a)(C,2),N=k[0],y=k[1],A=Object(r.useState)(!1),D=Object(c.a)(A,2),P=D[0],L=D[1],H=Object(r.useState)(0),R=Object(c.a)(H,2),T=R[0],W=R[1],z=Object(r.useState)(0),J=Object(c.a)(z,2),_=J[0],K=J[1],U=Object(r.useState)(0),V=Object(c.a)(U,2),q=V[0],Q=V[1],X=Object(r.useState)(0),Y=Object(c.a)(X,2),Z=Y[0],$=Y[1],ee=function(){var t=Object(s.a)(l.a.mark((function t(n){var c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return y(new Date),t.next=3,e.post("".concat("http://localhost:44084/api","/report/payouts"),{accountNos:n,startDate:o.startDate,endDate:o.endDate});case 3:(c=t.sent).success&&g(c.data);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();Object(r.useEffect)((function(){!function(){var e=0,t=0,n=0,c=0;null===x||void 0===x||x.forEach((function(r){e+=r.psc,t+=r.gsc,n+=r.lsc,c+=r.totalCommissions})),W(e),K(t),Q(n),$(c)}()}),[x]);var te=[{field:"id",headerName:"Id",width:90},{field:"name",headerName:"Name",width:300,valueGetter:function(e){return e.row.account.profile.name}},{field:"accountNo",headerName:"Account No.",width:170,valueGetter:function(e){return e.row.account.accountNo}},{field:"rank",headerName:"Rank",width:170,valueGetter:function(e){return e.row.rank.description}},{field:"psc",headerName:"PSC (\u20b1)",width:150,headerAlign:"right",align:"right",valueFormatter:function(e){return Object(E.e)(e.row.psc)}},{field:"gsc",headerName:"GSC (\u20b1)",width:150,headerAlign:"right",align:"right",valueFormatter:function(e){return Object(E.e)(e.row.gsc)}},{field:"lsc",headerName:"LSC (\u20b1)",width:150,headerAlign:"right",align:"right",valueFormatter:function(e){return Object(E.e)(e.row.lsc)}},{field:"total",headerName:"Total (\u20b1)",width:150,headerAlign:"right",align:"right",valueFormatter:function(e){return Object(E.e)(e.row.totalCommissions)}}];return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(B.b,{children:[Object(F.jsx)("li",{children:Object(F.jsx)(G.a,{title:"Select Period",period:o,onSelectionConfirmed:function(e){return u(e)}})}),Object(F.jsx)("li",{children:Object(F.jsxs)(j.a,{children:[Object(F.jsx)(b.a,{children:"Select Accounts"}),Object(F.jsx)("div",{className:"".concat(n.root," ").concat(t.root),onClick:function(e){return L(!0)},children:0==w.length?"[No selection]":"Selected ".concat(w.length," account(s)")})]})})]}),Object(F.jsx)("br",{}),w.length>0&&Object(F.jsx)(F.Fragment,{children:x?Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)("h4",{children:"Account List"}),Object(F.jsxs)("small",{children:["As of ",Object(E.d)(N)]}),Object(F.jsxs)("div",{style:{height:400,width:"100%"},children:[Object(F.jsx)(h.a,{rows:x,columns:te,hideFooterPagination:!0,hideFooter:!0,autoHeight:!0}),Object(F.jsxs)(B.b,{children:[Object(F.jsx)(B.c,{width:712}),Object(F.jsx)(B.c,{width:140,align:"right",children:Object(F.jsx)("b",{children:Object(E.e)(T)})}),Object(F.jsx)(B.c,{width:140,align:"right",children:Object(F.jsx)("b",{children:Object(E.e)(_)})}),Object(F.jsx)(B.c,{width:140,align:"right",children:Object(F.jsx)("b",{children:Object(E.e)(q)})}),Object(F.jsx)(B.c,{width:140,align:"right",children:Object(F.jsx)("b",{children:Object(E.e)(Z)})})]})]})]}):Object(F.jsx)(f.a,{})}),Object(F.jsx)(M,{date:N,open:P,setOpen:L,onSelectionConfirmed:function(e){var t=e.map((function(e){return e.accountNo}));S(t),g(null),ee(t)}})]})};t.default=function(){var e=Object(r.useState)("index"),t=Object(c.a)(e,2),n=t[0],o=t[1],l=Object(r.useState)({}),s=Object(c.a)(l,2),u=(s[0],s[1]),d=Object(r.useContext)(a.a);return d.Add({key:"pricelists-setPageMode",dispatch:o}),d.Add({key:"pricelists-setOpenProps",dispatch:u}),Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(i.default,{}),Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)("h4",{children:"Payout"}),"index"==n&&Object(F.jsx)(L,{})]})]})}}}]);
//# sourceMappingURL=24.6e18a766.chunk.js.map