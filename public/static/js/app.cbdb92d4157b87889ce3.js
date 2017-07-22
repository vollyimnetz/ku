webpackJsonp([0],[,,function(e,t){},function(e,t,n){var r=n(0)(n(5),n(11),null,null,null);e.exports=r.exports},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(10),i=n.n(r),o=n(9),s=n.n(o);t.default={name:"app",components:{monitor:i.a,controllroom:s.a},data:function(){return{view:null}},methods:{setView:function(e){this.view=e}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n.n(r);t.default={data:function(){return{allowedValues:[{id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"},{id:"8"},{id:"9"},{id:"10"},{id:"11"},{id:"12"},{id:"13"},{id:"14"},{id:"15"},{id:"16"},{id:"17"},{id:"18"},{id:"19"},{id:"20"},{id:"21"},{id:"22"},{id:"23"},{id:"24"},{id:"25"},{id:"26"},{id:"27"},{id:"28"},{id:"29"},{id:"30"}],currentValues:[],continueRefresh:!0,refreshTimeout:null}},mounted:function(){this.refresh()},beforeDestroy:function(){console.log("clearTimeout monitor"),this.refreshTimeout&&clearTimeout(this.refreshTimeout)},methods:{isActive:function(e){return void 0!==this.currentValues.find(function(t){return t.id===e.id})},refresh:function(){var e=this;this.continueRefresh?i.a.ajax({type:"GET",url:this.getTargetServer()+"currentEntries",success:function(t){e.currentValues=t},complete:function(t){console.log("refresh done"),e.refreshTimeout=setTimeout(function(){e.refresh()},500)}}):e.refreshTimeout&&clearTimeout(e.refreshTimeout)},addToCurrent:function(e){this.isActive(e)||i.a.ajax({type:"POST",url:this.getTargetServer()+"currentEntries",data:e,success:function(e){}})},getTargetServer:function(){return window.location.href.replace(":8080","")},removeFromCurrent:function(e){i.a.ajax({type:"DELETE",url:this.getTargetServer()+"currentEntries/"+e.id,success:function(e){}})},doClose:function(){this.$emit("close")}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n.n(r);t.default={data:function(){return{currentValues:[],continueRefresh:!0,refreshTimeout:null}},mounted:function(){this.refresh()},beforeDestroy:function(){console.log("clearTimeout monitor"),this.refreshTimeout&&clearTimeout(this.refreshTimeout)},methods:{doClose:function(){this.$emit("close")},refresh:function(){var e=this;this.continueRefresh?i.a.ajax({type:"GET",url:this.getTargetServer()+"currentEntries",success:function(t){e.handleResponse(t)},complete:function(t){console.log("refresh done"),e.refreshTimeout=setTimeout(function(){e.refresh()},1e3)}}):e.refreshTimeout&&clearTimeout(e.refreshTimeout)},getTargetServer:function(){return window.location.href.replace(":8080","")},handleResponse:function(e){for(var t=0;t<this.currentValues.length;t++){var n=this.currentValues[t];void 0===e.find(function(e){return e.id===n.id})&&this.currentValues.splice(t,1)}for(var t=0;t<e.length;t++){var n=e[t];void 0===this.currentValues.find(function(e){return e.id===n.id})&&this.currentValues.push(n)}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),i=n(3),o=n.n(i),s=n(2);n.n(s);r.a.config.productionTip=!1,new r.a({el:"#app",template:"<App/>",components:{App:o.a}})},function(e,t,n){var r=n(0)(n(6),n(12),null,null,null);e.exports=r.exports},function(e,t,n){var r=n(0)(n(7),n(13),null,null,null);e.exports=r.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},["controll"===e.view?n("controllroom",{on:{close:function(t){e.setView(null)}}}):e._e(),e._v(" "),"monitor"===e.view?n("monitor",{on:{close:function(t){e.setView(null)}}}):e._e(),e._v(" "),null===e.view?n("div",{staticClass:"appOverview text-center"},[n("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:function(t){e.setView("controll")}}},[e._v("zum Kontrollraum")]),e._v(" "),n("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:function(t){e.setView("monitor")}}},[e._v("zum Monitor")])]):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"controllroom"},[n("div",{staticClass:"numberpad"},e._l(e.allowedValues,function(t){return n("button",{class:{active:e.isActive(t)},attrs:{type:"button"},on:{click:function(n){e.addToCurrent(t)}}},[e._v(e._s(t.id))])})),e._v(" "),n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-12"},[n("h2",[e._v("Bitte abholen")]),e._v(" "),n("div",{staticClass:"currentValues"},e._l(e.currentValues,function(t){return n("div",[n("button",{staticClass:"removeButton",attrs:{type:"button"},on:{click:function(n){e.removeFromCurrent(t)}}},[e._v("×")]),e._v("\n            "+e._s(t.id)+"\n          ")])}))])])]),e._v(" "),n("button",{staticClass:"btn btn-primary btn-lg viewClose",attrs:{type:"button"},on:{click:e.doClose}},[e._v("Schließen")])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"monitorView"},[e.currentValues.length>0?n("div",{staticClass:"wrap"},[n("h2",[e._v("Bitte abholen")]),e._v(" "),n("h1",{attrs:{values:e.currentValues.length}},[n("transition-group",{attrs:{name:"numberAnimated"}},e._l(e.currentValues,function(t){return n("span",{key:t},[e._v(e._s(t.id))])}))],1)]):e._e(),e._v(" "),n("button",{staticClass:"btn btn-primary btn-lg viewClose",attrs:{type:"button"},on:{click:e.doClose}},[e._v("Schließen")])])},staticRenderFns:[]}}],[8]);
//# sourceMappingURL=app.cbdb92d4157b87889ce3.js.map