// Author: nicogis
// nicogis.blogspot.it

var map, toolbar;
var agsConfig;
var video;
var currentToolVideo;
var dlgVideo;
var isPausedVideo;
var routeIdVideo = 170; /*for this sample*/
var startMVideo = 5.01; /*for this sample*/

function init() {
    agsConfig = new studioat.js.dsUtility.ags(config);
    map = new esri.Map("map");
    dojo.connect(map, "onLoad", createToolbar);
    var operationalLayer = new esri.layers.ArcGISDynamicMapServiceLayer(agsConfig.urlMapServer(agsConfig.operationalLayers.RouteLayer));
    map.addLayer(operationalLayer);

    new dijit.form.Button({
        showLabel:false,
        id:"btnIdentifyLocation",
        iconClass:"routeEventIdentifyLocation",
        onClick:function () {
            drawFeedback(false);
            toolbar.activate(esri.toolbars.Draw.POINT);
            map.hideZoomSlider();
        }
    }, "btnIdentifyLocation");

    new dijit.form.Button({
        showLabel:false,
        id:"btnPointLocation",
        iconClass:"routeEventMakeRoute",
        onClick:operationPointLocation
    }, "btnPointLocation");

    new dijit.form.Button({
        showLabel:false,
        id:"btnLineLocation",
        iconClass:"routeEventDefineLine",
        onClick:operationLineLocation
    }, "btnLineLocation");

    new dijit.form.TextBox({
        id:"measure",
        placeHolder:"Measure or From Measure"}, "measure");

    new dijit.form.TextBox({
        id:"toMeasure",
        placeHolder:"To Measure"}, "toMeasure");

    new dijit.form.TextBox({
        id:"routeId",
        placeHolder:"Route Id"}, "routeId");

    new dijit.form.TextBox({
        id:"lateralOffset",
        placeHolder:"Lateral Offset (optional)"}, "lateralOffset");

    new dijit.form.Button({
        showLabel:false,
        id:"btnVideoLocation",
        iconClass:"videoDataAnimation",
        onClick:operationVideoLocation
    }, "btnVideoLocation");

    new dijit.Tooltip({
        connectId:["btnIdentifyLocation"],
        label:"Identify location: click on a polylineM (if you set also a route Id, snap nearest location)"
    });

    new dijit.Tooltip({
        connectId:["btnPointLocation"],
        label:"Point location: return a point on polyline (you must insert a Measure and a Route Id)"
    });

    new dijit.Tooltip({
        connectId:["btnLineLocation"],
        label:"Line location: return a line on polyline (you must insert a Measure From, Measure To and a Route Id)"
    });

    new dijit.Tooltip({
        connectId:["btnVideoLocation"],
        label:"Video using dynamic segmentation (routeId = 170)"
    });

    currentToolVideo = false;
    video = dojo.byId("video");
    dojo.connect(video, "timeupdate", timeUpdateVideo);
    dlgVideo =  dijit.byId("dlgVideo");
    dojo.connect(dlgVideo, "hide", function(e){
        video.pause();
    });
}

function timeUpdateVideo()
{
    var vTime = this.currentTime;
    if (vTime < startMVideo)
    {
        vTime = startMVideo;
        this.currentTime = vTime;
    }

    console.log(vTime);
    pointLocation(routeIdVideo, vTime);
}

function createToolbar(themap) {
    dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
    toolbar = new esri.toolbars.Draw(map);
    dojo.connect(toolbar, "onDrawEnd", operationIdentifyRoute);
    dojo.connect(map,"onMouseDragStart",onMouseDragStart);
    dojo.connect(map,"onMouseDrag",onMouseDrag);
    dojo.connect(map,"onMouseDragEnd",onMouseDragEnd);
}

function drawFeedback(enabled) {
    if (enabled) {
        map.disablePan();
        map.setMapCursor('pointer');
    } else {
        map.enablePan();
        map.setMapCursor('default');
        if (dlgVideo != null)
        {
            dlgVideo.hide();
        }
    }
    currentToolVideo = enabled;
}

