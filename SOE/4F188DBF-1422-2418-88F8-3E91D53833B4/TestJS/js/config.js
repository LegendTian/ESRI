// Author: nicogis
// nicogis.blogspot.it

var config;
config = {};
config.operationalLayers = {RouteLayer: 'DemoDS' /*'yourservicewithLayersM' example: 'DemoDS' or 'MyFolder/DemoDS'*/};
config.indexLayerM = '0';
config.symbolPoint = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.25]));
config.symbolLine = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2);
config.protocol = "http:";
config.host = "localhost"; //example 'www.mysite.com'
config.instance = "sit";
config.rest = "rest";
config.services = "services";
config.durationMessage = 5000;
config.tolerance = 10; //map units
config.routeIDFieldName = "IdRoute";



