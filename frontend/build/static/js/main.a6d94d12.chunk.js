(this.webpackJsonpkacp_zoom=this.webpackJsonpkacp_zoom||[]).push([[0],{137:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),s=n(18),o=n.n(s),c=(n(68),n(25)),i=n.n(c),l=n(30),u=n(7),h=n(8),m=n(10),d=n(9),p=n(61),g=n(31),b=n(17),f=(n(50),n(70),function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return r.a.createElement("form",{className:"inputField"},r.a.createElement("label",null,this.props.label),r.a.createElement("input",{className:"input",type:this.props.type,placeholder:this.props.placeholder,name:this.props.name,value:this.props.value,size:15,onChange:this.props.onChange}))}}]),n}(a.Component)),v=(n(71),function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("button",{className:"log-in-button",onClick:function(){return e.props.onSubmit}},this.props.text)}}]),n}(a.Component)),j=n(4),O=new function e(){Object(u.a)(this,e),Object(j.h)(this,{loading:!0,isLoggedIn:!1,user:""})},C=function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={username:"",password:"",buttonDisabled:!1},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleLogIn=a.handleLogIn.bind(Object(b.a)(a)),a}return Object(h.a)(n,[{key:"resetForm",value:function(){this.setState({username:"",password:""})}},{key:"handleChange",value:function(e){this.setState(Object(g.a)({},e.target.name,e.target.value))}},{key:"handleLogIn",value:function(e){e.preventDefault(),console.log(this.state.username),console.log(this.state.password),this.resetForm()}},{key:"doLogin",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.state.username){e.next=2;break}return e.abrupt("return");case 2:if(this.state.password){e.next=4;break}return e.abrupt("return");case 4:return this.setState({buttonDisabled:!0}),e.prev=5,e.next=8,fetch("/login",{method:"post",headers:{Accept:"application/JSON","Content-Type":"application/json"},body:JSON.stringify({username:this.state.username,password:this.state.password})});case 8:return t=e.sent,e.next=11,t.json();case 11:(n=e.sent)&&n.success?(O.isLoggedIn=!0,O.username=n.username):n&&!1===n.success&&(this.resetForm(),alert(n.msg)),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(5),console.log(e.t0),this.resetForm();case 19:case"end":return e.stop()}}),e,this,[[5,15]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("image",null),r.a.createElement(f,{label:"Username:",type:"username",placeholder:"Username",name:"username",value:this.state.username,onChange:this.handleChange}),r.a.createElement(f,{label:"Password:",type:"password",placeholder:"Password",name:"password",value:this.state.password,onChange:this.handleChange}),r.a.createElement(v,{onSubmit:function(){e.handleLogIn()},text:"Log In"}))}}]),n}(a.Component),y=n(62),k=n(58),w=n.n(k),E=(n(73),n(27)),S=(n(74),function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement("h1",null,"KACP Zoom Scheduler"),r.a.createElement("nav",null,r.a.createElement("ul",{className:"navItems"},r.a.createElement("li",null,r.a.createElement("a",null,"Log In")))))}}]),n}(a.Component)),L=(n(75),function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleDateChange=function(e){return a.setState({date:e})},a.handleTimeChange=function(e){return a.setState({time:e})},a.handleClick=function(){return alert("selected",a.state.date)},a.state={date:new Date,appointments:[{date:"2020. 9. 23.",time:"15:30:00"}]},a.handleConfirm=a.handleConfirm.bind(Object(b.a)(a)),a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleDateChange=a.handleDateChange.bind(Object(b.a)(a)),a}return Object(h.a)(n,[{key:"handleConfirm",value:function(e){var t=this.state.date.toLocaleDateString(),n=this.state.date.toLocaleTimeString("en-GB");alert(this.state.date.toLocaleDateString()),alert(this.state.date.toLocaleTimeString("en-GB"));var a={date:t,time:n},r=[].concat(Object(y.a)(this.state.appointments),[a]);this.setState({appointments:r}),console.log(this.state.date)}},{key:"handleChange",value:function(e){this.setState(Object(g.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this.state;e.date,e.handleChange;return r.a.createElement("div",{className:"App"},r.a.createElement(S,null),r.a.createElement("div",{className:"AppointmentPicker"},r.a.createElement(w.a,{selected:this.state.date,onChange:this.handleChange,onSelect:this.state.handleClick,dateFormat:"MM/dd/yyyy HH:mm",minDate:new Date,maxDate:Object(E.default)(new Date,7),timeintervals:30,showTimeSelect:!0}),r.a.createElement("input",{className:"DurationPicker",type:"number"}),r.a.createElement("button",{onClick:this.handleConfirm},"Confirm")))}}]),n}(a.Component)),D=function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/isLoggedIn",{method:"post",headers:{Accept:"application/json","Content-Type":"application.json"}});case 3:return t=e.sent,e.next=6,t.json();case 6:(n=e.sent)&&n.success?(O.loading=!1,O.isLoggedIn=!0,O.username=n.username):(O.loading=!1,O.isLoggedIn=!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),O.loading=!1,O.isLoggedIn=!1;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return O.isLoggedIn?r.a.createElement("div",{className:"time-picker-page"},"Welcome ",O.username,r.a.createElement(L,null)):r.a.createElement("div",{className:"log-in-page"},r.a.createElement(C,null))}}]),n}(a.Component),I=Object(p.a)(D);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},50:function(e,t,n){},63:function(e,t,n){e.exports=n(137)},68:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.a6d94d12.chunk.js.map