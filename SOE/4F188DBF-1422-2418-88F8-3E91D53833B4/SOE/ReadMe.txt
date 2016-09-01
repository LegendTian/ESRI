Dynamic Segmentation Utility SOE Rest
Author: Domenico Ciavarella
nicogis.blogspot.it
Version soe: 1.2

This solution (developed in c#) creates a SOE Rest in arcgis server 10.2 and superior for these operations:

- Identify Route M
- Set M point location
- Set M line location
- Identify Route M Ex (like Identify Route M but force snap setting RouteId) see sample test

Installation:
 
a) upload file Studioat.ArcGis.Soe.Rest.DSUtility.soe (see http://resources.arcgis.com/en/help/main/10.1/0154/0154000004sm000000.htm)

b) create a service map and enable the extension 'Dynamic Segmentation Utility' in capabilities. In this msd you must have at least a polylineM.

c) from service directory you can see all your polylineM layers
   http://hostname/instanceags/rest/services/PolylineM/MapServer/exts/DSUtility

d) IdentifyRoute operation (for instance) layerID = 0
http://hostname/instanceags/rest/services/yourservice/MapServer/exts/DSUtility/RouteLayers/0/IdentifyRoute

Parameters:

1) location: Geometry Point (see rest api esri)
example:
{"x":-8582617.03619766,"y":4896408.449978509,"spatialReference":{"wkid":102113}}
2) tolerance: number (optional but if you don't set, soe set 0 so you could no have results)
3) routeMeasureUnit:  (optional (default is esriUnknownUnits))
example: routeMeasureUnit: esriMeters (see http://help.arcgis.com/en/sdk/10.0/arcobjects_net/componenthelp/index.html#//004200000030000000)
4) routeIDFieldName: string

e) PointLocation operation (for instance) layerID = 0
http://hostname/instanceags/rest/services/yourservice/MapServer/exts/DSUtility/RouteLayers/0/PointLocation

Parameters:

1) routeIDFieldName: string
2) routeID: string, int or double (depends fieldtype routeIDFieldName)
3) measure: double
4) lateralOffset (optional default: 0)
5) routeMeasureUnit:  (optional (default is esriUnknownUnits))
example: routeMeasureUnit: esriMeters (see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//004200000030000000)
6) routeLocationMeasureUnit:  (optional (default is esriUnknownUnits))
example: routeLocationMeasureUnit: esriMeters (see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//004200000030000000)

f) LineLocation operation (for instance) layerID = 0
http://hostname/instanceags/rest/services/yourservice/MapServer/exts/DSUtility/RouteLayers/0/LineLocation

Parameters:

1) routeIDFieldName: string
2) routeID: string, int or double (depends fieldtype routeIDFieldName)
3) fromMeasure: double (optional if you set toMeasure)
4) toMeasure: double (optional if you set fromMeasure)
5) lateralOffset (optional default: 0)
6) routeMeasureUnit:  (optional (default is esriUnknownUnits))
example: routeMeasureUnit: esriMeters (see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//004200000030000000)
7) routeLocationMeasureUnit:  (optional (default is esriUnknownUnits))
example: routeLocationMeasureUnit: esriMeters (see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//004200000030000000)

g) IdentifyRouteEx operation (for instance) layerID = 0
http://hostname/instanceags/rest/services/yourservice/MapServer/exts/DSUtility/RouteLayers/0/IdentifyRouteEx
1) location: Geometry Point (see rest api esri)
example:
{"x":-8582617.03619766,"y":4896408.449978509,"spatialReference":{"wkid":102113}}
2) routeID: string, int or double (depends fieldtype routeIDFieldName)
3) tolerance: number (optional but if you don't set, you could no have results)
4) routeMeasureUnit:  (optional (default is esriUnknownUnits))
example: routeMeasureUnit: esriMeters (see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//004200000030000000)
5) routeIDFieldName: string
6) segmentExtension: (optional (default is esriNoExtension) see http://resources.arcgis.com/en/help/arcobjects-net/componenthelp/index.html#//002m00000022000000)



In capabilities (operations allowed) you can allow these operations (IdentifyRoute (method IdentifyRoute, IdentifyRouteEx), PointLocation and LineLocation).

I have added in file zip an example in api esri javascript to see how to use it. You only need edit config.js. If missing set mime in your web server for video (mp4, ogv and webm).
I have added data used for demo

The solutions are checked 100% with stylecop and fxcop.