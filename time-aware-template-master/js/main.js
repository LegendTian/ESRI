/*global define,document */
/*jslint sloppy:true,nomen:true */
/*
 | Copyright 2014 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define([
    "dojo/_base/declare", 
    "dojo/_base/lang", 
    "dojo/query", 
    "dijit/registry", 
    "dojo/on", 
    "dojo/string", 
    "dojo/date/locale", 
    "dojo/dom-construct", 
    "dojo/dom-style", 
    "dojo/_base/array", 
    "esri/arcgis/utils", 
    "esri/lang", 
    "esri/layers/FeatureLayer", 
    "esri/TimeExtent", 
    "esri/dijit/TimeSlider", 
    "application/MapUrlParams",
    "dojo/dom", 
    "dojo/dom-class", 
    "dojo/domReady!"
    ], function (
        declare, lang, query,
        registry, 
        on, 
        string, 
        locale, 
        domConstruct, domStyle, 
        array, 
        arcgisUtils, esriLang, 
        FeatureLayer, 
        TimeExtent, TimeSlider,
        MapUrlParams, 
        dom, domClass) {
    return declare(null, {
        config: {},
        startup: function (config) {
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            if (config) {
                this.config = config;
                //supply either the webmap id or, if available, the item info
                var itemInfo = this.config.itemInfo || this.config.webmap;
                var mapParams = new MapUrlParams({
                       center: this.config.center || null,
                       extent: this.config.extent || null,
                       level: this.config.level || null,
                       marker: this.config.marker || null,
                       mapSpatialReference: itemInfo.itemData.spatialReference,
                       defaultMarkerSymbol: this.config.markerSymbol,
                       defaultMarkerSymbolWidth: this.config.markerSymbolWidth,
                       defaultMarkerSymbolHeight: this.config.markerSymbolHeight,
                       geometryService: this.config.helperServices.geometry.url
                });
                mapParams.processUrlParams().then(lang.hitch(this, function(urlParams){
                  this._createWebMap(itemInfo, urlParams);
               
                }), lang.hitch(this, function(error){
                  this.reportError(error);
                }));
            } else {
                var error = new Error("Main:: Config is not defined");
                this.reportError(error);
            }
        },
        reportError: function (error) {
            // remove loading class from body
            domClass.remove(document.body, "app-loading");
            domClass.add(document.body, "app-error");
            // an error occurred - notify the user. In this example we pull the string from the
            // resource.js file located in the nls folder because we've set the application up
            // for localization. If you don't need to support multiple languages you can hardcode the
            // strings here and comment out the call in index.html to get the localization strings.
            // set message
            var node = dom.byId("loading_message");
            if (node) {
                if (this.config && this.config.i18n) {
                    node.innerHTML = this.config.i18n.map.error + ": " + error.message;
                } else {
                    node.innerHTML = "Unable to create map: " + error.message;
                }
            }
        },
        _createDialog: function (title, content, dialogDiv, dialogBtn) {
            require(["dijit/Dialog"], lang.hitch(this, function (Dialog) {
                var window = new Dialog({
                    title: title,
                    content: content
                });
                //Update panel color
                if (this.config.panelbackground) {
                    query(".dijitDialogTitleBar").style("background", this.config.panelbackground.toString());
                }
                if (this.config.panelcolor) {
                    query(".dijitDialogTitle").style("color", this.config.panelcolor.toString());
                    query(".dijitDialogCloseIcon").style("color", this.config.panelcolor.toString());
                }
                on(dom.byId(dialogDiv), "click", function () {
                    domClass.add(dialogBtn, "toggle-grey");
                    window.show();
                });

                //Remove grayed out color
                on(query(".dijitDialogCloseIcon"), "click", function () {
                    query(".button-container").forEach(function (node) {
                        domClass.remove(node, "toggle-grey");
                    });
                });
            }));
        },
        _createWidgets: function () {

            //Specify the app title
            document.title = this.config.response.itemInfo.item.title;
            if (this.config.title || this.config.about || this.config.share || this.config.logo) {
                domClass.add(document.body, "showtitle");
                if (this.config.title) {
                    var title = this.config.titletext || this.config.response.itemInfo.item.title;
                    dom.byId("title").innerHTML = title;
                }
            } else {
                domClass.add(dom.byId("titleContainer"), "hide");
            }
            //Add a logo
            if (this.config.logo) {
                domClass.remove(dom.byId("logo"), "hide");
                var link = null;
                if (this.config.logolink) {
                    link = domConstruct.create("a", {
                        href: this.config.logolink,
                        target: "_blank"
                    }, dom.byId("logo"));
                }

                var logoDiv = link || dom.byId("logo");
                domConstruct.create("img", {
                    src: this.config.logo
                }, logoDiv);
            }

            //add share dialog
            if (this.config.share) {
                require(["application/ShareDialog"], lang.hitch(this, function (ShareDialog) {
                    domClass.add(dom.byId("shareDiv"), "show");
                    dom.byId("shareLabel").innerHTML = this.config.i18n.share.title;
                    dom.byId("shareBtn").title = this.config.i18n.share.title;
                    var shareWidget = new ShareDialog({
                        map: this.map,
                        image: this.config.sharinghost + "/sharing/rest/content/items/" + this.config.response.itemInfo.item.id + "/info/" + this.config.response.itemInfo.thumbnail,
                        title: this.config.response.itemInfo.item.title,
                        summary: this.config.response.itemInfo.item.snippet || ""
                    }, domConstruct.create("div"));
                    shareWidget.startup();
                    this._createDialog(this.config.i18n.share.title, shareWidget.domNode, "shareDiv", "shareBtn");
                }));
            }
            //add about dialog
            if (this.config.about) {
                //Content can be configured or come from the item description
                //or snippet 
                var aboutText = this.config.abouttext || this.config.response.itemInfo.item.description || this.config.response.itemInfo.item.snippet;
                if (!aboutText) {
                    aboutText = this.config.i18n.about.error;
                }
                domClass.add(dom.byId("aboutDiv"), "show");
                dom.byId("aboutLabel").innerHTML = this.config.i18n.about.title;
                dom.byId("aboutBtn").title = this.config.i18n.about.title;

                this._createDialog(this.config.i18n.about.title, aboutText, "aboutDiv", "aboutBtn");
            }

            //add scale bar
            if (this.config.scale) {
                require(["esri/dijit/Scalebar"], lang.hitch(this, function (Scalebar) {
                    var scalebar = new Scalebar({
                        map: this.map,
                        scalebarUnit: this.config.units
                    });
                }));
            } else {
                domClass.add(document.body, "noscale");
            }
            //add legend
            if (this.config.legend) {
                require(["esri/dijit/Legend"], lang.hitch(this, function (Legend) {
                    //on small screens show/hide the legend time slider
                    var legendButton = dom.byId("legendButton");
                    var legendContainer = dom.byId("legendContainer");
                    var timeContainer = dom.byId("timeContainer");

                    on(legendButton, "click", lang.hitch(this, function () {

                        if (domClass.contains(legendButton, "icon-menu-open")) {
                            domClass.add(legendButton, ["icon-menu-close", "move"]);
                            domClass.remove(legendButton, "icon-menu-open");
                            domClass.remove(legendContainer, "legend-hide");
                            domClass.add(legendContainer, "legend-show");
                            if (this.config.time) {
                                domClass.remove(timeContainer, "show");
                                domClass.add(timeContainer, "hide");
                            }
                        } else {
                            domClass.remove(legendButton, ["icon-menu-close", "move"]);
                            domClass.add(legendButton, "icon-menu-open");
                            domClass.remove(legendContainer, "legend-show");
                            domClass.add(legendContainer, "legend-hide");
                            if (this.config.time) {
                                domClass.remove(timeContainer, "hide");
                                domClass.add(timeContainer, "show");
                            }

                        }
                    }));
                    var legendLayers = arcgisUtils.getLegendLayers(this.config.response);
                    if (legendLayers.length < 1) {
                        domClass.add(legendContainer, "legend-hide");
                        domStyle.set("legendContainer","display", "none");     
                        return;
                    }
                    var legend = new Legend({
                        map: this.map,
                        layerInfos: legendLayers
                    }, domConstruct.create("div", {}, "legendDiv"));

                    legend.startup();
                    dom.byId("legendButton").title = this.config.i18n.legend.title;
                    if(this.config.legendposition === "top-left"){
                        domClass.add(legendContainer, "window-top-left");
                        domClass.add("legendButton", "window-top-left");

                    }else{ //default
                        domClass.add("legendButton", "window-top-right");
                        domClass.add(legendContainer, "window-top-right");
                    }


                }));
            } else {
                domClass.add(dom.byId("legendContainer"), "legend-hide");
                domStyle.set("legendContainer","display", "none");
                domClass.add(dom.byId("legendContainer"), "hide");
                domClass.add(dom.byId("legendButton"), "hide");
                domClass.remove(dom.byId("legendButton"), "legendButtonDiv");
            }
            if (this.config.search) {
                this._addSearch();
            }

        },
        _addSearch: function () {
            //Add the search widget
            require(["esri/dijit/Search", "esri/tasks/locator", "application/SearchSources"], lang.hitch(this, function (Search, Locator, SearchSources) {
                if (!Search && !Locator && !SearchSources) {
                    return;
                }
                var searchOptions = {
                    map: this.map,
                    itemData: this.config.response.itemInfo.itemData
                };
                if (this.config.searchConfig) {
                    searchOptions.applicationConfiguredSources = this.config.searchConfig.sources || [];
                } else {
                    //Default search options if nothing is configured. 
                    searchOptions.geocoders = this.config.helperServices.geocode;
                }


                var searchSources = new SearchSources(searchOptions);
                var createdOptions = searchSources.createOptions();
                createdOptions.enableButtonMode = true;
                createdOptions.expanded = false;

                if (this.config.searchConfig && this.config.searchConfig.activeSourceIndex) {
                    createdOptions.activeSourceIndex = this.config.searchConfig.activeSourceIndex;
                }
                var search = new Search(createdOptions, domConstruct.create("div", {
                    id: "search"
                }, "mapDiv"));

                search.startup();
                
                var positionClass = "window-top-right"
                if(this.config.legendposition === "top-right"){
                    positionClass = "window-top-right";
                }else if(this.config.legendposition === "top-left"){
                    positionClass = "window-top-left";
                }
                
                domClass.add("search", positionClass);

            }));
        },
        _updateTheme: function () {
            if (this.config.panelbackground) {
                query(".bg").style("backgroundColor", this.config.panelbackground.toString());
            }
            if (this.config.panelcolor) {
                query(".fg").style("color", this.config.panelcolor.toString());
            }

            if (this.config.timecolor) {
                var c = this.config.timecolor.toString();
                query(".tc").style("color", c);
                query(".dijitSliderImageHandleH").style("background-color", c);
            }
            if (this.config.slidercolor) {
                query(".dijitSliderProgressBarH").style("backgroundColor", this.config.slidercolor.toString());
            }
        },
        _updatePlayButton: function (add, remove) {
            //switch play/pause icon 
            var play = dom.byId("playSlider");
            domClass.remove(play, remove);
            domClass.add(play, add);

            // if loop is disabled and if 
            // slider is at end reset if 
            // play/pause button is pressed. 
            if(!this.config.looptime){
                var slider = registry.byId("timeSlider");
                //get slider value 
                var val = null;
                if(lang.isArray(slider._slider.value)){
                    val = slider._slider.value[1];
                }else{
                    val = slider._slider.value;
                }
            
                if(val == slider._slider.maximum){
                    slider.pause();
                    if(slider.thumbCount > 1){
                        slider.setThumbIndexes([0,1]);
                    }else{
                        slider.setThumbIndexes(0);
                    }

                    domClass.remove(play, "icon-pause");
                    domClass.add(play, "icon-play");
                }
            }




        },
        _displayTime: function () {
            //position the time window 
            domClass.add("timeContainer", "window-" + this.config.timeposition);
            //Add the time slider the map is time aware or there are time aware layers
            var timeProperties = null,
                timeExtent = null;
            if (this.config.response.itemInfo.itemData.widgets && this.config.response.itemInfo.itemData.widgets.timeSlider) {
                timeProperties = this.config.response.itemInfo.itemData.widgets.timeSlider.properties;
                if(timeProperties.endTime > timeProperties.startTime){
                    timeExtent = new TimeExtent(new Date(timeProperties.startTime), new Date(timeProperties.endTime));
                }
            }
            if (timeProperties && timeExtent) {

                //Add the time slider widget
                var timeSlider;
                if(this.config.clock !== null){
                    timeSlider = new TimeSlider({
                        loop: this.config.looptime
                    });
                    this._createClock();
                }else{
                    timeSlider = new TimeSlider({
                        loop: this.config.looptime,
                        id: "timeSlider"
                    }, "timeSliderDiv");
                    domClass.add(timeSlider.domNode, "templateTimeSlider");

                }

                this.map.setTimeExtent(timeExtent);
                this.map.setTimeSlider(timeSlider);

                if (timeProperties.numberOfStops) {
                    timeSlider.createTimeStopsByCount(timeExtent, timeProperties.numberOfStops);
                } else {
                    timeSlider.createTimeStopsByTimeInterval(timeExtent, timeProperties.timeStopInterval.interval, timeProperties.timeStopInterval.units);
                }

                timeSlider.setThumbCount(timeProperties.thumbCount);
                timeSlider.setThumbMovingRate(timeProperties.thumbMovingRate);

                timeSlider.startup();

                if(this.config.clock === null){
                    var info = this._formatLabel(this.map.timeExtent);
                    this._updateLabel(info);
                }

                if (this.config.sliderrate) {
                    timeSlider.setThumbMovingRate(this.config.sliderrate);
                }
                if (this.config.autoplay) {
                    timeSlider.play();
                    this._updatePlayButton("icon-pause", "icon-play");
                }
                // If intermediate changes is true 
                if(this.config.intermediatechanges){
                    timeSlider._slider.set("intermediateChanges", true);
                }

                on(dom.byId("playSlider"), "click", lang.hitch(this, function () {
                    var play = domClass.contains("playSlider", "icon-play");

                    var removeClass = null,
                        addClass = null;
                    if (play) { //Switch to the pause icon and press play
                        removeClass = "icon-play";
                        addClass = "icon-pause";
                        timeSlider.play();

                    } else { //Switch to the play icon and press pause
                        removeClass = "icon-pause";
                        addClass = "icon-play";
                        timeSlider.pause();
                    }
                    this._updatePlayButton(addClass, removeClass);

                }));
      
                //Listen for time extent changes
                on(timeSlider, "time-extent-change", lang.hitch(this, function (e) {
                    if(this.config.clock !== null){
                        this._updateClock(e);
                    }else{
                        var timeInfo = this._formatLabel(e);
                        this._updateLabel(timeInfo);
                    }
                }));

                //Hide the play controls if configured. 
                if (this.config.noslider) {
                    //hide the play and slider controls
                    domClass.add(dom.byId("timeContainer"), "noslider");
                }
                //Show the time navigation controls (prev,  next)
                if (this.config.timenav) {
                    domClass.remove(dom.byId("nextSlider"), "hide");
                    domClass.remove(dom.byId("prevSlider"), "hide");
                    //handle forward/back navigation on time slider 
                    query(".timenav").on("click", lang.hitch(this, function (e) {
                        if (timeSlider.playing) {
                            timeSlider.pause();
                            this._updatePlayButton("icon-play", "icon-pause");
                        }
                        if (e.target.id === "nextSlider") {
                            timeSlider.next();
                        } else {
                            timeSlider.previous();
                        }
                    }));
                }

                if (!this.config.sliderticks) {
                    domClass.add(timeSlider.domNode, "noTicks");
                }
  
            } else {
                //hide play and slider controls and add message about no 
                //time 
                domClass.add(dom.byId("timeContainer"), "noslider");
                domClass.remove(dom.byId("timeControls"), "controlCont");
                domClass.add(dom.byId("playControls"), "hide");
                domClass.add("timeContainer", "window-bottom-center");
                var timeMessage = string.substitute(this.config.i18n.time.enableTimeMessage,{"link":"<a target='_blank' href='" + this.config.i18n.time.enableTimeMessageLink  +"'>" + this.config.i18n.time.enableTimeMessageLink + "</a>"});
                dom.byId("timeLabel").innerHTML = timeMessage;
                domClass.add(dom.byId("timeSliderDiv"), "error-text");
            }
            this._updateTheme();
        },
        _createClock: function(){
          //Add clock to time container
            var clock = domConstruct.create("div",{
                id: "clock"
            },"timeLabel");
            domClass.add(clock,["fg","bg"]);
            domClass.add(dom.byId("timeContainer"),"digital");
            domClass.add(dom.byId("timeContainer"), "noslider");
        },
        _updateClock: function(timeInfo){
            var clock = dom.byId("clock");
            var date = new Date(timeInfo.endTime || timeInfo.startTime);
            var currTime = locale.format(date,{
                timePattern: "h:m a",
                selector: ('time')
            });
            var currDate = locale.format(date,{
                datePattern: "MMMM dd, yyyy",
                selector: ("date")
            });

            clock.innerHTML = currDate + "<br>" + currTime;
        },
        _updateLabel: function (timeInfo) {
            //Update the time extent label for the time slider 
            var info;
            if (timeInfo.end) {
                if(this.config.endtimenewline){
                    info = timeInfo.startTime + "<br>" + timeInfo.endTime;
                }else{
                    info = string.substitute(this.config.i18n.time.timeRange, {
                        startTime: timeInfo.startTime,
                        endTime: timeInfo.endTime
                    });
                }
      
            } else {
                info = "" + timeInfo.startTime;
            }

            dom.byId("timeLabel").innerHTML = info;
        },
        _formatLabel: function (timeExtent) {
            //Use the date/time format specified during app configuration or
            //choose an appropriate date/time format based on the input time
            //extent. 
            var startDatePattern = null;
            var endDatePattern = null;
            var startTimePattern = null;
            var endTimePattern = null;
            var start = null , end = null;

            if(timeExtent){
                start = timeExtent.startTime || null;
                end = timeExtent.endTime || null;
            }
            if (this.config.datetimeformat) {
                startDatePattern = this.config.datetimeformat;
                endDatePattern = this.config.datetimeformat;
            }else if (this.config.dateformat || this.config.timeformat){
                if(this.config.dateformat && this.config.timeformat){
                    startDatePattern = this.config.dateformat + " " + this.config.timeformat;
                    endDatePattern = this.config.dateformat + " " + this.config.timeformat;
                }else if(this.config.dateformat){
                    startDatePattern = this.config.dateformat;
                    endDatePattern = this.config.dateformat;
                }else if(this.config.timeformat){
                    startDatePattern = this.config.timeformat;
                    endDatePattern = this.config.timeformat;
                }
            } else {
                //calculate an appropriate start and end time pattern
                if (end.toUTCString() === start.toUTCString()) {
                    end = null; //strings match so set end to null
                }
                if (end && start.getFullYear() == end.getFullYear()) {
                    if (start.getMonth() == end.getMonth()) {
                        if (start.getDate() == end.getDate()) {
                            if (start.getHours() == end.getHours()) {
                                if (start.getMinutes() == end.getMinutes()) {
                                    if (start.getSeconds() == end.getSeconds()) {
                                        // same second
                                        //end = null; //don't show same second
                                        startDatePattern = this.config.i18n.time.datePattern;
                                        startTimePattern = this.config.i18n.time.millisecondTimePattern;
                                        endTimePattern = this.config.i18n.time.millisecondTimePattern;
                                    } else { // same minute
                                        startDatePattern = this.config.i18n.time.datePattern;
                                        startTimePattern = this.config.i18n.time.secondTimePattern;
                                        endTimePattern = this.config.i18n.time.secondTimePattern;
                                    }
                                } else { // same hour
                                    startDatePattern = this.config.i18n.time.datePattern;
                                    startTimePattern = this.config.i18n.time.minuteTimePattern;
                                    endTimePattern = this.config.i18n.time.minuteTimePattern;
                                }
                            } else { // same day
                                startDatePattern = this.config.i18n.time.datePattern;
                                startTimePattern = this.config.i18n.time.hourTimePattern;
                                endTimePattern = this.config.i18n.time.hourTimePattern;
                            }
                        } else { // same month
                            if (end.getDate() - start.getDate() < 2) {
                                // less than 2 days
                                startDatePattern = this.config.i18n.time.datePattern;
                                startTimePattern = this.config.i18n.time.hourTimePattern;
                                endDatePattern = this.config.i18n.time.datePattern;
                                endTimePattern = this.config.i18n.time.hourTimePattern;
                            } else {
                                startDatePattern = this.config.i18n.time.datePattern;
                                endDatePattern = this.config.i18n.time.datePattern;
                            }
                        }
                    } else { // same year
                        startDatePattern = this.config.i18n.time.datePattern;
                        endDatePattern = this.config.i18n.time.datePattern;
                    }
                } else if (end && end.getFullYear() - start.getFullYear() > 10) {
                    startDatePattern = this.config.i18n.time.yearPattern;
                    endDatePattern = this.config.i18n.time.yearPattern;
                } else {
                    startDatePattern = this.config.i18n.time.datePattern;
                    endDatePattern = this.config.i18n.time.datePattern;
                }

            }

           try{
                var startTime = locale.format(start, {
                    datePattern: startDatePattern,
                    timePattern: startTimePattern,
                    selector: (startDatePattern && startTimePattern) ? null : (startDatePattern ? "date" : "time")
                });
           

                var endTime = null;
                if (end) {
                    endTime = locale.format(end, {
                        datePattern: endDatePattern,
                        timePattern: endTimePattern,
                        selector: (endDatePattern && endTimePattern) ? null : (endDatePattern ? "date" : "time")
                    });
        
                }
            }catch(err){
                this.reportError(err);
           }
            return {
                startTime: startTime,
                endTime: endTime,
                startDatePattern: startDatePattern,
                endDatePattern: endDatePattern,
                startTimePattern: startTimePattern,
                endTimePattern: endTimePattern,
                end: end,
                start: start
            };

        },
        // create a map based on the input web map id
        _createWebMap: function (itemInfo, params) {

            params.mapOptions.slider = this.config.zoomslider;

            if (this.config.zoomslider === false) {
                domClass.add(document.body, "nozoom");
            }
            var sliderPosition = "top-left";
            if(this.config.legendposition === "top-left"){
                sliderPosition = "top-right";
            }else if(this.config.legendposition === "top-right"){
                sliderPosition = "top-left";
            }
            params.mapOptions.sliderPosition = sliderPosition;
            arcgisUtils.createMap(itemInfo, "mapDiv", {
                mapOptions: params.mapOptions,
                usePopupManager: true,
                layerMixins: this.config.layerMixins || [],
                editable: false,
                bingMapsKey: this.config.bingKey
            }).then(lang.hitch(this, function (response) {
                this.map = response.map;
                if(params.markerGraphic){
                    // Add a marker graphic with an optional info window if
                    // one was specified via the marker url parameter
                    require(["esri/layers/GraphicsLayer"], lang.hitch(this, function(GraphicsLayer){
                      var markerLayer = new GraphicsLayer();

                      this.map.addLayer(markerLayer);
                      markerLayer.add(params.markerGraphic);

                      if(params.markerGraphic.infoTemplate){
                        this.map.infoWindow.setFeatures([params.markerGraphic]);
                        this.map.infoWindow.show(params.markerGraphic.geometry);
                      }
                    }));

                } 
                this.config.response = response;
                // remove loading class from body
                domClass.remove(document.body, "app-loading");
                this._createWidgets();

                if (this.config.time) {
                    this._displayTime();
                } else {
                    domClass.add(dom.byId("timeContainer"), "hide");
                }
           
            }), this.reportError);
        }
    });
});
