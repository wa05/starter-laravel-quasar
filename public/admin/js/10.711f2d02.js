(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{9018:function(e,r,t){"use strict";t.r(r);var i=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div")},n=[],a=t("ebd65"),o={props:{google:{type:Object,required:!0},map:{type:Object,required:!0},marker:{type:Object,required:!0}},mounted:function(){var e=new this.google.maps.Marker({position:this.marker.position,marker:this.marker,map:this.map,icon:a["b"]}),r=this;e.addListener("click",(function(){r.$emit("marker-data",this.marker)}))}},s=o,p=t("2877"),c=Object(p["a"])(s,i,n,!1,null,null,null);r["default"]=c.exports}}]);