(this.webpackJsonpkacp_zoom=this.webpackJsonpkacp_zoom||[]).push([[0],{147:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(21),c=a.n(s),i=(a(72),a(12)),o=a.n(i),l=a(19),u=a(5),m=a(6),p=a(11),h=a(8),d=a(7),v=a(65),b=(a(74),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.page,n=e.onPage;return r.a.createElement("div",{claasName:"navbar-item",onClick:function(){return n(a)}},t)}}]),a}(n.Component)),g=(a(75),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=(e.username,e.today,e.onPage);this.props.navItems.map((function(e){return r.a.createElement(b,Object.assign({},e,{onPage:t}))}));return r.a.createElement("header",null,r.a.createElement("h1",null,"Zoom Appointment Organizer"),r.a.createElement("nav",null),r.a.createElement("button",{className:"settings-button"}))}}]),a}(n.Component)),f=a(149),y=a(28),O=(a(76),a(77),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("label",null,this.props.label),r.a.createElement("input",{className:"login-input-field",type:this.props.type,placeholder:this.props.placeholder,name:this.props.name,value:this.props.value,size:15,onChange:this.props.onChange,autoComplete:"off"}))}}]),a}(n.Component)),j=(a(78),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("button",{type:"submit",className:"log-in-button"},this.props.text)}}]),a}(n.Component)),E=a(4),k=new function e(){Object(u.a)(this,e),Object(E.h)(this,{loading:!0,isLoggedIn:!0,username:""})},C=a(62),S=a.n(C),T=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={username:"",password:"",buttonDisabled:!1},n.handleChange=n.handleChange.bind(Object(p.a)(n)),n.doLogIn=n.doLogIn.bind(Object(p.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(p.a)(n)),n}return Object(m.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(y.a)({},e.target.name,e.target.value))}},{key:"resetForm",value:function(){this.setState({password:""})}},{key:"handleSubmit",value:function(e){e.preventDefault(),""!=this.state.username?""!=this.state.password?(this.setState({buttonDisabled:!0}),this.doLogIn()):alert("password is empty."):alert("username is empty.")}},{key:"doLogIn",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/login",{method:"post",headers:{Accept:"application/JSON","Content-Type":"application/json"},body:JSON.stringify({username:this.state.username,password:this.state.password})});case 3:return t=e.sent,e.next=6,t.json();case 6:(a=e.sent)&&a.success?(k.username=a.username,k.isLoggedIn=!0):a&&!1===a.success&&(this.resetForm(),alert(a.msg)),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0),this.resetForm();case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("img",{src:S.a}),r.a.createElement("form",{className:"input-fields",onSubmit:this.handleSubmit},r.a.createElement(O,{label:"Username:",type:"username",placeholder:"Username",name:"username",value:this.state.username,onChange:this.handleChange}),r.a.createElement(O,{label:"Password:",type:"password",placeholder:"Password",name:"password",value:this.state.password,onChange:this.handleChange}),r.a.createElement(j,{text:"Log In"})),r.a.createElement("div",{className:"account-request"}))}}]),a}(n.Component),N=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={username:"",password:""},n}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},"THIS IS LANDING PAGE")}}]),a}(n.Component),_=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=(e.date,e.time),a=e.availability;return r.a.createElement("div",{className:"time-card",time:t,availability:a},r.a.createElement("div",null,t))}}]),a}(n.Component),I=(n.Component,a(80),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.label,n=e.onChange,s=e.value,c=e.endLabel,i=this.props.options.map((function(e,t){return r.a.createElement("option",Object.assign({key:e.value},e),e.name)}));return r.a.createElement("div",{className:"select-container"},r.a.createElement("label",{className:"SelectLabel"},a),r.a.createElement("select",{className:"select-options",name:t,onChange:n,value:s},i),r.a.createElement("label",{className:"SelectLabel"},c))}}]),a}(n.Component)),w=(a(81),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.date,a=e.purpose,n=e.startTime,s=e.endTime,c=e.zoom_username,i=e.join_url,o=e.start_url,l=e.meeting_id,u=e.onStart,m=e.onDelete,p=e.onEmailShare;e.onKakaoTalk;return r.a.createElement("div",{className:"appointment-card"},r.a.createElement("div",{className:"meeting-info"},r.a.createElement("text",{className:"purpose"},a," "),r.a.createElement("text",{className:"date"},t),r.a.createElement("text",{className:"duration"},n," - ",s)),r.a.createElement("div",{className:"zoom-info"},r.a.createElement("text",{className:"zoom-username"},c),r.a.createElement("text",null,"Invite link:"),r.a.createElement("text",{className:"join-url"},i)),r.a.createElement("div",{className:"button-container"},r.a.createElement("button",{className:"start-button",onClick:function(){return u(o)}},"Start"),r.a.createElement("button",{className:"email-button",onClick:function(){return p(i,n,s,t,a)}},"Share"),r.a.createElement("button",{className:"delete-button",onClick:function(){return m(l)}},"Delete")))}}]),a}(n.Component)),D=(a(82),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.onStart,a=e.onDelete,n=e.onEmailShare,s=this.props.appointmentCards.map((function(e,s){return r.a.createElement(w,Object.assign({key:e.id},e,{onStart:t,onDelete:a,onEmailShare:n}))}));return r.a.createElement("div",{className:"appointment-list"},s)}}]),a}(n.Component)),x=(a(83),n.Component,a(20)),A=a.n(x),L=(a(53),a(41)),P=a.n(L),M=a(30),W=(a(54),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={today:Object(f.default)(new Date,"yyyy-MM-dd"),username:"",date:"",startTime:"",endTime:"",purpose:"",buttonDisabled:!1,appointments:[],reucurringMeetings:[],recurrence:!1,recurrenceOptions:[{name:"One-time",value:"2"},{name:"Repeating",value:"8"}],recurrenceOption:"",recurrenceTypes:[{name:"Weekly",value:"2"},{name:"Monthly",value:"3"}],recurrenceType:2,recurrenceWeeks:[{name:"First",value:"1"},{name:"Second",value:"2"},{name:"Third",value:"3"},{name:"Fourth",value:"4"},{name:"Last",value:"-1"}],recurrenceWeek:1,recurrenceDays:[{name:"Sunday",value:"7"},{name:"Monday",value:"1"},{name:"Tuesday",value:"2"},{name:"Wednesday",value:"3"},{name:"Thursday",value:"4"},{name:"Friday",value:"5"},{name:"Saturday",value:"6"}],recurrenceDay:1,recurrenceIntervals:[{name:"1",value:"1"},{name:"2",value:"2"},{name:"3",value:"3"}],recurrenceInterval:1,recurrenceTimes:[{name:"1",value:"1"},{name:"2",value:"2"},{name:"3",value:"3"},{name:"4",value:"4"},{name:"5",value:"5"},{name:"6",value:"6"},{name:"7",value:"7"},{name:"8",value:"8"},{name:"9",value:"9"},{name:"10",value:"10"},{name:"11",value:"11"},{name:"12",value:"12"},{name:"13",value:"13"},{name:"14",value:"14"},{name:"15",value:"15"},{name:"16",value:"16"}],recurrenceTime:2,share_join_url:"",share_start_time:"",share_end_time:"",share_date:"",share_purpose:""},n.handleChange=n.handleChange.bind(Object(p.a)(n)),n.handleDateChange=n.handleDateChange.bind(Object(p.a)(n)),n.handleTimeChange=n.handleTimeChange.bind(Object(p.a)(n)),n.doAppointment=n.doAppointment.bind(Object(p.a)(n)),n.deleteAppointment=n.deleteAppointment.bind(Object(p.a)(n)),n.onEmailShare=n.onEmailShare.bind(Object(p.a)(n)),n.sendEmail=n.sendEmail.bind(Object(p.a)(n)),n.timeToInt=n.timeToInt.bind(Object(p.a)(n)),n.timesToDuration=n.timesToDuration.bind(Object(p.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(p.a)(n)),n.onCancel=n.onCancel.bind(Object(p.a)(n)),n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=k.username;this.setState({username:e}),this.getAppointment()}},{key:"handleChange",value:function(e){this.setState(Object(y.a)({},e.target.name,e.target.value))}},{key:"handleDateChange",value:function(e,t){this.setState(Object(y.a)({},t,e))}},{key:"handleTimeChange",value:function(e,t){this.setState(Object(y.a)({},t,e))}},{key:"timeToInt",value:function(e){var t="";return e.split(":").forEach((function(e){t+=e})),parseInt(t)}},{key:"timesToDuration",value:function(e,t){for(var a=[];e<=t;)a.push(e),e+=e%1e4===0?3e3:7e3;return a}},{key:"handleSubmit",value:function(e){e.preventDefault(),""!==this.state.date&&""!==this.state.startTime&&""!==this.state.endTime&&""!==this.state.purpose?this.doAppointment():alert("Please fill out all fields.")}},{key:"doAppointment",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,r,s,c,i,l,u,m,p,h,d,v,b,g,y,O;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Object(f.default)(new Date,"yyyy-MM-dd"),a=this.state.username,n=this.state.date.toLocaleDateString("fr-CA"),r=this.state.startTime.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),s=this.state.endTime.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),c=this.state.purpose,i=this.state.recurrenceType,l=this.state.recurrenceOption,u=this.state.recurrenceInterval,m=this.state.recurrenceWeek,p=this.state.recurrenceDay,h=this.state.recurrenceTime,d=this.timeToInt(r),v=this.timeToInt(s),!(this.state.date<t||d>v)){e.next=17;break}return alert("Invalid time."),e.abrupt("return");case 17:return this.setState({buttonDisabled:!0}),b=this.timesToDuration(d,v),g=30*(b.length-1),e.prev=20,e.next=23,fetch("/doAppointment",{method:"post",headers:{Accept:"application/JSON","Content-Type":"application/json"},body:JSON.stringify({username:a,date:n,duration:g,durationArray:b,purpose:c,startTime:r,endTime:s,recurrenceType:i,recurrenceOption:l,recurrenceInterval:u,recurrenceWeek:m,recurrenceDay:p,recurrenceTime:h})});case 23:return y=e.sent,e.next=26,y.json();case 26:((O=e.sent)&&O.success||O&&!1===O.success)&&alert(O.msg),e.next=33;break;case 30:e.prev=30,e.t0=e.catch(20),console.log(e.t0);case 33:this.getAppointment();case 34:case"end":return e.stop()}}),e,this,[[20,30]])})));return function(){return e.apply(this,arguments)}}()},{key:"getAppointment",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,r,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=k.username,a=Object(f.default)(new Date,"yyyy-MM-dd"),e.prev=2,e.next=5,fetch("/getAppointment",{method:"post",headers:{Accept:"application/JSON","Content-Type":"application/json"},body:JSON.stringify({username:t,today:a})});case 5:return n=e.sent,e.next=8,n.json();case 8:r=e.sent,s=r.appointments,this.setState({appointments:s}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),k.loading=!1,k.isLoggedIn=!1;case 17:case"end":return e.stop()}}),e,this,[[2,13]])})));return function(){return e.apply(this,arguments)}}()},{key:"startMeeting",value:function(e){window.open(e)}},{key:"deleteAppointment",value:function(){var e=Object(l.a)(o.a.mark((function e(t){var a,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.prev=1,e.next=4,fetch("/deleteAppointment",{method:"post",headers:{Accept:"application/JSON","Content-Type":"application/json"},body:JSON.stringify({id:a})});case 4:return n=e.sent,e.next=7,n.json();case 7:((r=e.sent)&&r.success||r&&!1===r.success)&&alert(r.msg),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0);case 14:this.getAppointment();case 15:case"end":return e.stop()}}),e,this,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"onEmailShare",value:function(e,t,a,n,r){var s=e,c=t,i=a,o=n,l=r;this.setState({share_join_url:s,share_start_time:c,share_end_time:i,share_date:o,share_purpose:l})}},{key:"onCancel",value:function(){this.setState({share_join_url:"",share_start_time:"",share_end_time:"",share_date:"",share_purpose:""})}},{key:"sendEmail",value:function(e){e.preventDefault(),P.a.sendForm("service_b2o90jd","template_95z7xck",e.target,"user_vZliYk1PdzThlzI9zIDpR").then((function(e){console.log(e.text),alert("email was sent.")}),(function(e){console.log(e.text),alert("Error has occurred, please try again. Error:"+e)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.today,n=t.date,s=t.startTime,c=t.endTime,i=t.purpose,o=t.recurrenceTypes,l=t.recurrenceType,u=(t.recurrenceOptions,t.recurrenceOption),m=t.recurrenceWeeks,p=t.recurrenceWeek,h=t.recurrenceDays,d=t.recurrenceDay,v=t.recurrenceIntervals,b=t.recurrenceInterval,g=t.recurrenceTimes,f=t.recurrenceTime;t.share_join_url,t.share_start_time,t.share_end_time,t.share_date,t.share_purpose;return r.a.createElement("div",null,r.a.createElement("div",{className:"app_container"},r.a.createElement("div",{className:"left_container"},r.a.createElement("div",{className:"appointment_display"},r.a.createElement("div",{className:"explanation"},r.a.createElement("div",{className:"block_title"},"Appointments")," ",r.a.createElement("div",{className:"block_date"},a)),r.a.createElement("div",{className:"appointment_list_container"},r.a.createElement(D,{appointmentCards:this.state.appointments,onStart:this.startMeeting,onDelete:this.deleteAppointment,onEmailShare:this.onEmailShare})))),r.a.createElement("div",{className:"right_container"},r.a.createElement("text",{className:"right-title"},"Create Appointment"),r.a.createElement("form",{className:"appointment_form",onSubmit:this.handleSubmit},r.a.createElement("div",{className:"time-picker"},r.a.createElement("label",null,"Starting Date"),r.a.createElement(A.a,{className:"start-date-picker",name:"date",selected:n,onChange:function(t){return e.handleDateChange(t,"date")},onSelect:this.handleClick,placeholderText:"Starting Date",dateFormat:"yyyy-MM-dd",minDate:new Date,maxDate:Object(M.default)(new Date,8),autoComplete:"off"}),r.a.createElement("label",null,"Starting Time"),r.a.createElement(A.a,{label:"Start Time",className:"start-time-picker",name:"startTime",selected:s,onChange:function(t){return e.handleDateChange(t,"startTime")},onSelect:this.handleClick,placeholderText:"Starting Time",showTimeSelect:!0,showTimeSelectOnly:!0,timeFormat:"HH:mm",timeIntervals:30,dateFormat:"h:mm aa",autoComplete:"off"}),r.a.createElement("label",null,"Ending Time"),r.a.createElement(A.a,{className:"end-time-picker",name:"endTime",selected:c,onChange:function(t){return e.handleDateChange(t,"endTime")},onSelect:this.handleClick,placeholderText:"Ending Time",showTimeSelect:!0,showTimeSelectOnly:!0,timeFormat:"HH:mm",timeIntervals:30,dateFormat:"h:mm aa",autoComplete:"off"}),r.a.createElement("label",null,"Purpose"),r.a.createElement("input",{label:"Purpose",className:"purpose-picker",type:"text",name:"purpose",placeholder:"Purpose",value:i,onChange:this.handleChange,autoComplete:"off"})),r.a.createElement("div",{className:"recurrence-options"},r.a.createElement("li",{className:"tab-container",value:u,onChange:this.handleChange},r.a.createElement("ul",null,r.a.createElement("input",{name:"recurrenceOption",type:"radio",id:"tab01",value:"2"}),r.a.createElement("label",{for:"tab01"},"One-time")),r.a.createElement("ul",null,r.a.createElement("input",{name:"recurrenceOption",type:"radio",id:"tab02",value:"8"}),r.a.createElement("label",{for:"tab02"},"Repeating"))),8==u&&r.a.createElement("div",{className:"recurrence-menu"},r.a.createElement(I,{label:"\ubc18\ubcf5 / Recurrence",options:o,onChange:this.handleChange,name:"recurrenceType",value:l}),r.a.createElement(I,{label:2==l?"\uac04\uaca9 (\uc8fc) / Interval (Weeks)":"\uac04\uaca9 (\ub2ec) / Interval (Months)",options:v,onChange:this.handleChange,name:"recurrenceInterval",value:b}),3==l&&r.a.createElement(I,{label:"\ub9e4 \ub2ec \uba87\uc9f8\uc8fc / Week of the month",options:m,onChange:this.handleChange,name:"recurrenceWeek",value:p}),r.a.createElement(I,{label:"\uc694\uc77c / Day of the Week",options:h,onChange:this.handleChange,name:"recurrenceDay",value:d}),r.a.createElement(I,{label:"\ubaa8\uc784 \ud69f\uc218 / Recurrence amount",options:g,onChange:this.handleChange,name:"recurrenceTime",value:f}))),r.a.createElement("button",{className:"submit-button"},"Confirm")))))}}]),a}(n.Component)),F=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={username:"",password:""},n}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},"THIS IS ROOMPICKER")}}]),a}(n.Component),z=(n.Component,function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={username:"",today:Object(f.default)(new Date,"yyyy-MM-dd"),currentPage:"0",navItems:[{page:"0",name:"Zoom"},{page:"1",name:"Email"}]},n.changePage=n.changePage.bind(Object(p.a)(n)),n.testLogIn=n.testLogIn.bind(Object(p.a)(n)),n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/isLoggedIn",{method:"post",headers:{Accept:"application/json","Content-Type":"application.json"}});case 3:return t=e.sent,e.next=6,t.json();case 6:(a=e.sent)&&a.success?(k.loading=!1,k.isLoggedIn=!0,n=k.username,this.setState({username:n})):(k.loading=!1,k.isLoggedIn=!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),k.loading=!1,k.isLoggedIn=!1;case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"changePage",value:function(e){var t=e;this.setState({currentPage:t})}},{key:"testLogIn",value:function(){k.isLoggedIn=!0,k.username="kacp"}},{key:"render",value:function(){var e=this.state,t=e.today,a=e.navItems,n=e.currentPage;return k.isLoggedIn?r.a.createElement("div",{className:"application"},r.a.createElement(g,{today:t,navItems:a,onPage:this.changePage}),0==n&&r.a.createElement(W,null),1==n&&r.a.createElement(N,null),2==n&&r.a.createElement(F,null)):r.a.createElement("div",{className:"log-in-page"},r.a.createElement(T,null))}}]),a}(n.Component)),J=Object(v.a)(z);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement("div",null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,a){},62:function(e,t,a){e.exports=a.p+"static/media/log-in-image.4d946127.png"},67:function(e,t,a){e.exports=a(147)},72:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){},82:function(e,t,a){},83:function(e,t,a){}},[[67,1,2]]]);
//# sourceMappingURL=main.c60598d2.chunk.js.map