function operationVideoLocation()
{
    if (!video.canPlayType) {
        dojo.publish("msgTopic", [new studioat.js.dsUtility.message("This browser doesn't support html5 video", "error")]);
        return;
    }

    drawFeedback(true);

    dlgVideo.show();
    video.currentTime = startMVideo;
    pointLocation(routeIdVideo, video.currentTime);  
}

function onMouseDragStart(evt)
{
    isPausedVideo = video.paused;
    video.pause();
}

function onMouseDrag(evt) {
    if (currentToolVideo) {
        var mp = new esri.geometry.Multipoint(map.spatialReference);
        mp.addPoint(evt.mapPoint);
        map.graphics.graphics[0].setGeometry(mp);
    }
}

function onMouseDragEnd(evt) {
    if (currentToolVideo) {
        var params = { f:"json",
            location:dojo.toJson(evt.mapPoint.toJson()),
            tolerance:agsConfig.tolerance,
            routeID : routeIdVideo,
            routeIDFieldName : agsConfig.routeIDFieldName
        }

        esri.request({
            url:agsConfig.urlDSUtility(agsConfig.operationalLayers.RouteLayer, agsConfig.indexLayerM /* id layer */, 'IdentifyRouteEx' /*name of operationSOE */),
            content:params,
            callbackParamName:"callback",
            load:function (result) {
                if (result.location.length == 0) {
                    dojo.publish("msgTopic", [new studioat.js.dsUtility.message("M not found!", "warning")]);
                }
                else {
                    map.graphics.clear();
                    var point =  new esri.geometry.Point(result.location[0].location);
                    var multipoint = new esri.geometry.Multipoint(point.spatialReference);
                    multipoint.addPoint(point);
                    video.currentTime = result.location[0].measure;
                    if (!isPausedVideo)
                    {
                        video.play();
                    }
                    /*
                    dojo.forEach(result.location, function (measure) {
                        point =  new esri.geometry.Point(measure.location);
                        multipoint.addPoint(point);
                    });
                    */
                    var graphic = new esri.Graphic(multipoint, agsConfig.symbolPoint);
                    map.graphics.add(graphic);
                }
            },
            error:function (error) {
                dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(error, "Error identifyRoute - code: ${code} - description: ${message}"), "error")]);
            }
        });
    }
}

function operationIdentifyRoute(geometry) {
    toolbar.deactivate();
    map.showZoomSlider();
    map.graphics.clear();
    var graphic = new esri.Graphic(geometry, agsConfig.symbolPoint);
    map.graphics.add(graphic);

    var params = { f:"json",
        location : dojo.toJson(geometry.toJson()),
        tolerance : agsConfig.tolerance,
        routeIDFieldName : agsConfig.routeIDFieldName
    }

    var routeId = dijit.byId('routeId').get('value');
    if (routeId == '') {
        esri.request({
            url:agsConfig.urlDSUtility(agsConfig.operationalLayers.RouteLayer, agsConfig.indexLayerM /* id layer */, 'IdentifyRoute' /*name of operationSOE */),
            content:params,
            callbackParamName:"callback",
            load:function (result) {

                console.log(result.location);
                if (result.location.length == 0) {
                    dojo.publish("msgTopic", [new studioat.js.dsUtility.message("M not found!", "warning")]);
                }
                else {
                    var results = dojo.map(result.location, function (measure) {
                        return esri.substitute(measure, "routeID: ${routeID} measure: ${measure}</br>");
                    });

                    

                    dojo.publish("msgTopic", [new studioat.js.dsUtility.message(results.join(""), "info")]);

                }
            },
            error:function (error) {
                dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(error, "Error identifyRoute - code: ${code} - description: ${message}"), "error")]);
            }
        });
    }
    else {
        params.routeID = routeId;
        esri.request({
            url:agsConfig.urlDSUtility(agsConfig.operationalLayers.RouteLayer, agsConfig.indexLayerM /* id layer */, 'IdentifyRouteEx' /*name of operationSOE */),
            content:params,
            callbackParamName:"callback",
            load:function (result) {

                //console.log(result.location);
                if (result.location.length == 0) {
                    dojo.publish("msgTopic", [new studioat.js.dsUtility.message("M not found!", "warning")]);
                }
                else {
                    var results = dojo.map(result.location, function (measure) {
                        return esri.substitute(measure, "routeID: ${routeID} measure: ${measure}</br>");
                    });

                   

                    dojo.publish("msgTopic", [new studioat.js.dsUtility.message(results.join(""), "info")]);

                    map.graphics.clear();
                    dojo.forEach(result.location, function (measure) {
                        var point = new esri.geometry.Point(measure.location);
                        var graphic = new esri.Graphic(point, agsConfig.symbolPoint);
                        map.graphics.add(graphic);
                    });
                }
            },
            error:function (error) {
                dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(error, "Error identifyRoute - code: ${code} - description: ${message}"), "error")]);
            }
        });
    }
}

