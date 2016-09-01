// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
define("esri/InfoWindowBase","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Deferred dojo/dom-construct dojo/has dijit/registry ./kernel ./lang ./geometry/ScreenPoint".split(" "),function(f,g,h,e,m,n,p,k,q,l,r){f=f(null,{declaredClass:"esri.InfoWindowBase",constructor:function(){var a=g.hitch;this.__set_title=a(this,this.__set_title);this.__err_title=a(this,this.__err_title);this.__set_content=a(this,this.__set_content);this.__err_content=a(this,this.__err_content)},
setMap:function(a){this.map=a},unsetMap:function(a){delete this.map},setTitle:function(){},setContent:function(){},show:function(){},hide:function(){},resize:function(){},onShow:function(){},onHide:function(){},place:function(a,b){l.isDefined(a)?g.isObject(a)?n.place(a,b,"only"):b.innerHTML=a:b.innerHTML=""},startupDijits:function(a){this._processDijits(a)},destroyDijits:function(a){this._processDijits(a,!0)},_processDijits:function(a,b){if(a&&1===a.children.length){var c=a.children[0];if(c){var d=
k.byNode(c),c=d?[d]:k.findWidgets(c);h.forEach(c,function(a){if(b){if(a._started&&!a._destroyed)try{a.destroyRecursive?a.destroyRecursive():a.destroy&&a.destroy()}catch(c){console.debug("An error occurred when destroying a widget embedded within InfoWindow: "+c.message)}}else if(!a._started)try{a.startup()}catch(d){console.debug("An error occurred when starting a widget embedded within InfoWindow: "+d.message)}})}}},__registerMapListeners:function(){this.__unregisterMapListeners();var a=this.map;
this.__handles=[e.connect(a,"onPan",this,this.__onMapPan),e.connect(a,"onZoomStart",this,this.__onMapZmStart),e.connect(a,"onExtentChange",this,this.__onMapExtChg)]},__unregisterMapListeners:function(){var a=this.__handles;a&&(h.forEach(a,e.disconnect,e),this.__handles=null)},__onMapPan:function(a,b){this.move(b,!0)},__onMapZmStart:function(){this.__mcoords=this.mapCoords||this.map.toMap(new r(this.coords));this.hide(null,!0)},__onMapExtChg:function(a,b,c){a=this.map;var d=this.mapCoords;d?this.show(d,
null,!0):(b=c?a.toScreen(this.__mcoords):this.coords.offset(b&&b.x||0,b&&b.y||0),this.show(b,null,!0))},__setValue:function(a,b){this[a].innerHTML="";var c="_dfd"+a,d=this[c];d&&-1===d.fired&&(d.cancel(),this[c]=null);l.isDefined(b)&&(b instanceof m?(this[c]=b,b.addCallbacks(this["__set"+a],this["__err"+a])):this.__render(a,b))},__set_title:function(a){this._dfd_title=null;this.__render("_title",a)},__err_title:function(a){this._dfd_title=null},__set_content:function(a){this._dfd_content=null;this.__render("_content",
a)},__err_content:function(a){this._dfd_content=null},__render:function(a,b){var c=this[a];this.place(b,c);this.isShowing&&(this.startupDijits(c),"_title"===a&&this._adjustContentArea&&this._adjustContentArea())}});p("extend-esri")&&(q.InfoWindowBase=f);return f});