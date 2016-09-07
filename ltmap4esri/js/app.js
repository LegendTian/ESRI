/**
 * Created by admin on 2016-9-1.
 */
var app;
var algis;
var baseMap_baidu="http://192.168.9.100:6080/arcgis/rest/services/BaseMap/VectorBaseMap_shanxi_baidu/MapServer";
var baseMap_google="http://192.168.9.100:6080/arcgis/rest/services/BaseMap/VectorBaseMap_google/MapServer";
var baseMap_tianditu="http://192.168.9.100:6080/arcgis/rest/services/BaseMap/VectorBaseMap_tianditu/MapServer";
var baseMap_image="http://192.168.9.100:6080/arcgis/rest/services/BaseMap/ShanXiImageBaseMap/MapServer";
var baseMap_hill="http://192.168.9.100:6080/arcgis/rest/services/BaseMap/HILLSHADE/MapServer";
var baseline="http://192.168.9.100:6080/arcgis/rest/services/APDM/BasicInfoService/MapServer";
var pipeline="http://192.168.9.100:6080/arcgis/rest/services/APDM/BasicInfoService/FeatureServer/8"
require([
    // ArcGIS
    "esri/map",
    "esri/dijit/Search",
    "dojo/query",
    "dojo/json",
    "dojo/_base/array",
    "dojo/Deferred",
    // Calcite Maps
    "calcite-maps/calcitemaps-v0.2",

    // Bootstrap
    "bootstrap/Collapse",
    "bootstrap/Dropdown",
    "bootstrap/Tab",
    //页面DOM
    "dojo/dom",
    //页面组件注册器
    "dijit/registry",
    //事件连接器
    "dojo/on",
    //dojo加载完毕
    "dojo/ready",
    //页面解析器
    "dojo/parser",
    "dojo/domReady!"
], function(Map, Search, query,JSON,array,Deferred, CalciteMaps,Collapse,Dropdown,Tab,dom,registry,on,ready,parser) {
    //页面解析
    parser.parse();
    // App
    app = {
        map: null,
        basemap: "dark-gray",
        basemaps:[],
        center: [112.6,37.7], // lon, lat
        zoom: 6,
        initialExtent: null,
        searchWidgetNav: null,
        searchWidgetPanel: null
    }
    algis=new ALGIS();

    // Map
    /*app.map = new Map("mapViewDiv", {
     basemap: app.basemap,
     center: app.center,
     zoom: app.zoom
     });*/
    app.map=algis.newMap("mapViewDiv",112.6,37.7,6);
    //var bg=algis.initBasemapGallery("basemapGallery",app.map);
    //console.log("bg",bg);
    algis.addBaseMap("baseMap_tianditu",baseMap_tianditu,"天地图系","./images/basemap.png",function(basemap){
        algis.basemaps.push(basemap);
    });
    algis.addBaseMap("baseMap_baidu",baseMap_baidu,"百度系","./images/basemap.png",function(basemap){
        algis.basemaps.push(basemap);
    });
    algis.addBaseMap("baseMap_google",baseMap_google,"谷歌系","./images/basemap.png",function(basemap){
        algis.basemaps.push(basemap);
    });

    algis.addBaseMap("baseMap_image",baseMap_image,"影像图","./images/imagemap.png",function(basemap){
        algis.basemaps.push(basemap);
    });
    algis.addBaseMap("baseMap_hill",baseMap_hill,"地形图","./images/hill.png",function(basemap){
        algis.basemaps.push(basemap);
        console.log("algis.basemaps",algis.basemaps);
        algis.startupBaseMap("basemapGallery",algis.basemaps,app.map);
    });

    algis.initScalebar(app.map);

    algis.newDynamicLayer(baseline,"baseline",function(layer){
        //app.map.addLayer(layer);
    });
    algis.newFeatureLayer(pipeline,"pipeline",null, function (layer) {
        //app.map.addLayer(layer);
    });
    //app.map.setBasemap("baseMap_tianditu");
    //app.map.setBasemap("osm");
    app.map.on("load", function(){
        app.initialExtent = app.map.extent;
    })

    // Search
    app.searchDivNav = createSearchWidget("searchNavDiv");
    app.searchWidgetPanel = createSearchWidget("searchPanelDiv");

    function createSearchWidget(parentId) {
        var search = new Search({
            map: app.map,
            enableHighlight: true
        }, parentId);
        search.startup();
        return search;
    }

    // Basemaps
    query("#selectBasemapPanel").on("change", function(e){
        app.map.setBasemap(e.target.options[e.target.selectedIndex].value);
    });

    // Home
    query(".calcite-navbar .navbar-brand").on("click", function(e) {
        app.map.setExtent(app.initialExtent);
    })

});


