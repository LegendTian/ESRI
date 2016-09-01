// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
define("esri/tasks/DirectionsFeatureSet","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../geometry/Extent ../geometry/Polyline ./FeatureSet".split(" "),function(g,q,p,v,w,x,t,y){g=g(y,{declaredClass:"esri.tasks.DirectionsFeatureSet",constructor:function(f,s){this.routeId=f.routeId;this.routeName=f.routeName;q.mixin(this,f.summary);this.extent=new x(this.envelope);var e=this._fromCompressedGeometry,m=this.features,h=this.extent.spatialReference,b=[];p.forEach(s,function(f,
d){m[d].setGeometry(b[d]=e(f,h))});this.strings=f.strings;this.mergedGeometry=this._mergePolylinesToSinglePath(b,h);this.geometryType="esriGeometryPolyline";delete this.envelope},_fromCompressedGeometry:function(f,s){var e=0,m=0,h=0,b=0,g=[],d,k,a,r,q,u,c=0,l=0,n=0;(a=f.match(/((\+|\-)[^\+\-\|]+|\|)/g))||(a=[]);0===parseInt(a[c],32)?(c=2,d=parseInt(a[c],32),c++,r=parseInt(a[c],32),c++,d&1&&(l=p.indexOf(a,"|")+1,q=parseInt(a[l],32),l++),d&2&&(n=p.indexOf(a,"|",l)+1,u=parseInt(a[n],32),n++)):(r=parseInt(a[c],
32),c++);for(;c<a.length&&"|"!==a[c];)d=parseInt(a[c],32)+e,c++,e=d,k=parseInt(a[c],32)+m,c++,m=k,d=[d/r,k/r],l&&(k=parseInt(a[l],32)+h,l++,h=k,d.push(k/q)),n&&(k=parseInt(a[n],32)+b,n++,b=k,d.push(k/u)),g.push(d);e=new t({paths:[g],hasZ:0<l,hasM:0<n});e.setSpatialReference(s);return e},_mergePolylinesToSinglePath:function(f,g){var e=[];p.forEach(f,function(b){p.forEach(b.paths,function(b){e=e.concat(b)})});var m=[],h=[0,0];p.forEach(e,function(b){if(b[0]!==h[0]||b[1]!==h[1])m.push(b),h=b});return(new t({paths:[m]})).setSpatialReference(g)}});
v("extend-esri")&&q.setObject("tasks.DirectionsFeatureSet",g,w);return g});