function operationPointLocation() {
    drawFeedback(false);
    pointLocation(dijit.byId('routeId').get('value'), dijit.byId('measure').get('value'), dijit.byId('lateralOffset').get('value'));
}

function pointLocation(routeID, measure, lateralOffset)
{
    var params = { f:"json",
        routeIDFieldName: agsConfig.routeIDFieldName,
        routeID:routeID,
        measure:measure
    }

    if (lateralOffset && lateralOffset != '') {
        params.lateralOffset = lateralOffset;
    }

    esri.request({
        url:agsConfig.urlDSUtility(agsConfig.operationalLayers.RouteLayer, agsConfig.indexLayerM /* id layer */, 'PointLocation' /*name of operationSOE */),
        content:params,
        callbackParamName:"callback",
        load:function (result) {
            //console.log(result);
            if (result.hasError) {
                dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(result, "description: ${errorDescription}"), "error")]);
            }

            if (result.geometries) {
                map.graphics.clear();
                var multipoint = new esri.geometry.Multipoint(result.geometries);
                var graphic = new esri.Graphic(multipoint, agsConfig.symbolPoint);
                map.graphics.add(graphic);
            }
        },
        error:function (error) {
            console.log(error);
            dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(error, "Error pointLocation - code: ${code} - description: ${message}"), "error")]);
        }
    });
}


function operationLineLocation() {
    drawFeedback(false);
    var params = { f:"json",
        routeIDFieldName: agsConfig.routeIDFieldName,
        routeID:dijit.byId('routeId').get('value'),
        fromMeasure:dijit.byId('measure').get('value'),
        toMeasure:dijit.byId('toMeasure').get('value')
    }

    var lateralOffset = dijit.byId('lateralOffset').get('value');
    if (lateralOffset != '') {
        params.lateralOffset = lateralOffset;
    }

    esri.request({
        url:agsConfig.urlDSUtility(agsConfig.operationalLayers.RouteLayer, agsConfig.indexLayerM /* id layer */, 'LineLocation' /*name of operationSOE */),
        content:params,
        callbackParamName:"callback",
        load:function (result) {
            //console.log(result);
            if (result.hasError) {
                dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(result, "description: ${errorDescription}"), "error")]);
            }

            if (result.geometries) {
                map.graphics.clear();
                var line = new esri.geometry.Polyline(result.geometries);
                var graphic = new esri.Graphic(line, agsConfig.symbolLine);
                map.graphics.add(graphic);
            }

        },
        error:function (error) {
            dojo.publish("msgTopic", [new studioat.js.dsUtility.message(esri.substitute(error, "Error lineLocation - code: ${code} - description: ${message}"), "error")]);
        }
    });
}


dojo.addOnLoad(init);
