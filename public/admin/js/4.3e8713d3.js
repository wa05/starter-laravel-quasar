(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"012a":function(e,n,a){"use strict";a.r(n);var t=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",[a("div",{ref:"googleMap",staticClass:"google-map"}),Boolean(this.google)&&Boolean(this.map)?[e._t("default",null,{google:e.google,map:e.map})]:e._e()],2)},i=[],o=a("967e"),s=a.n(o),l=(a("96cf"),a("fa84")),p=a.n(l),r=a("f464"),c=a.n(r),u={components:{},props:{mapConfig:{required:!0}},data:function(){return{google:null,map:null,apiKey:"AIzaSyDJiLJVhGcdse5KFUMfYN8dJBz-u9bwtxU"}},mounted:function(){var e=this;return p()(s.a.mark((function n(){var a;return s.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,c()({apiKey:e.apiKey});case 2:a=n.sent,e.google=a,e.initializeMap();case 5:case"end":return n.stop()}}),n)})))()},watch:{mapConfig:{handler:function(e,n){this.initializeMap(!0)},deep:!0}},methods:{initializeMap:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this.mapConfig;e&&(n.zoom=7);var a=this.$refs.googleMap;this.map=new this.google.maps.Map(a,n)}},events:{"reload-map":function(){this.initializeMap()}}},f=u,g=(a("05db"),a("2877")),d=Object(g["a"])(f,t,i,!1,null,"24628fe1",null);n["default"]=d.exports},"05db":function(e,n,a){"use strict";var t=a("c22e"),i=a.n(t);i.a},c22e:function(e,n,a){}}]);